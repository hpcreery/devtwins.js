module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'tabtracker',  //  use environment variable DB_NAME or in not defined, fallback to 'tabtracker' db name
    user: process.env.DB_USER || 'tabtracker',
    password: process.env.DB_PASS || 'tabtracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tabtracker.sqlite'
    }
  },
  mongodb: {
    host: process.env.DB_HOST || '192.168.1.128',
    database: process.env.DB_NAME || 'familyweb',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'Twinsrock98',
    options: {
      authdb: process.env.DB_AUTH || 'admin'
    }
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },

  dir: {
    images: process.env.DIR_IMG || 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/family_images',
    videos: process.env.DIR_VID || 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/videos',
    supportedVideoFormats: ['.mp4'],
    files: process.env.DIR_FILES || 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/files',
    movies: process.env.DIR_MOVIES || '',
    music: process.env.DIR_MUSIC || 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/music'
  }
}