import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import webpack from 'gulp-webpack';
import babel from 'gulp-babel-minify';
import cleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';

const cssCompiler = gulpSass(sass);
const SRC_FOLDER = './src';
const BUILD_FOLDER = './build';
const HTML_FILE = 'index.html';
const ALL_SCSS_FILES_PATH = SRC_FOLDER + '/scss/**/*.scss';
const ALL_JS_FILES_PATH = SRC_FOLDER + '/js/**/*.js';
const All_IMG_PATH = SRC_FOLDER + '/images/**/*.*';

async function convertHTML() {
    gulp.src(HTML_FILE)
    .pipe(htmlmin({ collapseWhitespace : true }))
    .pipe(gulp.dest(BUILD_FOLDER))
}
async function convertSassToCss() {
    gulp.src(ALL_SCSS_FILES_PATH)
    .pipe(cssCompiler())
    .pipe(cleanCss())
    .pipe(gulp.dest(BUILD_FOLDER + '/css'))
}
async function convertJS() {
    gulp.src(ALL_JS_FILES_PATH)
    .pipe(webpack())
    .pipe(babel())
    .pipe(rename('script.js'))
    .pipe(gulp.dest(BUILD_FOLDER + '/js'));
}
async function convertIMG() {
    gulp.src(All_IMG_PATH)
    .pipe(imagemin())
    .pipe(gulp.dest(BUILD_FOLDER + '/img'))
}

gulp.task('watch-html', function() {
    gulp.watch(HTML_FILE, convertHTML)
})
gulp.task('watch-scss', function() {
    gulp.watch(ALL_SCSS_FILES_PATH, convertSassToCss)
})
gulp.task('watch-js', function() {
    gulp.watch(ALL_JS_FILES_PATH, convertJS)
})
gulp.task('wath-img', function() {
    gulp.watch(All_IMG_PATH, convertIMG)
})

gulp.task('default', gulp.parallel(convertHTML, convertSassToCss, convertJS, convertIMG, 
    'watch-html', 'watch-scss', 'watch-js', 'wath-img'));
gulp.task('build', gulp.parallel(convertHTML, convertSassToCss, convertJS, convertIMG));