'use strict';

var gulp = require('gulp'),
sass= require('gulp-sass')(require('sass')),
browserSync = require('browser-sync').create(),
del = require('del'),
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin'),
rev= require('gulp-rev'),
cleanCss = require('gulp-clean-css'),
flatmap = require('gulp-flatmap'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin');

gulp.task('sass', function () { 
return gulp.src('./css/*.scss') 
    .pipe(sass().on('error', sass.logError)) 
    .pipe(gulp.dest('./css')); 
}); 

gulp.task('sass:watch', function () {   
    gulp.watch('./css/*.scss', gulp.series('sass')); 
}); 

gulp.task('browser-sync', function () { 
    var files = [ 
    './*.html', 
    './css/*.css', 
    './img/*.{png,jpg,gif}', 
    './js/*.js' 
    ]; 

    browserSync.init(files, { 
    server: { 
        baseDir: "./" 
    } 
    }); 
});


//CLEAN
gulp.task('clean',function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});
//working checkpoint

//images

gulp.task('imagemin', function(){
    return gulp.src('./img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/img'));
});

//wokring checkpoint

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream.pipe(usemin({
            css: [ rev() ],
            html: [ function(){return htmlmin({collapseWhitespace:true})}],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss:[cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dest/'));
});

gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin'));

// Default task 
gulp.task('default', gulp.series('browser-sync', 'sass:watch'));
