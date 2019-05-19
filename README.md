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
const browserPort = 80
```

6. You're ready to go !



## Commandes

##### Browser sync
When developing, use browser sync to speed up your productivity.
It'll compile the scss, prefixes it, optimize images and copy scripts/html/PHP in the public folder.
```bash
gulp sync
```
You can use these aliases:
- `gulp devSync`
- `gulp devsync`
- `gulp dev`

##### Build files in dev mode

To manualy execute the build task use in `gulp sync`, use one of these commands :
- `gulp devBuild`
- `gulp devbuild`.

##### Build before push to production
Optimize your project before upload it !
It'll :
- compile sass
- add prefixes to your css
- concat the css and scripts
- minify css
- fully optimize images (with little lossy compression)

Use one of these aliases to do this :
- `gulp prodBuild`
- `gulp prodbuild`.

##### Clean the project
For any reason you what to clean-up the public folder, you can soft clean with `gulp clean`. This won't delete images.

To fully clean the folder and delete all files, use `gulp fullClean` or one of these alisases:
- `gulp cleanFull`
- `gulp cleanfull`
- `gulp fullclean`
