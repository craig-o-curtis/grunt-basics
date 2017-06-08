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

* Other project plugins
    * grunt-babel
    * babel-presets-es2015
    * grunt-typescript

```
$ npm install --save-dev grunt-contrib-clean grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify grunt-babel babel-presets-2015 grunt-typescript
```

// Verbose mode 
* Add a -v flag to run grunt in verbose mode
$ grunt default\ -v
$ grunt clean -v

// Using ES6 and Babel
$ npm install --save-dev grunt-babel babel-preset-es2015

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

