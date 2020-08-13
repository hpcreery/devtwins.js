const fs = require('fs')
// const path = require('path')
// const config = require('../config/config')
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const mongoosedb = {}


fs
  .readdirSync(__dirname)
  .filter((file) =>
      file !== 'index.js'
  )
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file))
    const ThisSchema = new Schema( require('./' + file) );
    const Name = file.split('.').slice(0, -1).join('.')
    console.log('Schema:', Name, ThisSchema)
    mongoosedb[Name] = mongoose.model(Name, ThisSchema)
  })

  console.log(mongoosedb)

module.exports = mongoosedb