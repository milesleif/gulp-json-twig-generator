const gulp = require('gulp')
const data = require('gulp-data')
const twig = require('gulp-twig')
const sass = require('gulp-sass')
const pleeease = require('gulp-pleeease')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const fs = require('fs')
const twigMarkdown = require('twig-markdown')
const livereload = require('gulp-livereload')
const include = require('gulp-include') // could also use browserify


const SOURCE_DIR = './source';
const WEBROOT_DIR = './public';
const WEBROOT_DIR_ASSETS = WEBROOT_DIR + '/assets';


// twig templates

gulp.task('twig', function () {

    return gulp.src(['source/pages/*.twig'])
        .pipe(data(function (file) {
            var data = {}

            data.chapters = JSON.parse(fs.readFileSync(SOURCE_DIR + '/data/testdata.json'))
            data.env = "development"

            return data;
        }))
        .pipe(twig({
            extend: twigMarkdown
        }))
        .pipe(gulp.dest(WEBROOT_DIR + '/'))
        .pipe(livereload())
});




// Styles

gulp.task('styles', function () {

    return gulp.src(SOURCE_DIR + '/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .on('error', sass.logError)
        .pipe(pleeease({
            "browsers": ["last 3 versions", "ie 10"],
            "mqpacker": true
        }))
        .pipe(gulp.dest(WEBROOT_DIR_ASSETS + '/css'))
        .pipe(livereload())
});



// Scripts

gulp.task('scripts', function () {

    return gulp.src([SOURCE_DIR + '/js/*.js', '!' + SOURCE_DIR + '/js/_*.js'])
        .pipe(include())
        .pipe(gulp.dest(WEBROOT_DIR_ASSETS + '/js/'))
        .pipe(livereload())

});




// Watchers

gulp.task('watch', function () {

    // listen on port 8889
    // make sure this port is used in the browser middleware
    // <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':8889/livereload.js?snipver=1"></' + 'script>')</script>

    livereload.listen(8889);

    // Watch .json files
    gulp.watch([SOURCE_DIR + '/data/*.json'], ['twig']);

    // Watch .twig files
    gulp.watch([SOURCE_DIR + '/**/*.twig'], ['twig']);

    // Watch .scss files
    gulp.watch([SOURCE_DIR + '/**/*.scss'], ['styles']);

    // Watch .js files
    gulp.watch(SOURCE_DIR + '/**/*.js', ['scripts']);

});




gulp.task('default', ['twig', 'styles', 'scripts', 'watch']);
