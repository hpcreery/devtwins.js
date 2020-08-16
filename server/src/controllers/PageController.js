const fs = require('fs');
const config = require('../config/config')


module.exports = {

  getpagelist (req, res) {
    var category = req.params.category.replace(/%20/g, " ")
    console.log(config.dir.pages + '/' + category)
    fs.readdir(config.dir.pages + '/' + category, function(err, items) {
      console.log(items)
      err ? res.status(500).send(err) : res.status(200).json(items);
    })
  },

  getpagedata (req, res){
    let isSupportedFile = (file) => config.dir.supportedPageFormats.map(format => file.endsWith(format)).includes(true)
    let supportedFiles = (files) => files.filter(file => isSupportedFile(file))
    let parentFile = (files) => files[0]
    let hasSupportedFile = (files) => supportedFiles(files).length > 0

    let isSupportedCollage = (file) => config.dir.supportedCollageFormats.map(format => file.endsWith(format)).includes(true)
    let supportedCollageFiles = (files) => files.filter(file => isSupportedCollage(file))
    let hasSupportedCollage = (files) => supportedCollageFiles(files).length > 0

    var page = req.params.name.replace(/%20/g, " ")
    var category = req.params.category.replace(/%20/g, " ")
    var files = []
    files = fs.readdirSync(config.dir.pages + '/' + category + '/' + page)
    console.log("Files:", files)
    if (hasSupportedFile(files)) {
      var staticfile = parentFile(supportedFiles(files))
      console.log('found one')
      console.log(config.dir.pages + '/' + staticfile)
      // res.status(200).sendFile(config.dir.pages + '/' + page + '/' + staticfile)
      res.status(200).json({type: 'static', subtype: staticfile.split('.').pop(), file: staticfile})
    } else if (hasSupportedCollage(files)) {
      res.status(200).json({type: 'collage', images: supportedCollageFiles(files)})
    } else {
      res.status(404).send('No file found')
      console.log('Err 404: No file found')
    }

  },

  getpageimage (req, res){
    var page = req.params.page.replace(/%20/g, " ")
    var category = req.params.category.replace(/%20/g, " ")
    var path = config.dir.pages + '/' + category + '/' + page + '/' + req.params.file
    console.log(path)
    if (fs.existsSync(path)) {
      res.status(200).sendFile(path);
    } else {
      console.log('File not found')
      res.status(404).send('File not found')
    }
  }
  
}
