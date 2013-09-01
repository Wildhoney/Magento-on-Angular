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
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['store/js/Application.js', 'store/js/controllers/*.js'],
                dest: 'dist/<%= pkg.buildName %>-<%= pkg.version %>.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: {
                    'dist/<%= pkg.buildName %>-<%= pkg.version %>.css': 'store/sass/default.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['phpunit', 'jshint']);
    grunt.registerTask('default', ['phpunit', 'jshint', 'sass', 'uglify']);

};