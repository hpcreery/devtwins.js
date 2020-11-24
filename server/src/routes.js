// const AuthenticationController = require('./controllers/AuthenticationController')
// const MusicController = require('./controllers/MusicController')
// const VideoController = require('./controllers/VideoController')
// const PhotoController = require('./controllers/PhotoController')
const PageController = require('./controllers/PageController')
// const FileController = require('./controllers/FileController')
// const NewAuthenticationController = require('./controllers/NewAuthenticationController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const express = require('express')
// const config = require('./config/config')

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('Hello World')
  })

  // ############  AUTH  ############

  // app.post('/register', AuthenticationControllerPolicy.register, NewAuthenticationController.register)

  // app.post('/login', NewAuthenticationController.login)

  // ############  PAGES  ############

  app.get('/sitemap/', PageController.getSiteMap) // () => return pages: names, types, ...

  app.get('/categorylist/', PageController.getCategoryList) // () => return pages: names, types, ...

  app.get('/pagelist/:category', PageController.getPageData) // () => return pages: names, types, ...

  app.get('/pageinfo/:category/:name', PageController.getPageData) // (page) => return page: type, content, ...

  // app.get('/pagecontent/:category/:page/:file', PageController.getpagefile) // (page, image) => return image ...

  app.use('/pagecontent/', express.static(process.cwd() + '/public'))

  // app.get('/pagebanner/:category/:page', PageController.getpageimage) // (page, image) => return image ...

  app.get('/pages', PageController.getListOfAllPages)

  // ############  PHOTOS  ############

  // app.get('/photo', PhotoController.getphoto) // () => return photo list of page

  // app.get('/photo/:name', PhotoController.photobyname) // (page, photo) => return photo

  // ############  FILES  ############

  app.get('/', (req, res) => {
    res.send(
      'You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage. Documentation to come soon...'
    )
  })

  app.get('/help', (req, res) => {
    res.sendFile(process.cwd() + '/README.md')
  })
}
