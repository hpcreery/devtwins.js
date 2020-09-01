const fs = require('fs')
const config = require('../config/config')
const sizeOf = require('image-size')
var path = require('path')

module.exports = {
  // Parent Folder/Categories List
  getpagelist(req, res) {
    var category = req.params.category.replace(/%20/g, ' ')
    console.log(config.dir.pages + '/' + category)
    fs.readdir(config.dir.pages + '/' + category, function (err, items) {
      console.log('List of Directories in', category, items)
      err ? res.status(500).send(err) : res.status(200).json(items)
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
      res({ type: 'static', subtype: staticfile.split('.').pop(), files: staticfile })
    } else if (hasSupportedCollage(files)) {
      res({ type: 'collage', subtype: 'none', files: addSize(supportedCollageFiles(files)) })
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


  // Retur lisf of all pages info and categories
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
