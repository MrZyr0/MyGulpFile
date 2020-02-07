# MyGulpConfig

## Introduction

Here is my gulpfile that I use to develop my WordPress themes.
You can use it as is or modify its configuration to adapt it to your project architecture.\
**Feel free to suggest improvements by creating issues or fork it !**

&nbsp; <!-- break line -->

## Includes

This project includes lot of nodes module. Please read package.json and package-lock.json to check their own licenses.

&nbsp; <!-- break line -->

## Installation

1. Install Node.js
First, you need to install node.js on your system.\
Visit <https://nodejs.org/>

2. Clone the repository

3. Install dependencies of npm using `npm i`

4. Configure browserSync
Edit the file `gulpfile.js` at the root of the projet (_lines 14 and 15_) to setup the link and the port to use by browserSync like below.

```javascript
const browserLink = 'http://localhost/'
const browserPort = 3030
```

5. **You're done**\
  Work in the /_src folder, all your changes will automatically be optimized and copied to the right place using the `npx gulp` command during development or `npx gulp build` to build your project.

_I prefer to use package locally so I use npx to execute gulp. If you prefer to call gulp directly, install it globally : `npm i -g gulp`_

&nbsp; <!-- break line -->

## Commandes

### `npx gulp`

When developing, use browser sync to speed up your productivity.
It'll compile the scss, prefixes it, quickly optimize images, minify scripts and copy PHP files to the good folder.

### `npx gulp build`

Optimize your project before upload it !
It'll compile the scss, prefixes it, better optimize images (with an acceptable lossy compression), minify scripts and copy PHP files to the good folder.

### `npx gulp clean`

For any reason you what to clean-up the project by delete build files.
It will clear caching and delete all build files to just keep essential files and sources.

> I prefer to use package locally so I use `npx` to execute gulp.
> If you prefer to call gulp directly, install it globally : `npm i -g gulp`
