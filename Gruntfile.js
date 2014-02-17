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
            all: 'store/js/**/*.js',
            options: {
                jshintrc: '.jshintrc'
            }
        },
		replace: {
			config: {
				options: {
					patterns: [
						{
							json: grunt.file.readJSON('./config.json')
						}
					]
				},
				files: [
					{
						src: ['store/js/services/Config.template'],
						dest: 'store/js/services/Config.js'
					}
				]
			}
		},
        uglify: {
            build: {
                src: 'store/js/**/*.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        jasmine: {
            pivotal: {
                src: ['store/js/Application.js', 'store/js/services/*', 'store/js/controllers/*'],
                options: {
                    specs: 'store/tests/spec.js',
                    helpers: ['store/js/vendor/*.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.name %>.css': ['store/css/**/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('config', ['replace']);
    grunt.registerTask('js-test', ['jshint']);
//    grunt.registerTask('php-test', ['phpunit']);
    grunt.registerTask('build', ['cssmin', 'replace', 'uglify']);
    grunt.registerTask('default', ['replace', 'jshint', 'cssmin', 'uglify']);

};
