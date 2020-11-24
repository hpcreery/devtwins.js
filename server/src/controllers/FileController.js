const { readdirSync } = require('fs')
const config = require('../config/config')
const fs = require('fs')
// const asyn = require('async');
// const ffmetadata = require('ffmetadata');
const multer = require('multer')

module.exports = {
  // async readdircontents (req, res) {
  //   // var path = req.body.path
  //   // var path = 'C:\\Users\\phcre\\Documents\\GameBoy'
  //   var path = config.dir.files
  //   let list = []
  //   // let list = fs.readdirSync(path)
  //   fs.readdir(path, function(err, items) {
  //     console.log(items);
  //     for (var i=0; i<items.length; i++) {
  //         console.log(items[i]);
  //         list.push(items[i])
  //     }
  //     // console.log('list', list)
  //     res.send(list)
  //     res.end();
  //   });
  // },

  async readdircontents2(req, res) {
    // var path = req
    var path = req.query.path
    // console.log('Received path: ', path)
    if (typeof path === 'undefined') {
      path = config.dir.files
    } else {
      path = config.dir.files + '/' + path
    }
    // console.log('Readign folders and files from ', path)
    // var path = 'C:\\Users\\phcre\\Documents\\GameBoy'
    const getDirectories = (source) =>
      readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
          return { name: dirent.name, display: true, icon: 'mdi-folder' }
        })
    const getFiles = (source) =>
      readdirSync(source, { withFileTypes: true })
        .filter((dirent) => !dirent.isDirectory())
        .map((dirent) => {
          var icon = 'mdi-file'
          switch (dirent.name.split('.').pop().toLowerCase()) {
            case 'zip':
              icon = 'mdi-zip-box'
              break
            case 'doc':
            case 'docx':
            case 'txt':
            case 'md':
              icon = 'mdi-file-document-outline'
              break
            case 'json':
              icon = 'mdi-code-json'
              break
            case 'c':
            case 'js':
            case 'cpp':
            case 'vue':
            case 'jsx':
            case 'py':
            case 'pyc':
            case 'ts':
            case 'ps1':
            case 'sh':
            case 'bat':
              icon = 'file-code'
              break
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'ps':
            case 'bmp':
            case 'raw':
            case 'nef':
            case 'crw':
            case 'cr2':
            case 'cr3':
            case 'ciff':
              icon = 'image'
              break
            case 'mp4':
            case 'vid':
            case 'avi':
            case 'wmv':
            case 'mov':
              icon = 'mdi-file-video'
              break
            case 'mp3':
              icon = 'mdi-file-music'
              break
            case 'pdf':
              icon = 'mdi-file-pdf'
              break
            case 'dxf':
            case 'dwg':
            case 'svg':
              icon = 'mdi-drawing-box'
              break
            case 'xls':
            case 'xlsx':
              icon = 'mdi-table-large'
              break
            default:
              icon = 'mdi-file'
              break
          }
          return { name: dirent.name, display: true, icon: icon, thumb: icon }
        })

    let folders = getDirectories(path)
    let files = getFiles(path)
    // console.log(folders,files)
    res.send({ folders, files })
    res.end()
  },

  // readdircontents3 (req, res) {
  //   const getDirectories = source =>
  //     readdirSync(source, { withFileTypes: true })
  //       .filter(dirent => dirent.isDirectory())
  //       .map(dirent => dirent.name)
  //   let files = getDirectories(config.dir.files)
  //   // console.log(files)
  //   let data = []
  //   for(var file in files){
  //     data.push({name: files[file]});
  //   }
  //   res.json(data);
  //   res.end();
  // },

  createdir(req, res) {
    console.log('creating dir:', req.body.dir)
    // let dir = req.body.dir
    let dir = config.dir.files + '/' + req.body.dir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      res.status('200').send('success')
    } else {
      res.send('Folder already exists')
    }
    // res.status('200').send('success')
  },

  deletefolder(req, res) {
    // console.log('deleting dir:', req.body.dir)
    let dir = config.dir.files + '/' + req.body.dir
    console.log('deleting dir:', dir)

    try {
      fs.rmdirSync(dir, { recursive: true })
      res.status('200').send('success')
    } catch (err) {
      console.error(err)
      res.status('406').send(err)
    }
  },

  deletefile(req, res) {
    let subdir = req.params.dir + '/'
    if (req.params.dir === 'root' || typeof req.params.dir === 'undefined') {
      subdir = ''
    }
    let dir = config.dir.files + '/' + subdir + req.body.file
    console.log('deleting file:', dir)

    try {
      fs.unlinkSync(dir)
      res.status('200').send('success')
    } catch (err) {
      console.error(err)
      res.status('406').send(err)
    }
  },

  uploadfile(req, res) {
    if (req.params.dir === 'root') {
      req.params.dir = ''
    }
    console.log('uploading dir:', config.dir.files + '/' + req.params.dir)
    // console.log('Form submitting:', req.files.get('files'))
    // console.log()

    // let dir = config.dir.files + '/' + req.body.dir
    // fs.rmdirSync(dir, { recursive: true });

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, config.dir.files + '/' + req.params.dir)
      },

      // By default, multer removes file name and extensions so let's add them back
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      },
    })
    const videoFilter = function (req, file, cb) {
      // // Accept images only
      // var supportedstring = ''
      // config.dir.supportedVideoFormats.forEach(element => {
      //   console.log(element)
      //   supportedstring = supportedstring.concat(element.toUpperCase().replace('.', '') + "|")
      // })
      // supportedstring = supportedstring.slice(0, -1)
      // console.log(supportedstring)
      // var strRegExPattern = '\\.('+supportedstring+')$';
      // console.log(strRegExPattern)
      // if (!file.originalname.toUpperCase().match( new RegExp(strRegExPattern,'g') )) {
      //   console.log('Only video files are allowed!')
      //   req.fileValidationError = 'Only video files are allowed!';
      //   return cb(new Error('Only video files are allowed!'), false);
      // }
      cb(null, true)
    }

    let upload = multer({ storage: storage, fileFilter: videoFilter }).array('files')
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status('406').send(req.fileValidationError)
      }
      console.log('body: ', req.body)
      console.log('files:', req.files)
      return res.sendStatus(200)
    })
  },
}
