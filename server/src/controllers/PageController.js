const fs = require('fs')
const config = require('../config/config')
const sizeOf = require('image-size')
var path = require('path')

module.exports = {
  // Parent Folder/Categories List (filter out archived pages)
  getpagelist(req, res) {
    var category = req.params.category.replace(/%20/g, ' ')
    console.log(config.dir.pages + '/' + category)
    fs.readdir(config.dir.pages + '/' + category, function (err, items) {
      var filtereditems = items.filter(item => !item.startsWith('_'))
      console.log('List of Directories in', category, filtereditems)
      err ? res.status(500).send(err) : res.status(200).json(filtereditems)
    })
  },

  getcategorylist(req, res) {
    console.log(config.dir.pages)
    fs.readdir(config.dir.pages, function (err, items) {
      var filtereditems = items.filter(item => !item.startsWith('_'))
      console.log('List of Directories', filtereditems)
      err ? res.status(500).send(err) : res.status(200).json(filtereditems)
    })
  },

  // Page Data with supported file type alterations
  // getpagedata(req, res) {
  //   // Supported Files
  //   let isSupportedFile = (file) =>
  //     config.dir.supportedPageFormats.map((format) => file.endsWith(format)).includes(true)
  //   let supportedFiles = (files) => files.filter((file) => isSupportedFile(file))
  //   let parentFile = (files) => files[0]
  //   let hasSupportedFile = (files) => supportedFiles(files).length > 0

  //   // Supported Collages
  //   let isSupportedCollage = (file) =>
  //     config.dir.supportedCollageFormats.map((format) => file.endsWith(format)).includes(true)
  //   let supportedCollageFiles = (files) => files.filter((file) => isSupportedCollage(file))
  //   let hasSupportedCollage = (files) => supportedCollageFiles(files).length > 0

  //   let addSize = (files) =>
  //     files.map((file) => {
  //       var dimensions = sizeOf(config.dir.pages + '/' + category + '/' + page + '/' + file)
  //       return { name: file, width: dimensions.width, height: dimensions.height }
  //     })

  //   var page = req.params.name.replace(/%20/g, ' ')
  //   var category = req.params.category.replace(/%20/g, ' ')
  //   var files = []
  //   files = fs.readdirSync(config.dir.pages + '/' + category + '/' + page)
  //   console.log('List of Files in', config.dir.pages + '/' + category + '/' + page, files)
  //   if (hasSupportedFile(files)) {
  //     var staticfile = parentFile(supportedFiles(files))
  //     console.log('Supported Render File used for DIR:', config.dir.pages + '/' + staticfile)
  //     // res.status(200).sendFile(config.dir.pages + '/' + page + '/' + staticfile)
  //     res.status(200).json({ type: 'static', subtype: staticfile.split('.').pop(), files: staticfile })
  //   } else if (hasSupportedCollage(files)) {
  //     res.status(200).json({ type: 'collage', subtype: 'none', files: addSize(supportedCollageFiles(files)) })
  //   } else {
  //     res.status(404).send('No file found')
  //     console.log('Err 404: No file found')
  //   }
  // },

  getpagedata(req, res) {
    var page = req.params.name.replace(/%20/g, ' ')
    var category = req.params.category.replace(/%20/g, ' ')
    module.exports._getpagedata(category, page, (data, err) => {
      if (!err) {
        res.status(200).json(data)
      } else {
        res.status(404).send('No file found')
      }
    })
  },

  _getpagedata(category, page, res) {
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

    // Get misc info about Page
    let getThumbnail = (files) => {
      let thumbnail = files.filter(item => new RegExp('^' + 'thumb.*' + '$').test(item))
      if (thumbnail.length > 0) {
        // console.log('yea', thumbnail[0])
        return thumbnail[0]
      } else {
        // console.log('nah')
        return null
        // return "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.icons8.com%2Fcarbon-copy%2F2x%2Ffile.png&imgrefurl=https%3A%2F%2Ficons8.com%2Ficons%2Fset%2Ffile&tbnid=umEWAkqMMnbVmM&vet=12ahUKEwjj9syJrcnrAhWSfqwKHbFDA9gQMygCegUIARDYAQ..i&docid=fhdmazhWVkJ3aM&w=200&h=200&q=file%20icon&ved=2ahUKEwjj9syJrcnrAhWSfqwKHbFDA9gQMygCegUIARDYAQ"
      }
    }
    let isArchived = page.startsWith('_')
    

    let addSize = (files) =>
      files.map((file) => {
        var dimensions = sizeOf(config.dir.pages + '/' + category + '/' + page + '/' + file)
        return { name: file, width: dimensions.width, height: dimensions.height }
      })

    // var page = req.params.name.replace(/%20/g, ' ')
    // var category = req.params.category.replace(/%20/g, ' ')
    var files = []
    files = fs.readdirSync(config.dir.pages + '/' + category + '/' + page)
    console.log('List of Files in', config.dir.pages + '/' + category + '/' + page, files)
    if (hasSupportedFile(files)) {
      var staticfile = parentFile(supportedFiles(files))
      console.log('Supported Render File used for DIR:', config.dir.pages + '/' + staticfile)
      // res.status(200).sendFile(config.dir.pages + '/' + page + '/' + staticfile)
      res({ type: 'static', subtype: staticfile.split('.').pop(), thumb: getThumbnail(files), archived: isArchived, files: staticfile })
    } else if (hasSupportedCollage(files)) {
      res({ type: 'collage', subtype: 'none', thumb: getThumbnail(files), archived: isArchived, files: addSize(supportedCollageFiles(files)) })
    } else {
      res('No file found')
      console.log('Err 404: No file found')
    }
  },

  // Return file in director. Obsolete unless security is needed
  getpagefile(req, res) {
    var page = req.params.page.replace(/%20/g, ' ')
    var category = req.params.category.replace(/%20/g, ' ')
    var path = config.dir.pages + '/' + category + '/' + page + '/' + req.params.file
    console.log(path)
    if (fs.existsSync(path)) {
      res.status(200).sendFile(path)
    } else {
      console.log('File not found')
      res.status(404).send('File not found')
    }
  },


  // Return list of all pages info and categories
  getlistofallpages (filename, res) {
    var tree = []
    config.dir.categories.map((category) => {
      fs.readdirSync(config.dir.pages + '/' + category).map((page) => {
        module.exports._getpagedata(category, page, (data, err) => {
          if (!err) {
            tree.push({name: page, category: category, info: data})
          }
        })
      })
    })
    console.log(tree)
    res.status(200).json(tree)
  }

}
