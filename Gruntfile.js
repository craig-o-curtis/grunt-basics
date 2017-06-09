module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            // output: ['dist/*']
            options: {

            },
            files: ['./dist/*'],
            // './dist/*' keeps dist folder, 
            // './dist/**' removes dist folder
            folders: ['./dist/es6', './dist/ts'] // redundant way to delete folders
        },

        // for vendor, no need to minify
        copy: {
            main: {
                files: [
                // includes files within path  /vendor/*
                    {
                        expand: true,
                        cwd: './src',
                        src: ['./vendor/**'],
                        dest: './dist',
                        // filter: 'isFile'
                    },
                // includes files within path and its sub-directories 
                // {expand: true, src: ['path/**'], dest: 'dest/'},
            
                // makes all src relative to cwd 
                // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
            
                // flattens results to a single level 
                // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
                ],
            },
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/es6/index.js': 'src/es6/index.js'
                }
            }
        },

        typescript: {
            base: {
                src: ['./src/ts-project/**/*.ts'],
                dest: './dist/ts/',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    rootDir: './src/ts-project',
                    sourceMap: true,
                    declaration: true
                }
            }
        },

        // concat: {
        //     options: {
        //         separator: ';',
        //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        // '<%= grunt.template.today("yyyy-mm-dd") %> */',
        //     },
        //     dist: {
        //         src: ['./dist/es6/**/*.js', './dist/ts/**/*.js'],
        //         dest: './dist/bundle.js'
        //     }
        // },
        
        uglify: {
            development: {
                files: [{
                    expand: true,
                    cwd: './dist/',
                    src: ['**/*.js', '!'],
                    dest: './dist/'
                }]
            },
            options: {
                mangle: true, // false to toggle to keep original var names
                compress: {
                    drop_console: false // would remove console's in code, but we should remove them manually
                },
                beautify: false // set to true to reverse uglify
            }
        },

        jshint: {
            // beforeconcat: ['./dist/es6/**/*.js', './dist/ts/**/*.js'],
            // afterconcat:['./dist/es6/**/*.js', './dist/ts/**/*.js'],
            options: {
                force: false,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                "-W069": false,
                "-W004": false,
                globals: {  
                    jQuery: true
                },
                esversion: 6,
                ignores: ['./IgnoredJsHint/**/*.js'],
                reporterOutput: './.jshint-log.txt'
            },
            files: ['./src/**/*.js'],
            uses_defaults: ['./src/**/*.js'],
            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                    force: false
                },
                files: {
                    src: ['./ToBeCleaned/**/*.js']
                }
            },
            ignore_warning: {
                options: {
                    "-W015": true
                },
                src: ['./src/**/*.js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    './dist/index.html': './.src/**/index.html',
                }
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['./src/**.*.html', '*.html'],
                    dest: './dist'
                    // './dist/index.html': './src/index.html'
                }]
            }
        },

        htmlhint: {

        },

        less: {
            development: {
                options: {
                    paths: ['./src/less']
                },
                files: {
                    './dist/styles/bundle.css': './src/less/**/*.less'
                }
            },
            production: {
                options: {
                    paths: ['./src/less'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))({})
                    ],
                    modifyVars: {

                    },
                    files: {
                        './dist/styles/bundle.css': './src/less/*.less'
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy'); 
    grunt.loadNpmTasks('grunt-babel'); 
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    // must be name of specified plugin property 
    
    // grunt.registerTask('typescript');
    grunt.registerTask('es', ['babel']);
    grunt.registerTask('ts', ['typescript']);
    grunt.registerTask('ccat', ['concat']);
    grunt.registerTask('ugg', ['uglify']);
    grunt.registerTask('tempmin', ['htmlmin']);
    // make sure uglify has files into uglify, via typescript and babel
    grunt.registerTask('minify', ['clean', 'typescript', 'babel', 'uglify']);
    
    grunt.registerTask('default', ['clean', 'typescript', 'babel', 'jshint', 'uglify']); // called with grunt || grunt clean



};