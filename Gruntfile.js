module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        phpunit: {
            classes: {
                dir: 'api/app'
            },
            options: {
                bootstrap: 'api/bootstrap/autoload.php',
                colors: true
            }
        },
        jshint: {
            all: ['store/js/Application.js', 'store/js/controllers/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: {
                    'store/css/default.css': 'store/sass/default.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('test', ['phpunit', 'jshint']);
    grunt.registerTask('default', ['phpunit', 'jshint', 'sass']);

};