const { src, dest, series, parallel, watch,} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const cleanCSS = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const browserSync = require('browser-sync').create();


// Задача для компиляции SCSS
function compileSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());


}

// Задача для копирования JS файлов
function scripts() {
    return src('src/js/!**!/!*.js')
        .pipe(dest('dist/js'));
}


function watchFiles() {
    watch('src/scss/!**!/!*.scss', compileSass);
    watch('src/js/!**!/!*.js', scripts);
    watch('src/!**!/!*').on('change', browserSyncReload);
}

function compileHTML() {
    return src('src/!**!/!*.html')
        .pipe(dest('dist/'));
}

function browserSyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false
    });
    cb()
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

function combCSS() {
    return src('dist/css/!**/!*.css')
        .pipe(csscomb())
        .pipe(dest('dist/css'));
}


exports.default = series(
    parallel(compileSass, compileHTML, scripts, browserSyncServer),
    watchFiles
);

exports.comb = combCSS

