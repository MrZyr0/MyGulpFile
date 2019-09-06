const gulp = require('gulp')
const gulp_sass = require('gulp-sass')                            // Sass compilation
const gulp_sassGlob = require('gulp-sass-glob')                   // Get multiple sass files
const gulp_prefixer = require('gulp-autoprefixer')                // Prefix CSS for compatibilities issues
const gulp_cleanCSS = require('gulp-clean-css')                   // Optimize CSS
const gulp_uglify = require('gulp-uglify')                        // Optimize JS
const gulp_imagemin = require('gulp-imagemin')                    // Optimaze images
const gulp_cache = require('gulp-cache')                          // Cache image optimizations
const imageminJpegoptim = require('imagemin-jpegoptim')           // Optimize .jpg & .jpeg images
const imageminMozjpeg = require('imagemin-mozjpeg')               // Optimize .jpg & .jpeg images
const browserSync = require('browser-sync').create()              // Sync multiple browsers & auto refresh naviguator on save
const del = require("del");                                       // Delete files before optimizations

const browserLink = '[YOUR LINK TO YOUR PROJECT USING A WEBSERVER]'
const browserPort = 3030
const srcFolder = './src'
const publicFolder = './public'

const srcFolder = './_src'
const publicFolder = '.'

const srcSass = srcFolder + '/sass/**/**/*.+(scss|sass)'
const srcJS = srcFolder + '/js/*.js'
const srcPHP = srcFolder + '/php/*.php'
const srcImg = srcFolder + '/img/*.+(svg|png|jpg|jpeg|gif)'

const publicStyleDest = publicFolder + '/'
const publicScriptDest = publicFolder + '/js'
const publicPagesDest = publicFolder + '/'
const publicImgsDest = publicFolder + '/assets'



// TODO: Add a minifier for php files and find a solution to get interlaced png

function clean(done)
{
    del([publicStyleDest + '*.css', publicScriptDest + '/*.js', publicPagesDest + '*.php', publicImgsDest + '/*'])
    gulp_cache.clearAll()
    done();
}


/********************
*   Dev functions   *
********************/

function styleDev()
{
    del(publicStyleDest + '*.css')
    return gulp.src(srcSass)
    .pipe(gulp_sassGlob())
    .pipe(gulp_sass())
    .pipe(gulp_prefixer('last 6 versions'))   // list of targeted browsers => https://browserl.ist/?q=last+6+versions
    .pipe(gulp.dest(publicStyleDest))
}

function scriptDev()
{
    del(publicScriptDest + '/*.js')
    return gulp.src(srcJS)
    .pipe(gulp.dest(publicScriptDest))
}


function pagesDev()
{
    del([publicPagesDest + '*.php'])
    return gulp.src(srcPHP)
    .pipe(gulp.dest(publicPagesDest))
}


function imgDev()
{
    del([publicImgsDest + '/img/*.+(svg|png|jpg|jpeg|gif)'])
    return gulp.src(srcImg)
    .pipe(gulp_cache(gulp_imagemin([
                          gulp_imagemin.gifsicle({interlaced: true, optimizationLevel: 1}),

                          imageminJpegoptim ({progressive: true, strilAll: true}),
                          imageminMozjpeg({progressive: true, quality: 85}),

                          gulp_imagemin.optipng({interlaced: true, optimizationLevel: 0}),

                          gulp_imagemin.svgo({ plugins: [{ sortAttrs : true }] }),
                        ])))
    .pipe(gulp.dest(publicImgsDest))
}

function fontDev() {

}


const devBuild = gulp.parallel(styleDev, scriptDev, pagesDev, imgDev)

/*********************
*   Prod functions   *
*********************/

function styleProd()
{
    del(publicStyleDest + '*.css')
    return gulp.src(srcSass)
    .pipe(gulp_sassGlob())
    .pipe(gulp_sass())
    .pipe(gulp_prefixer('last 6 versions'))   // list of targeted browsers => https://browserl.ist/?q=last+6+versions
    .pipe(gulp_cleanCSS())
    .pipe(gulp.dest(publicStyleDest))
}

function scriptProd()
{
    del(publicScriptDest + '/*.js')
    return gulp.src(srcJS)
    .pipe(gulp_uglify())
    .pipe(gulp.dest(publicScriptDest))
}


function pagesProd()
{
    del([publicPagesDest + '*.php'])
    return gulp.src(srcPHP)
    .pipe(gulp.dest(publicPagesDest))
}


function imgProd()
{
  del([publicImgsDest + '/img/*.+(svg|png|jpg|jpeg|gif)'])
  return gulp.src(srcImg)
  .pipe(gulp_cache(gulp_imagemin([
                        gulp_imagemin.gifsicle({interlaced: true, optimizationLevel: 3}),

                        imageminJpegoptim ({progressive: true, strilAll: true}),
                        imageminMozjpeg({progressive: true, quality: 85}),

                        gulp_imagemin.optipng({interlaced: true, optimizationLevel: 7}),

                        gulp_imagemin.svgo({ plugins: [{ sortAttrs : true }] }),
                      ])))
  .pipe(gulp.dest(publicImgsDest))
}

const prodBuild = gulp.parallel(styleProd, scriptProd, pagesProd, imgProd)


/********************
*   Browser Sync    *
********************/
function browserSyncReload(done)
{
  browserSync.reload();
  done();
}

function devSync()
{
    browserSync.init({
        proxy: browserLink,
        port: browserPort,
    });

    gulp.watch(srcSass, gulp.series(styleDev, browserSyncReload))
    gulp.watch(srcJS, gulp.series(scriptDev, browserSyncReload))
    gulp.watch(srcPHP, gulp.series(pagesDev, browserSyncReload))
    gulp.watch(srcImg, gulp.series(imgDev, browserSyncReload))
}


exports.default = gulp.series(clean, devBuild, devSync)
exports.work = exports.default

exports.build = gulp.series(clean, prodBuild)

exports.clean = clean
