const PageController = require('./controllers/PageController')

const express = require('express')
const config = require('./config/config')

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('Hello World')
  })

  // ############  PAGES  ############

  app.get('/sitemap/', PageController.getSiteMap) // () => return pages: names, types, ...

  app.get('/categorylist/', PageController.getCategoryList) // () => return pages: names, types, ...

  app.get('/pagelist/:category', PageController.getPageList) // () => return pages: names, types, ...

  app.get('/pageinfo/:category/:name', PageController.getPageData) // (page) => return page: type, content, ...

  // app.get('/pagecontent/:category/:page/:file', PageController.getpagefile) // (page, image) => return image ...

  app.use('/pagecontent/', express.static(config.dir.pages))

  // app.get('/pagebanner/:category/:page', PageController.getpageimage) // (page, image) => return image ...

  app.get('/pages', PageController.getListOfAllPages)

  // ############  MISC  ############

  app.get('/', (req, res) => {
    res.send(
      'You have landed on the Full Stack application server-side instance.'
    )
  })

}
