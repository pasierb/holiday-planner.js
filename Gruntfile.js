module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            //scripts: {
            //    files: 'js/**/*.js',
            //},
            css: {
                files: 'css/**/*.css',
                tasks: ['cssmin']
            }
        },
        jsbeautifier: {
            files: [
                'js/collections/**/*.js',
                'js/models/**/*.js',
                'js/views/**/*.js',
                'js/*.js',
            ]
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/main.js',
                    dir: 'build-js',
                    modules: [
                        {
                            name: 'main',
                            include: [
                                'views/app',
                                'views/planner/page',
                                'views/settings'
                            ]
                        }                    ]
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'css/main.min.css': [
                        'css/bootstrap.min.css',
                        'css/style.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('server', ['connect', 'watch']);
};
