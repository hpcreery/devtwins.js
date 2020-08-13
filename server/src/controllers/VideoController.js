const { readdirSync } = require('fs')
const config = require('../config/config')
const fs = require('fs');
const asyn = require('async');
const ffmetadata = require('ffmetadata');
const multer = require("multer")


module.exports = {

  getlistofvideofolders (req, res) {
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
  
    let folders = getDirectories(config.dir.videos)

    console.log('folders: ', folders)
    let data = []
    for(let folder in folders){
      let count = fs.readdirSync(config.dir.videos + '/' + folders[folder]).length
      
      console.log(config.dir.videos + '/' + folders[folder], count)
      data.push({name: folders[folder], display: true, info: {Files: count}})
    }
    res.json(data);
    res.end();
  },

  deletevideofolder (req, res){
    let path = config.dir.videos + '/' + req.body.dir
    console.log('Deleting: ', path)
    fs.rmdir(path, { recursive: true }, function () {
      res.send('success')
    });
    // res.send('success')
  },

  makenewfolder (req, res) {
    // let dir = req.body.dir
    let dir = config.dir.videos + '/' + req.params.name
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      res.status('200').send('success')
    } else {
      res.status('500').send('cannot be done')
    }
  },

  // https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
  getlistofvideosbyfoldername (req, res){
    let data = [];
    // console.log(config.dir.videos + '/' + req.params.name)
    fs.readdir(config.dir.videos + '/' + req.params.name, function(err, items) {
      // console.log(items)
      asyn.waterfall([
        function (callback) {
          var newitems = items.filter( function (item) {
            console.log('filter: ', item, item.substr(item.length - 4), config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
            return config.dir.supportedVideoFormats.includes(item.substr(item.length - 4))
            // callback(null, config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
          })
          // console.log('newitems:', newitems)
          callback(null, newitems)
        },
        function (filtereditems, callback) {
          // console.log('filtereditems: ', filtereditems)
          asyn.map(filtereditems, 
            function (item, innercallback) {
              // console.log("item: ", item, config.dir.videos + '/' + req.params.name + '/' + item)
              ffmetadata.read(config.dir.videos + '/' + req.params.name + '/' + item, innercallback)
            }, function(err, results) {
              // console.log('inner results', results)
              callback(null, filtereditems, results)
            }
          )
          // console.log('data: ', data)
        }], function (err, items, itemswithmetadata) {
          // console.log('results: ', items, itemswithmetadata)
          for(var i in itemswithmetadata){ 
              data.push({name: items[i], title: itemswithmetadata[i].title, display: true});
          }
          console.log('data: ', data)
          res.json(data);
          res.end();
        }
      )

    })
  },

  uploadvideo (req, res) {
    console.log(req.files)

    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
          cb(null, config.dir.videos + '/' + req.params.name)
      },
  
      // By default, multer removes file name and extensions so let's add them back
      filename: function(req, file, cb) {
          cb(null, file.originalname);
      }
    })
    const videoFilter = function(req, file, cb) {
      // Accept images only
      var supportedstring = ''
      config.dir.supportedVideoFormats.forEach(element => {
        console.log(element)
        supportedstring = supportedstring.concat(element.toUpperCase().replace('.', '') + "|")
      })
      supportedstring = supportedstring.slice(0, -1)
      console.log(supportedstring)
      var strRegExPattern = '\\.('+supportedstring+')$';
      console.log(strRegExPattern)
      if (!file.originalname.toUpperCase().match( new RegExp(strRegExPattern,'g') )) {
        console.log('Only video files are allowed!')
        req.fileValidationError = 'Only video files are allowed!';
        return cb(new Error('Only video files are allowed!'), false);
      }
      cb(null, true);
    };

    let upload = multer({ storage: storage, fileFilter: videoFilter }).array("files")
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status('406').send(req.fileValidationError);
      }
      console.log("body: ", req.body);
      console.log("files:", req.files);
      return res.sendStatus(200);
    })
    
  }


}