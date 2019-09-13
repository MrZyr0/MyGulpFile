# MyGulpConfig

## Introduction
It's my gulp 4 configuration when i'm developping.
For now it's the first version so it can have some problems.
Feel free to suggest improvements or fork it to customize it!

## Installation

1. Install Node.js
First, you need to install node.js on your system.
Visit https://nodejs.org/

2. Clone the repository

3. Install dependencies of npm using
```bash
npm i
```

4. Install gulp globaly
```bash
npm i -g gulp
```

5. Configure browserSync
Edit the file `gulpfile.js` at the root of the projet at lines 18 and 19 to setup the link and the port to use by browserSync like below.

```javascript
const browserLink = 'http://localhost/'
const browserPort = 3030
```

6. You're ready to go !
Work in the /_src folder, all your changes will automatically be optimized and copied to the right place using the `gulp' command during development or `gulp build` to build your project.


## Commandes

##### `gulp`
When developing, use browser sync to speed up your productivity.
It'll compile the scss, prefixes it, quickly optimize images, minify scripts and copy PHP files to the good folder.


##### `gulp build`
Optimize your project before upload it !
It'll compile the scss, prefixes it, better optimize images (with an acceptable lossy compression), minify scripts and copy PHP files to the good folder.

##### `gulp clean`
For any reason you what to clean-up the project by delete build files.
It will clear caching and delete all build files to just keep essential files and sources.
