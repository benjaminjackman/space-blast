//Born on the 4th of July.


var _ = require('underscore');

module.exports = function (grunt) {

  function log() {
    grunt.log.writeln.apply(
      grunt.log,
      _.toArray(arguments).map(function (x) {
        return _.isObject(x) || _.isArray(x) ? JSON.stringify(x) : x
      })
    );
  }

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //reused locations
  var tsSrc = ['src/site/ts/**/*.ts'];
  var tsOut = 'target/site/js/ts';

  var htmlSrc = 'src/site/html/**/*.html';
  var htmlOut = 'target/site';

  grunt.initConfig({
    bower: {
      install: {

      }
    },

    clean: [
      'target/site'
    ],

    typescript: {
      site: {
        src: tsSrc,
        dest: tsOut,
        options: {
          base_path: 'src/site/ts',
          target: 'es3',
          sourcemap: true
        }
      }
    },

    watch: {
      tsSite: {
        files: tsSrc,
        tasks: ['typescript:site']
      },
      templates: {
        files: [htmlSrc],
        tasks: ['templates']
      }
    }
  });

  grunt.registerTask('templates', 'Fills in Html Templates', function () {
    //Get the name of all the html files.
//    var templs = grunt.file.expandMapping(htmlSrc, htmlOut, {cwd:'src/site/html'})
    var templs = grunt.file.expand({cwd: 'src/site/html'}, '**/*.html')
    var jsTmpl = grunt.file.expand({cwd: "target/site"}, 'js/**/*.js').map(function (f) {
      return '<script src="' + f + '"></script>';
    }).join("\n");

    templs.forEach(function (f) {
      var cfg = {
        js: jsTmpl
      };
      var src = 'src/site/html/' + f;
      var dest = 'target/site/'+ f;
      grunt.file.write(dest, grunt.template.process(grunt.file.read(src), {data: cfg}));
    });


//
//    function processTemplate(templ) {
//      var templCfg = {
//        js : getJsFiles.map(function(src) {src})
//        css : getCssFiles();
//      };
//      grunt.template.process(templ, templCfg)
//    }
  });

  grunt.registerTask('compile', ['clean', 'typescript', 'templates']);
  grunt.registerTask('default', ['typescript']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'watch']);

};

