const express = require('express')  //  backend route manager/site server
const bodyParser = require('body-parser')
const cors = require('cors')      //  some security thing?
const morgan = require('morgan')  //  for debugging
// const {sequelize} = require('./models') //  sql connector
const config = require('./config/config') // server config properties
// const mongoosedb = require('./mongomodels') //  sql connector
const mongoose = require('mongoose')
// mongoose.pluralize(null); // doesnt work??

// mongoose.connect(`mongodb://admin:Twinsrock98@192.168.1.128/familyweb?authSource=admin`) // admin/admin:Twinsrock98@

mongoose.connect(`mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}?authSource=${config.mongodb.options.authdb}`)


let db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", function(callback){
  console.log("MongoDB Connection Succeeded");
});

// var new_post = new mongoosedb['asdfr']({
//   title: 'asdfdd',
//   description: 'description'
// })

// new_post.save(function (error) {
//   if (error) {
//     console.log(error)
//   }
//   console.log('Done')
// })

const app = express()
app.use(morgan('combined')) //  formatting for debugging site hits
app.use(bodyParser.json())  
app.use(cors())

// import routes.js for URL routing. Passes 'app' object
require('./routes')(app)

// connect to sql db then run function that starts server on port defined in ./config/config.js
//  add {force: true} in () of .sync to clear database
// sequelize.sync()
  // .then(() => {
    app.listen(config.port)
    console.log(`Server Started on port ${config.port}`)
    // })
