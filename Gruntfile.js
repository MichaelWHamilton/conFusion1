'use strict';

module.exports = function (grunt) {
    //Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //Auto load requirede grunt tasks
    require('jit-grunt')(grunt);

    const sass = require('sass');
    //Define the configurationf or all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                options:{ implementation: sass},
                files: {
                    'css/styles.css' : 'css.styles/scss'
                }
            },
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
            
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};