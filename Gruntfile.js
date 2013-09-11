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
                src: ['store/js/Application.js', 'store/js/factories/*.js', 'store/js/controllers/*.js'],
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
        },
        jasmine: {
            pivotal: {
                src: ['store/js/Application.js', 'store/js/factories/*', 'store/js/controllers/*'],
                options: {
                    specs: 'store/tests/spec.js',
                    helpers: ['store/js/vendor/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jasmine', 'phpunit', 'jshint']);
    grunt.registerTask('js-test', ['jasmine', 'jshint']);
    grunt.registerTask('php-test', ['phpunit']);
    grunt.registerTask('build', ['sass', 'uglify']);
    grunt.registerTask('default', ['phpunit', 'jasmine', 'jshint', 'sass', 'uglify']);

};