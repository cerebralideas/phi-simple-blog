/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		lint: {
			files: ['grunt.js','src/ui-ix/core/*.js', 'src/ui-ix/extensions/**/*.js', 'src/app/**/*.js', 'test/**/*.js']
		},
		qunit: {
			files: []
		},
		concat: {
			dev: {
				src: ['vendor/jquery/full/jquery.js', 'src/ui-ix/extensions/modals/jquery.foundation.reveal.js', 'src/ui-ix/core/core.js', 'src/ui-ix/project/project.js'],
				dest: 'dist/ui-ix.js'
			}
		},
		watch: {
			files: ['<config:lint.files>', 'src/ui-ix/*.scss', 'src/ui-ix/core/**/*.scss', 'src/ui-ix/extensions/**/*.scss', 'src/ui-ix/project/*.scss'],
			tasks: 'default'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true,
				angular: true
			}
		},
		smushit: {
			prod: {
				src: 'img/raw',
				dest: 'img/dist'
			}
		},
		min: {
			dist1: {
				src: ['vendor/jquery/full/jquery.js', 'src/ui-ix/extensions/modals/jquery.foundation.reveal.js', 'src/ui-ix/core/core.js', 'src/ui-ix/project/project.js'],
				dest: 'dist/ui-ix.min.js'
			}
		},
		replace: {
			srcToDist: {
				src: 'index.html',
				overwrite: true,
				replacements: [{
					from: '/src',
					to: '/dist'
				}]
			}
		},
		compass: {
			dev: {
				src: 'src/ui-ix/',
				dest: 'src/ui-ix/compiled',
				linecomments: true,
				forcecompile: true,
				require: []
			},
			prod: {
				src: 'src/ui-ix/',
				dest: 'dist/',
				outputstyle: 'compressed',
				linecomments: false,
				forcecompile: true,
				require: []
			}
		}
	});

	// Replaces strings for potential builds
	// grunt.loadNpmTasks('grunt-text-replace');

	// Run Grunt Reload
	grunt.loadNpmTasks('grunt-reload');

	// Run Sass conversion
	grunt.loadNpmTasks('grunt-compass');

	// Compresses Images
	grunt.loadNpmTasks('grunt-smushit');

	// Default (Development) task.
	grunt.registerTask('default', 'compass:dev');

	// Production task.
	grunt.registerTask('prod', 'compass:prod min');

	// Full build with image optimization task.
	grunt.registerTask('build', 'compass:prod min smushit');
};
