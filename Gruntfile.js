module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON(),

        clean: {
            output: ['ToBeCleaned/*'] // clean everything in this folder
        }
    });

    // load the task -- similar to specifying a pipe in Gulpk
        // specify name of npm grunt plugin
    grunt.loadNpmTasks('grunt-contrib-clean');

    // create entry point
        // arg1 - chosen name of task
        // arg2 - array of dependency tasks to run - specified above in initConfig
    grunt.registerTask('default', ['clean']);
}