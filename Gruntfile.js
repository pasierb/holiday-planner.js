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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('server', ['connect', 'watch']);
};
