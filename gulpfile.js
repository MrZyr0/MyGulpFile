const gulp = require('gulp');
const gulp_sass = require('gulp-sass')
const gulp_csscomb = require('gulp-csscomb')
const gulp_prefixer = require('gulp-autoprefixer')
const gulp_cssnano = require('gulp-cssnano')
const gulp_compressor = require('gulp-compress')
const gulp_if = require('gulp-if')
const gulp_cache = require('gulp-cache')
const gulp_imagemin = require('gulp-imagemin')
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const browserSync = require('browser-sync').create()
const del = require("del");
// const gulp_sourceMaps = require('gulp-sourcemaps')

const browserLink = 'https://localhost/1-SITES/MyGulpConfig/public/'
const browserPort = 443
const srcFolder = './src'
const publicFolder = './public'

const csscombDevConfig = './csscomb_dev_config.json'
const csscombProdConfig = './csscomb_prod_config.json'

const srcSass = srcFolder + '/styles/**/*.+(scss|sass)'
const srcJS = srcFolder + '/scripts/*.js'
const srcHTML = srcFolder + '/pages/**/*.html'
const srcPHP = srcFolder + '/pages/**/*.php'
const srcImg = srcFolder + '/imgs/*.*'

const publicStyleDest = publicFolder + '/styles/'
const publicScriptDest = publicFolder + '/scripts/'
const publicPagesDest = publicFolder + '/pages/'
const publicImgsDest = publicFolder + '/imgs/'

// TODO: Create an init function
// TODO: integrate uncss to styleProd()

function clean(done)
{
    del([publicFolder + '/**/*.*', '!' + publicFolder + '/imgs', '!' + publicFolder + '/imgs/**/*.*', '!' + publicFolder + '/imgs/**/*'])
    done();
}

function cleanFull(done)
{
    del(publicFolder + '/**/*.*')
    done();
}

const isIndex = function(file)
{
    if (file.basename == 'index.html' || file.basename == 'index.php') { return true }
    else { return false }
}

const isPage = function(file)
{
    if (file.basename != 'index.html' && file.basename != 'index.php') { return true }
    else { return false }
}


/********************
*   Dev functions   *
********************/

function styleDev()
{
    del(publicStyleDest + '/*')
    return gulp.src(srcSass)
    // // .pipe(gulp_plumber({ errorHandler: onError }))
    .pipe(gulp_sass())
    .pipe(gulp_prefixer())
    .pipe(gulp_csscomb(csscombDevConfig))       // PB config not used https://github.com/koistya/gulp-csscomb/issues/37 // TODO: resolv, csscomb config pb
    // // .pipe(gulp_notify("Sass compiled !"))
    .pipe(gulp.dest(publicStyleDest))
}

// TODO: FIX IT !
function beautifySCSS()
{
    return gulp.src(srcSass)
    .pipe(gulp_csscomb(csscombDevConfig))       // PB config not used https://github.com/koistya/gulp-csscomb/issues/37 // TODO: resolv, csscomb config pb
    .pipe(gulp.dest(srcSass))
}

function scriptDev()
{
    del(publicScriptDest + '/*')
    return gulp.src(srcJS)
    .pipe(gulp.dest(publicScriptDest))
}

function htmlDev()
{
    del([publicPagesDest + '/*', publicFolder + '/*.html'])
    return gulp.src(srcHTML)
    .pipe(gulp_if(isIndex, gulp.dest(publicFolder)))
    .pipe(gulp_if(isPage, gulp.dest(publicPagesDest)))
}

function phpDev()
{
    del([publicPagesDest + '/*', publicFolder + '/*.php'])
    return gulp.src(srcPHP)
    .pipe(gulp_if(isIndex, gulp.dest(publicFolder)))
    .pipe(gulp_if(isPage, gulp.dest(publicPagesDest)))
}

const pagesDev = gulp.parallel(htmlDev, phpDev)

function imgDev()
{
    return gulp.src(srcImg)
    .pipe(gulp_cache(gulp_imagemin([
                                    gulp_imagemin.gifsicle({interlaced: true, optimizationLevel: 1, colors: 128}),
                                    gulp_imagemin.jpegtran({progressive: true}),
                                    imageminJpegoptim ({progressive: true, strilAll: true}),
                                    imageminMozjpeg({quality: 50, arithmetic: true, arithmetic: true, smooth: 50}),
                                    imageminPngquant({speed: 1, strip: true, quality: [0.3, 0.5]}),
                                    imageminSvgo(),
                                    ]))
        )
    .pipe(gulp.dest(publicImgsDest))
}

const devBuild = gulp.parallel(styleDev, scriptDev, pagesDev, imgDev)

/*********************
*   Prod functions   *
*********************/

function styleProd()
{
    return gulp.src(srcSass)
    .pipe(gulp_sass())
    .pipe(gulp_prefixer())
    .pipe(gulp_csscomb())       // PB config not used https://github.com/koistya/gulp-csscomb/issues/37 // TODO: resolv, csscomb config pb
    .pipe(gulp_cssnano())
    // .pipe(gulp_compressor.minifyCss())
    .pipe(gulp.dest(publicStyleDest))
}

function scriptProd()
{
    return gulp.src(srcJS)
    .pipe(gulp_compressor.minifyJs())
    .pipe(gulp.dest(publicScriptDest))
}

function htmlProd()
{
    return gulp.src(srcHTML)
    .pipe(gulp_if(isIndex, gulp.dest(publicFolder)))
    .pipe(gulp_if(isPage, gulp.dest(publicPagesDest)))
}

function phpProd()
{
    return gulp.src(srcPHP)
    .pipe(gulp_if(isIndex, gulp.dest(publicFolder)))
    .pipe(gulp_if(isPage, gulp.dest(publicPagesDest)))
}

const pagesProd = gulp.parallel(htmlProd, phpProd)

function imgProd()
{
    del([publicImgsDest + '/*'])
    return gulp.src(srcImg)
    .pipe(gulp_cache(gulp_imagemin([
                                    gulp_imagemin.gifsicle({interlaced: true, optimizationLevel: 3, colors: 128}),
                                    gulp_imagemin.jpegtran({progressive: true, arithmetic: true}),
                                    gulp_imagemin.optipng({optimizationLevel: 7}),
                                    imageminJpegoptim ({progressive: true, strilAll: true}),
                                    imageminMozjpeg({quality: 50, arithmetic: true, arithmetic: true, smooth: 50}),
                                    imageminPngquant({speed: 1, strip: true, quality: [0.3, 0.5]}),
                                    imageminSvgo({
                                                    plugins: [
                                                        {cleanupAttrs: true },
                                                        {cleanupEnableBackground: true },
                                                        {cleanupIDs: true },
                                                        {cleanupNumericValues: true },
                                                        {cleanupListOfValues: true },

                                                        {collapseGroups: true },

                                                        {convertStyleToAttrs: true },
                                                        {convertColors: true },
                                                        {convertPathData: true },
                                                        {convertTransform: true },
                                                        {convertShapeToPath: true },

                                                        {inlineStyles: true },

                                                        {mergePaths: true },

                                                        {minifyStyles: true },

                                                        {reusePaths: true },

                                                        {removeDoctype: true },
                                                        {removeXMLProcInst: true },
                                                        {removeComments: true },
                                                        {removeMetadata: true },
                                                        {removeTitle: true },
                                                        {removeDesc: true },
                                                        {removeUselessDefs: true },
                                                        {removeXMLNS: true },
                                                        {removeEditorsNSData: true },
                                                        {removeEmptyAttrs: true },
                                                        {removeHiddenElems: true },
                                                        {removeEmptyText: true },
                                                        {removeEmptyContainers: true },
                                                        {removeViewBox: true },
                                                        {removeUnknownsAndDefaults: true },
                                                        {removeNonInheritableGroupAttrs: true },
                                                        {removeUselessStrokeAndFill: true },
                                                        {removeUnusedNS: true },
                                                        {removeRasterImages: true },
                                                        {removeDimensions: true },
                                                        {removeAttrs: true },
                                                        {removeOffCanvasPaths: true },

                                                        {sortAttrs: true },
                                                    ]
                                                }),
                                  ])
                    )
        )
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
    gulp.watch(srcHTML, gulp.series(htmlDev, browserSyncReload))
    gulp.watch(srcPHP, gulp.series(phpDev, browserSyncReload))
    gulp.watch(srcImg, gulp.series(imgDev, browserSyncReload))
    gulp.watch("./**/**/*", browserSyncReload)
}


// exports.default = defaultTask
exports.prodBuild = gulp.series(cleanFull, devBuild)
exports.prodbuild = exports.prodBuild

exports.devBuild = gulp.series(clean, prodBuild) // TODO: add beautifySCSS
exports.devbuild = exports.devBuild

exports.sync = gulp.series(clean, devBuild, devSync)
exports.devSync = exports.sync
exports.devsync = exports.sync
exports.dev = exports.sync

exports.clean = clean
exports.cleanFull = cleanFull
exports.cleanfull = cleanFull
exports.fullClean = cleanFull
exports.fullclean = cleanFull
