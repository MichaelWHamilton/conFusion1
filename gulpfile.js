'use strict';

var gulp = require('gulp'),
sass=require('gulp-sass'),
browserSync = require('browser-sync');

gulp.task('sass', function(){
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpeg,gif}',
        './js/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

//default task
gulp.task('default', gulp.series('browser-sync', 'sass:watch'));