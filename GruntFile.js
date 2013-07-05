//Born on the 4th of July.

//    "definitely-typed":"borisyankov/DefinitelyTyped"
//    "definitely-typed": {
//      "" : [
//          "angularjs/angular.d.ts",
//          "d3/d3.d.ts",
//          "jquery/jquery.d.ts",
//          "moment/moment.d.ts",
//          "bootstrap/bootstrap.d.ts",
//          "underscore/underscore.d.ts"
//      ]
//    }


var _ = require('underscore');

module.exports = function (grunt) {

  //External tasks
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-shell');

  //Helper functions
  function log() {
    grunt.log.writeln.apply(
      grunt.log,
      _.toArray(arguments).map(function (x) {
        return _.isObject(x) || _.isArray(x) ? JSON.stringify(x) : x
      })
    );
  }

  //reused locations
  var tsSrc = ['src/site/ts/**/*.ts'];
  var tsOut = 'target/site/js/ts';

  var htmlSrc = 'src/site/html/**/*.html';

  var tsdLibs = [
    'angular',
    'bootstrap',
    'd3',
    'jquery',
    'moment',
    'underscore'
  ];

  grunt.initConfig({
    bower: {
      install: {
      }
    },

    clean: {
      compiled: ['target/site'],
      tsd: ['tsd'],
      lib: ['lib']
    },

    copyto: {
      //Copy lib files from the lib folder to the site folder
      lib: {
        files: [
          {cwd:'lib/', src: '**/*.js', dest: 'target/site/js/lib/'}
        ]
      },
      img: {
        files: [
          {cwd: 'src/site/images/', src: '**/*', dest: 'target/site/images/'}
        ]
      }

    },

    //Compile typescript files
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

    shell: {
      //Use the tsd program to download all listed typescript ts.d files
      tsd: {
        command: tsdLibs.map(function (t) {return "tsd install* " + t}).join("&&"),
        options: {failOnError: true, stdout: true}
      }
    },


    watch: {
      //Build on ts file changes
      tsSite: {
        files: tsSrc,
        tasks: ['typescript:site']
      },
      //Build on changes to html template files
      templates: {
        files: [htmlSrc],
        tasks: ['templates']
      }
    }

  });

  grunt.registerTask('templates', 'Fills in Html Templates', function () {
    //Get the name of all the html files.
//    var templs = grunt.file.expandMapping(htmlSrc, htmlOut, {cwd:'src/site/html'})
    var templs = grunt.file.expand({cwd: 'src/site/html'}, '**/*.html');
    var jsTmpl = grunt.file.expand({cwd: "target/site"}, 'js/**/*.js').map(function (f) {
      return '<script src="' + f + '"></script>';
    }).join("\n");

    templs.forEach(function (f) {
      var cfg = {
        js: jsTmpl
      };
      var src = 'src/site/html/' + f;
      var dest = 'target/site/' + f;
      grunt.file.write(dest, grunt.template.process(grunt.file.read(src), {data: cfg}));
    });
  });

  grunt.registerTask('allts', 'Creates a file that has all ts dependens ', function () {

  });

  //requires npm --instal
  grunt.registerTask('tsd', ['clean:tsd', 'shell:tsd']);
  grunt.registerTask('lib', ['clean:lib', 'bower:install', 'copyto:lib', 'tsd']);
  grunt.registerTask('compile', ['clean:compiled', 'typescript', 'templates']);
  grunt.registerTask('default', ['compile']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'watch']);

};

