module.exports = function(grunt) {
    var fs = require('fs');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            // options: {},
            // './dist/*' keeps dist folder, 
            // './dist/**' removes dist folder
            files: ['./dist/*'],
            folders: ['./dist/es6', './dist/ts'], // redundant way to delete folders
            
            // sub method 1 - custome command to clean html
            html: {
                options: {'no-write':false},
                src: ['./dist/**/*.html']
            },

            // sub method 2 - custom command to clean styles
            css: {
                options: {'no-write':false},
                src: ['./dist/styles/*']
            },

            js: {
                options: {'no-write':false},
                src: ['./dist/ts/**/*.*', './dist/es6/**/*.*', './dist/**/*.js', './dist/**/*.d.ts']  
            }

        },

        htmlhint: {
            templates: {
                options: {
                    'alt-require': true,
                    'attr-lowercase': true,
                    'attr-no-duplication': true,
                    'attr-unsafe-chars': true,
                    'attr-value-not-empty': true,
                    'doctype-first': false, // for templates
                    'doctype-html5': true,
                    'head-script-disabled': true,
                    'href-abs-or-rel': false,
                    'id-class-ad-disabled': true,
                    'id-class-value': 'dash',
                    'id-unique': true,
                    'inline-script-disabled': true,
                    'inline-style-disabled': true,
                    'space-tab-mixed-disabled': 'space2',
                    'spec-char-escape': false,
                    'src-not-empty': true,
                    'style-disabled': true,
                    'tag-pair': true,
                    'tag-self-close': false, // for meta, link, input, img tags
                    'tagname-lowercase': true,
                    // 'title-require': SVGFETurbulenceElement
                },
                src: ['./src/**/*.html']
            } 
        },

        // needs to read css, so readying dest folder
        csslint: {
            strict: {
                options: {
                    "zero-units": true,
                    "ids": true,
                    "order-alphabetical": true,
                },
                src: ['./dist/styles/**/*.css']
            },
            laxed: {
                options: {
                    "zero-units": false,
                    "ids": false,
                    "order-alphabetical": false,

                },
                src: ['./dist/styles/**/*.css']
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
                ignores: ['./IgnoredJsHint/**/*.js', './src/vendor/**/*.js'],
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

        // for vendor, no need to minify
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './src',
                        src: ['./vendor/**'],
                        dest: './dist',
                        // filter: 'isFile'
                    }
                ],
            },
        },

        less: {
            development: {
                options: {
                    // csslintrc: 'abstracted-css-rules.json'
                    sourceMap: true,
                    cleancss: false,
                    compress: false,
                    paths: ['./src/less']
                },
                files: [{
                    expand: true,
                    flatten: true,
                    
                    cwd: './src/',
                    src: ['**/*.less', '!**/index.less'],
                    dest: './dist/styles',
                    ext: '.css',
                    exDot: 'last'
                }]
            },
            production: {
                options: {
                    // csslintrc: 'abstracted-css-rules.json'
                    sourceMap: false,
                    expand: false,
                    cleancss: true,
                    compress: true,
                    paths: ['./src/less'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))({})
                    ],
                    modifyVars: {
                        // can change LESS vars for prod builds
                    },
                },
                files: {
                    './dist/styles/bundle.css': './src/less/index.less'
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
        
        htmlmin: {
            dev: {
                options: {
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeComments: false, // needed for bower, IE fixes
                    removeEmptyAttributes: true,
                    removeEmptyElements: true,
                    removeRedundantAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['**/*.html'],
                    dest: './dist',
                    // ext: '.min.html',
                    // extDot: 'last'
                }]
            }
        },

        uglify: {
            development: {
                files: [{
                    expand: true,
                    cwd: './dist/',
                    src: ['**/*.js', '!vendor/**/*.js'],
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

        // custome tasks
        checkFileSize: {
            options: {
               folderToScan: './src/less' 
            }
        }

    });

    /** Load NPM Tasks **/
        // follows order of default build task (not watch yet)
    // removing
    grunt.loadNpmTasks('grunt-contrib-clean');
    // linting
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // moving
    grunt.loadNpmTasks('grunt-contrib-copy'); 
    // transpiling and moving
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-babel'); 
    grunt.loadNpmTasks('grunt-contrib-less');
    // lint after output css
    grunt.loadNpmTasks('grunt-contrib-csslint'); 
    // minifying
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // reloading and watching
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    /** Registered Tasks **/
    grunt.registerTask('es', ['babel']);
    grunt.registerTask('ts', ['typescript']);
    grunt.registerTask('ccat', ['concat']);
    grunt.registerTask('ugg', ['uglify']);
    grunt.registerTask('tempmin', ['htmlmin']);
    // make sure uglify has files into uglify, via typescript and babel
    grunt.registerTask('minify', ['clean', 'typescript', 'babel', 'uglify']);
    
    grunt.registerTask('default', [
        // destroy old files
        'clean',
        // linters first
        'htmlhint',
        'jshint',
        // transfer to dist
        'copy',
        'typescript',
        'babel',
        'less',
        'csslint',
        // minify
        'htmlmin',
        'uglify'
    ]); // called with grunt || grunt clean


    // Custom Grunt Tasks
    grunt.registerTask('checkFileSize', 'Task to check file size', checkFileSize);

    function checkFileSize(debug) {
        var options = this.options({
            folderToScan: ''
        });

        if ( this.args.length !== 0 && debug !== undefined) {
            grunt.log.writeflags(options, 'Options');
        }

        grunt.file.recurse(options.folderToScan, function(abspath, rootdir, subdir, filename){
            if (grunt.file.isFile(abspath)) {
                var state = fs.statSync(abspath);
                var asBytes = state.size / 1024;
                grunt.log.writeln('Found file %s with size of %s kb', filename, asBytes);
            }
        });
    }

};