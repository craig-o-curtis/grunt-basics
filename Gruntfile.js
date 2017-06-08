module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            output: ['dist/*']
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
                    src: '**/*.js',
                    dest: './dist/'
                }]
            },
            options: {
                
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
            // uses_defaults: ['./src/**/*.js'],
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel'); 
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    // must be name of specified plugin property 
    
    // grunt.registerTask('typescript');
    grunt.registerTask('es', ['babel']);
    grunt.registerTask('ts', ['typescript']);
    grunt.registerTask('ccat', ['concat']);
    grunt.registerTask('ugg', ['uglify']);
    
    grunt.registerTask('default', ['clean', 'typescript', 'babel', 'jshint', 'uglify']); // called with grunt || grunt clean



};