const fs = require('fs');
const config = require('../config/config')


module.exports = {

  getfamphoto (req, res) {
    fs.readdir(config.dir.images, function(err, items) {
      res.json(items);
    })
  },

  getfamphotobyname (req, res){
    console.log(config.dir.images + '/' + req.params.name);
    res.sendFile(config.dir.images + '/' + req.params.name);
  }
  
}
