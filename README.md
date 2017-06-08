// Demo Project from Pluralsight's Introduction to Grunt  Course
NOTE - due to the demo projects not being on Github, this is more of a piec ework demo of grunt rather than a fully-functional app with grunt as the automation / build process.


// Starting a Grunt project from Scratch
```
$ npm init // npm >=5.0.0 creaktes package-lock.json
$ npm install --save-dev grunt // creates node_modules dir, package.json
```


// Grunt Plugins
* Most official plugins have the grunt-contrib- prefix
    * grunt-contrib-clean
    * grunt-contrib-concat
    * grunt-contrib-jshint
    * grunt-contrib-uglify
    * grunt-contrib-htmlmin
    * grunt-contrib-less

* Other project plugins
    * grunt-babel
    * babel-presets-es2015
    * grunt-typescript
    * grunt htmlhint

```
$ npm install --save-dev grunt-contrib-clean grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify grunt-contrib-htmlmin grunt-babel babel-presets-2015 grunt-typescript grunt-htmlhintd
```

// Connect to the Grunt Plugins in the node_modules folder
```
grunt.loadNpmTasks('grunt-typescript');
```

// Optionallty register a task alias
```
grunt.registerTask('ts', ['typescript']);
```



// Verbose mode 
* Add a -v flag to run grunt in verbose mode
$ grunt default\ -v
$ grunt clean -v

# Grunt Demos

## Test Grunt's JS Hint Linter
Before - see ./src/** && ./IgnoredJsHint/**
After - see ./src/** && ./IgnoredJsHint/** && ./.jshint-log.txt
```
$ grunt jshint
```


## Test Grunt's Babel Transpiler
Before - see src/es6/
After - see dist/es6/
```
$ grunt es || grunt babel
```


## Test Grunt's TypeScript Transpiler
Before - see ./src/ts/
After - see ./dist/ts/
```
$ grunt ts || grunt typescript
```


## Test Grunt's File / Directory Cleaner
Before - see ./dist/**
After - see ./dist/**
```
$ grunt clean
```
/*** NOTE ***/
    // './dist/*' keeps dist folder, 
    // './dist/**' removes dist folder
    
    // redundant way to delete folders
        folders: ['./dist/es6', './dist/ts'] 


## Test Grunt's File Concatenator
Before - see ./dist/**
After - see ./dist/**
```   
$ grunt concat
```


## Test Grunt's File Minifier
Before - see ./dist/**
After - see ./dist/**
```
$ grunt minify // custom method to prepopulate dist folder
```
/** optionally turn mangle to true to use minified variable/fn names


// Demo uses TS Transpiling
$ npm install --save-dev grunt-typescript

// FINDINGS
1. Cannot register task with alias and non-alias
```
// not ok
    // grunt.registerTask('clean'); // uncommenting will break
    grunt.registerTask('default', ['clean']); // called with grunt OR grunt clean
```

2. Infinite Loops
```
// cannot 'fix' above problem by using name and name of package reference
    grunt.registerTask('clean');
    // grunt.registerTask('clean', ['clean']); // infinite loop
```


// Validating with JSHint 

