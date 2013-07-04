//Born on the 4th of July.

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

  //reused locations
  var tsMainSrc = 'src/main/ts/**/*.ts';
  var tsMainOut = 'target/ts';

  grunt.initConfig({
    bower: {
      install: {

      }
    },
    typescript: {
      main: {
        src: [tsMainSrc],
        dest: tsMainOut,
        options: {
          target: 'es3',
          sourcemap: true
        }
      }
    },

    watch: {
      tsMain: {
        files: [tsMainSrc],
        tasks: ['typescript:main']
      }
    }
  });

  grunt.registerTask('default', ['typescript']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'watch']);

};

