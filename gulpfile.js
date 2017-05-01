
var browserSyncWatchFiles = [
    '*.html',
    './css/*.css',
    './js/*.js'
    
    
];
// b
var browserSyncOptions = {
    proxy: "http://googlemap",
    index: "index.html",
    notify: false
};

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'));
});
gulp.task('watch', function () {
   gulp.watch(['js/**/*.js'], ['compress']);
   gulp.watch('sass/**/*.scss', ['sass']);
});
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});
gulp.task('watch-bs', ['browser-sync', 'watch'], function () { });
gulp.task('compress', function (cb) {
	pump([
	  		gulp.src([
	      '!js/jquery.js',
	      'js/*.js'
	]),
       
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('dist')
    ],
    cb
  );
});