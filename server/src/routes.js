// const AuthenticationController = require('./controllers/AuthenticationController')
// const MusicController = require('./controllers/MusicController')
// const VideoController = require('./controllers/VideoController')
// const PhotoController = require('./controllers/PhotoController')
const PageController = require('./controllers/PageController')
// const FileController = require('./controllers/FileController')
// const NewAuthenticationController = require('./controllers/NewAuthenticationController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

// const express = require('express');
// const config = require('./config/config')


module.exports = (app) => {
  
  app.get('/test', (req, res) => {
    res.send(
      "Hello World"
    )
  })


  // ############  AUTH  ############

  // app.post('/register', AuthenticationControllerPolicy.register, NewAuthenticationController.register)

  // app.post('/login', NewAuthenticationController.login)

  // ############  PAGES  ############

  app.get('/pagelist/:category', PageController.getpagelist) // () => return pages: names, types, ...

  app.get('/pagedata/:category/:name', PageController.getpagedata) // (page) => return page: type, content, ...

  app.get('/pagecontent/:category/:page/:file', PageController.getpageimage) // (page, image) => return image ...

  // ############  PHOTOS  ############

  // app.get('/photo', PhotoController.getphoto) // () => return photo list of page

  // app.get('/photo/:name', PhotoController.photobyname) // (page, photo) => return photo

  // ############  FILES  ############


  app.get('/', (req, res) => {
    res.send(
      "You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage. Documentation to come soon..."
    )
  })

  app.get('/help', (req, res) => {
    res.sendFile(process.cwd() + '/README.md')
  })

}