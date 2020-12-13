module.exports = {
  port: 8081,
  dir: {
    pages: process.env.DIR_PUBLIC || process.cwd() + '/public',
    categories: ['Photos', 'Projects'],
    supportedPageFormats: ['.md', '.html', '.pdf', '.ipynb'],
    supportedCollageFormats: ['.png', '.jpg', '.jpeg']  //, '.gif', '.mp4', '.mp3'
  }
}