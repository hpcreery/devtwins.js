const fs = require('fs')
const config = require('../config/config')
const sizeOf = require('image-size')
var path = require('path')
const { resolve } = require('path')

module.exports = {
  // Parent Folder/Categories List (filter out archived pages)
  getPageList(req, res) {
    let category = req.params.category.replace(/%20/g, ' ')
    console.log(config.dir.pages + '/' + category)
    try {
      let items = fs.readdirSync(config.dir.pages + '/' + category)
      let filtereditems = items.filter((item) => !item.startsWith('_'))
      console.log('List of Directories in', category, filtereditems)
      res.status(200).json(filtereditems)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  getCategoryList(req, res) {
    console.log(config.dir.pages)
    try {
      let items = fs.readdir(config.dir.pages)
      var filtereditems = items.filter((item) => !item.startsWith('_'))
      console.log('List of Directories', filtereditems)
      res.status(200).json(filtereditems)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  getSiteMap(req, res) {
    let tree = {}
    let categories
    let pages
    let items
    try {
      items = fs.readdirSync(config.dir.pages)
      let filtereditems = items.filter((item) => !item.startsWith('_') && !item.startsWith('.'))
      categories = filtereditems
    } catch (err) {
      res.status(500).send(err)
      return
    }

    let filled_categories = categories.map((category) => {
      try {
        items = fs.readdirSync(config.dir.pages + '/' + category)
        var filtereditems = items.filter((item) => !item.startsWith('_') && !item.startsWith('.'))
        pages = filtereditems
        let filled_pages = pages.map((page) => {
          let page_info = module.exports._getPageData(category, page, (data, err) => {
            if (!err) {
              return data
            } else {
              res.status(404).send('No file found')
            }
          })
          return { name: page, info: page_info }
        })
        return { name: category, pages: filled_pages }
      } catch (err) {
        console.log('Error in func [getsitemap]', err)
        return null
      }
    })

    filled_categories = filled_categories.filter((e) => e != null)

    tree = { categories: filled_categories }
    console.log('Finished tree', tree)
    res.status(200).json(tree)
  },

  getPageData(req, res) {
    let page = req.params.name.replace(/%20/g, ' ')
    let category = req.params.category.replace(/%20/g, ' ')
    module.exports._getPageData(category, page, (data, err) => {
      if (!err) {
        res.status(200).json(data)
      } else {
        res.status(404).send('No file found')
      }
    })
  },

  _getPageData(category, page, res) {
    // Supported Files
    let isSupportedFile = (file) =>
      config.dir.supportedPageFormats.map((format) => file.endsWith(format)).includes(true)
    let supportedFiles = (files) => files.filter((file) => isSupportedFile(file))
    let parentFile = (files) => files[0]
    let hasSupportedFile = (files) => supportedFiles(files).length > 0

    // Supported Collages
    let isSupportedCollage = (file) =>
      config.dir.supportedCollageFormats.map((format) => file.endsWith(format)).includes(true)
    let supportedCollageFiles = (files) => files.filter((file) => isSupportedCollage(file))
    let hasSupportedCollage = (files) => supportedCollageFiles(files).length > 0
    let addSize = (files) =>
      files.map((file) => {
        let dimensions = sizeOf(config.dir.pages + '/' + category + '/' + page + '/' + file)
        return { name: file, width: dimensions.width, height: dimensions.height }
      })

    // Get misc info about Page
    let getThumbnail = (files) => {
      let thumbnail = files.filter((item) => new RegExp('^' + 'thumb.*' + '$').test(item))
      if (thumbnail.length > 0) {
        return thumbnail[0]
      } else {
        return null
        // return "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.icons8.com%2Fcarbon-copy%2F2x%2Ffile.png&imgrefurl=https%3A%2F%2Ficons8.com%2Ficons%2Fset%2Ffile&tbnid=umEWAkqMMnbVmM&vet=12ahUKEwjj9syJrcnrAhWSfqwKHbFDA9gQMygCegUIARDYAQ..i&docid=fhdmazhWVkJ3aM&w=200&h=200&q=file%20icon&ved=2ahUKEwjj9syJrcnrAhWSfqwKHbFDA9gQMygCegUIARDYAQ"
      }
    }

    let isArchived = page.startsWith('_')

    let files = []

    try {
      files = fs.readdirSync(config.dir.pages + '/' + category + '/' + page)
      console.log('List of Files in', config.dir.pages + '/' + category + '/' + page, files)
    } catch (err) {
      console.log('Error Reading Dir: ', config.dir.pages + '/' + category + '/' + page)
    }

    if (hasSupportedFile(files)) {
      let staticfile = parentFile(supportedFiles(files))
      console.log('Supported Render File selected:', config.dir.pages + '/' + staticfile)
      return res({
        type: 'static',
        subtype: staticfile.split('.').pop(),
        thumb: getThumbnail(files),
        archived: isArchived,
        files: staticfile,
      })
    } else if (hasSupportedCollage(files)) {
      return res({
        type: 'collage',
        subtype: 'none',
        thumb: getThumbnail(files),
        archived: isArchived,
        files: addSize(supportedCollageFiles(files)),
      })
    } else {
      console.log('Err 404: No file found')
      return res('No file found')
    }
  },

  // Return file in director. Obsolete unless security is needed
  getPageFile(req, res) {
    let page = req.params.page.replace(/%20/g, ' ')
    let category = req.params.category.replace(/%20/g, ' ')
    let path = config.dir.pages + '/' + category + '/' + page + '/' + req.params.file
    console.log(path)
    if (fs.existsSync(path)) {
      res.status(200).sendFile(path)
    } else {
      console.log('File not found')
      res.status(404).send('File not found')
    }
  },

  // Return list of all pages info and categories
  getListOfAllPages(filename, res) {
    let tree = []
    config.dir.categories.map((category) => {
      fs.readdirSync(config.dir.pages + '/' + category).map((page) => {
        module.exports._getPageData(category, page, (data, err) => {
          if (!err) {
            tree.push({ name: page, category: category, info: data })
          }
        })
      })
    })
    console.log(tree)
    res.status(200).json(tree)
  },
}
