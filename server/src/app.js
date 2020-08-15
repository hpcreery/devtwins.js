const express = require('express')  //  backend route manager/site server
const bodyParser = require('body-parser')
const cors = require('cors')      //  some security thing?
const morgan = require('morgan')  //  for debugging 
const config = require('./config/config') // server config properties

//// UNCOMMENT FOR MONGODB CONNECTION
// const mongoose = require('mongoose')
// mongoose.connect(`mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}?authSource=${config.mongodb.options.authdb}`)
// let db = mongoose.connection
// db.on("error", console.error.bind(console, "MongoDB connection error"));
// db.once("open", function(callback){
//   console.log("MongoDB Connection Succeeded");
// });

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
app.use(morgan('combined')) // log formatting for debugging site hits
app.use(bodyParser.json())  
app.use(cors())

// import routes.js for URL routing. Passes 'app' object
require('./routes')(app)

// TODO: Dont start the server unless mongoDB is present
app.listen(config.port)
console.log(`Server Started on port ${config.port}`)
