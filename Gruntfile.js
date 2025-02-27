'use strict';

module.exports = function (grunt) {
    //Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //Auto load requirede grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

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
        copy:{
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src:['fonts/*.*'],
                    dest: 'dist'
                }]
            },
            clean: {
                build: {
                    src: ['dist/']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cdw: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        clean:{
            build:['dist']
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html'] 
            },
            options:{
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: { separator: ';'},
            dist:{
                files: {
                    'dist/js/jquery.js': ['node_modules/jquery/dist/jquery.slim.min.js'],
                    'dist/js/popper.js': ['node_modules/popper.js/dist/umd/popper.min.js'],
                    'dist/js/bootstrap.js': ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
                    'dist/js/scripts.js': ['js/scripts.js'] 
                }
            },
            
        },
        uglify: {
            dist: {}
        },
        csmin: {
            dist: {}
        },
        filerev: {
            options:{
                encoding: 'utf8',
                algorithm: 'md5',
                lenght: 20
            },
            relase: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        usemin:{
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options:{
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin:{
            dist:{
                options:{
                    collapseWhitespace: true
                },
                files:{
                    'dist/index.html':'dist/index.html',
                    'destination':'source',
                    'dist/contactus.html':'dist/contactus.html',
                    'dist/aboutus.html':'dist/aboutus.html'
                }
            }
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
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};