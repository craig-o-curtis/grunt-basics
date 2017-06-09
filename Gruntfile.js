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

        htmlhint: {
            templates: {
                options: {
                    'alt-require': true,
                    'attr-lowercase': true,
                    'attr-no-duplication': true,
                    'attr-unsafe-chars': true,
                    'attr-value-not-empty': true,
                    'doctype-first': true,
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
                    'tag-self-close': true,
                    'tagname-lowercase': true,
                    // 'title-require': SVGFETurbulenceElement
                },
                src: ['./src/**/*.html']
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

    /** Load NPM Tasks **/
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
    grunt.loadNpmTasks('grunt-contrib-csslint');
    
    /** Registered Tasks **/
    grunt.registerTask('es', ['babel']);
    grunt.registerTask('ts', ['typescript']);
    grunt.registerTask('ccat', ['concat']);
    grunt.registerTask('ugg', ['uglify']);
    grunt.registerTask('tempmin', ['htmlmin']);
    // make sure uglify has files into uglify, via typescript and babel
    grunt.registerTask('minify', ['clean', 'typescript', 'babel', 'uglify']);
    
    grunt.registerTask('default', ['clean', 'copy', 'typescript', 'babel', 'jshint', 'uglify']); // called with grunt || grunt clean
    // 1. Remove all files from dist
    // 2. copy over the vendor files
    // 3. compile the typescript
    // 4. compile the es6
    // 5. check dist for js errors, ignoring vendor files



};