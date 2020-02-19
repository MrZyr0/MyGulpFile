<!-- markdownlint-disable MD012 MD022 MD024 -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


&nbsp; <!-- break line -->

## [Unreleased]

### Added

- Folder architecture generation function
- Sourcemap for dev functions
- Minifier on PHP files
- Beautifier for sass files
- Optimizations for fonts
- Add Babel
- Add TypeScript support
- Add Coffescript support
- Add [Rucksackcss](https://www.rucksackcss.org/docs/)
- Generate Webp for matrix images

### Fixed

- Get interlaced PNG after optimization

&nbsp; <!-- break line -->

## [2.1.2] - 2020-02-19

### Changed

- Update `imagemin-mozjpeg` dependency

### Fixed

- `clean` gulp task for clearing directory

### Remove

- Useless `del` commande in gulp tasks


## [2.1.1] - 2020-02-07

### Fixed

- Sources files path
- `del` function for clearing directory
- `sass-glob` for multiple style sheets


## [2.1.0] - 2019-09-13
### Added

- Multiple style sheets file support : style.css & admin.css


## [2.0.0] - 2019-09-06
### Changed

- BrowserSync default port (80 => 3030) for compatibility

### Removed

- `beautifySCSS` due to `csscomb` removing
- `htmlDev` function useless because there is no processing on it

## [1.2.1] - 2019-08-10

### Security

- Fix `lodash` dependency vulnerability


## [1.2.0] - 2019-05-20
### Added

- `gulp-sass-glob` support


## [1.1.1] - 2019-05-12
### Security

- Fix vulneralibities due to dependencies


## [1.1.0] - 2019-05-12
### Fixed

- PHP & HTML source path


## [1.0.0] - 2019-05-12
### Added

- production, clean & dev commands according to README file
- add `browser-sync` support
- add `del` support
- add `gulp` support
- add `gulp-autoprefixer` support
- add `gulp-cache` support
- add `gulp-compress` support
- add `gulp-csscomb` support
- add `gulp-cssnano` support
- add `gulp-if` support
- add `gulp-imagemin` support
- add `gulp-minify` support
- add `gulp-sass` support
- add `imagemin-jpegoptim` support
- add `imagemin-mozjpeg` support
- add `imagemin-pngquant` support
- add `imagemin-svgo` support
