![Banner](/doc/banner3.png)

# devtwins.js

Flat File Headless CMS SPA written by Hunter Creery and Peyton Creery to showcase photos and developments

:construction: This project is still under development :construction:

## About

The easiest and quickest way to get your work on the web for those who are tech savvy, visually inspired, and want to get straight-to-the-point. You can publish new pages from any device over any file share protocol of your choice. Organize and share without a CMS. And do updates on the go!

### How does it work?

You simply create directories on you computer/server and these will automatically become pages. Place your report/files/content in those directories and they will be served as page sites.

Below is an example of the directory layout for a simple webpage.

`[public-dir]/[category]/[page]/[content-file]`

```
[public-dir]
.
_app
├── Home
│   └── README.md
├── Footer
│   └── footer.json
Projects
├── My First Project
│   ├── index.md
│   └── images
│       └── sweet-pic-referenced-in-markdown.png
├── Cool Thing
│   └── Cool-Thing.ipynb
├── Formal Report
│   └── Report.pdf
Photos
├── Family
│   ├── hunter.jpg
│   ├── lucas.jpg
│   └── peyton.jpg
└── Friends
    └── Mark.png
```

Already have a directory of all the work you want to share? Just point the instance to it and thats it!

All of your website attributes can be modified by editing the files under the `_app` directory.

### Supported Content Files

#### Markdown (.md)

- Supports displaying Markdown files for a simple yet powerful method for conveying your message.

#### PDF (.pdf)

- Shows PDF files as pages. The standard for professional reports.

#### Jupyter Notebooks (.ipynb)

- Renders non-interactive Jupyter notebooks along with kernel type to share your research done with programming.
  Supports LATEX equations, code blocks, images, and more!

#### Image Collage (.png/.jpeg/.jpg)

- Just drop all your images in a folder and thats all there is to creating an awesome collage!

## Installation

Create your own instance to show off your projects

1. `git clone https://github.com/hpcreery/devtwins.js`
2. Install nodejs and pm2
   - Ubuntu:
     - `$ sudo apt install nodejs`
     - `$ npm install pm2 -g`
3. Setup environment

   - `$ nano ecosystem.config.js`

     ```
     module.exports = {
     apps : [{
         name: 'server',
         cwd: '[path-to-home]/devtwins.js/server/',
         script: 'npm',
         args: 'start',
         env: {
         'DIR_PUBLIC': '[path-to-public-dir]',
         },
         watch: true,
     }, {
         name: 'client',
         cwd: '[path-to-home]/devtwins.js/client/',
         script: 'npm',
         args: 'start',
         env: {
         'REACT_APP_BACKEND': 'https://[your-domain].com/api',
         },
         watch: true
     }],

     deploy : {
         production : {
         user : 'SSH_USERNAME',
         host : 'SSH_HOSTMACHINE',
         ref  : 'origin/master',
         repo : 'GIT_REPOSITORY',
         path : 'DESTINATION_PATH',
         'pre-deploy-local': '',
         'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
         'pre-setup': ''
         }
     }
     };
     ```

     _Note: Replace all instances of [ ] with your own setup parameters_

4. Start server
   - `$ pm2 start ecosystem.config.js`

## Roadmap

- [ ] Themes
