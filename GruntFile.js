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
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express');

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

    express: {
      server: {
        options: {
          port: 3000,
          bases: "target/site"
        }
      }
    },

    clean: {
      site: ['target/site'],
      tsd: ['tsd'],
      bower: ['lib']
    },

    concat: {
      libjs: {
        src: [
          'lib/jquery/jquery.js',
          'lib/angular/angular.js',
          'lib/*/*.js'
        ],
        dest: 'target/site/js/lib/Lib.js'
      },
      libcss: {
        src: ['lib/*/*.css'],
        dest: 'target/site/css/lib/Lib.css'
      }
    },

    copyto: {
      resources: {files: [
        {cwd: 'src/site/resources/', src: '**/*', dest: 'target/site/resources/'}
      ]},
      js: {files: [
        {cwd: 'src/site/js/', src: '**/*.js', dest: 'target/site/js/'}
      ]},
      bootstrapImg: {
        files: [
          {
            cwd: "lib/bootstrap",
            src: "*.png",
            dest: "target/site/css/img/"}
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

    coffee: {
      site: {
        expand: true,
        flatten: true,
        src: 'src/site/coffee/**/*.coffee',
        dest: 'target/site/js/coffee',
        ext: '.js'
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
        tasks: ['typescript']
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
    var jsTmpl = grunt.file.expand({cwd: "target/site"}, ['js/lib/**/*.js', 'js/ts/**/*.js']).map(function (f) {
      return '<script src="' + f + '"></script>';
    }).join("\n");
    var cssTmpl = grunt.file.expand({cwd: "target/site"}, ['css/lib/**/*.css', 'css/less/**/*.css']).map(function (f) {
      return '<link rel="stylesheet" href="' + f + '"/>';
    }).join("\n");

    templs.forEach(function (f) {
      var cfg = {
        js: jsTmpl,
        css: cssTmpl
      };
      var src = 'src/site/html/' + f;
      var dest = 'target/site/' + f;
      grunt.file.write(dest, grunt.template.process(grunt.file.read(src), {data: cfg}));
    });
  });

  grunt.registerTask('alldts', 'Creates a file that has all ts dependens ', function () {
    var alldts = 'src/site/ts/_all.d.ts';
    var content = grunt.file.expand('tsd/**/*.d.ts').map(function (f) {
      var path = "../../../" + f;
      return '/// <reference path="' + path + '" />';
    }).join("\n");
    try {
      grunt.file.delete(alldts);
    } catch (e) {

    }
    grunt.file.write(alldts, content);
  });


  //Clears then Downloads and generates files for tsd requires npm install -g tsd
  grunt.registerTask('tsd-update', ['clean:tsd', 'shell:tsd', 'alldts']);
  //Clears then Downloads bower managed dependencies
  grunt.registerTask('bower-update', ['clean:bower', 'bower:install']);
  //Downloads all depenedencies
  grunt.registerTask('download', ['bower-update', 'tsd-update']);
  //Moves all files into the site folder
  grunt.registerTask('move-to-site', ['copyto:bootstrapImg', 'concat', 'copyto:resources', 'copyto:js']);
  //Compiles needed files to the site folder
  grunt.registerTask('compile', ['clean:site', 'move-to-site', 'coffee', 'typescript', 'templates']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['compile', 'express', 'watch']);

  grunt.registerTask('default', ['compile']);


};

