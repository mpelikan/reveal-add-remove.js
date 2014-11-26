/* global module:false */
module.exports = function ( grunt ) {
	"use strict";

	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),
		meta: {
			banner: "/*!\n" +
				" * reveal-add-remove.js <%= pkg.version %> (<%= grunt.template.today(\"yyyy-mm-dd, HH:MM\") %>)\n" +
				" * https://github.com/mpelikan/reveal-add-remove.js\n" +
				" *\n" +
				" * MIT licensed\n" +
				" *\n" +
				" * Copyright (C) 2014 Michael Pelikan, https://github.com/mpelikan\n" +
				" */"
		},

		qunit: {
			files: [ "test/*.html" ]
		},

		uglify: {
			options: {
				banner: "<%= meta.banner %>\n"
			},
			build: {
				src: "js/reveal-add-remove.js",
				dest: "js/reveal-add-remove.min.js"
			}
		},

		jshint: {
			options: {
				jshintrc: ".jshintrc",
				ignores: [ "test/third-party/**/*.js" ]
			},
			files: [ "Gruntfile.js", "js/reveal-add-remove.js", "test/**/*.js" ]
		},

		watch: {
			main: {
				files: [ "Gruntfile.js", "js/reveal-add-remove.js" ],
				tasks: "default"
			},
			test: {
				files: [ "test/**/*.js", "test/**/*.html", "!test/third-party" ],
				tasks: "test"
			}
		}

	} );

	//	Dependencies
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	//	Default task
	grunt.registerTask( "default", [ "jshint", "uglify", "qunit" ] );

	//	Run tests
	grunt.registerTask( "test", [ "jshint", "qunit" ] );

};