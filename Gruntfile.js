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
            scripts: {
                files: 'js/**/*.js',
                options: {
                    livereload: true
                }
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
                        { name: 'main' },
                        { name: 'views/app' },
                        { name: 'views/planner/page' },
                        { name: 'views/settings' }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('server', ['connect', 'watch']);
};
