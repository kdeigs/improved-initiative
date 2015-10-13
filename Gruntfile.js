module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ts: {
          options: {
            removeComments: false,
          },
          default: {
              src: ['ts/**/*.ts'],
              out: 'js/ImprovedInitiative.js',
              options: {
                  module: 'amd',
                  target: 'es5',
                  declaration: true
              }
          },
          test: {
              src: ['test/**/*.ts'],
              out: 'js/test.js',
              options: {
                  module: 'amd',
                  target: 'es5'
              }
          },
          server : {
              src: ['server/**/*.ts'],
              out: 'server.js',
              options: {
                target: 'es6'
              }
          }
      },
      less: {
        development: {
          options: {
            paths: ["."]
          },
          files: {
            "tracker.css": "tracker.less"
          }
        }
      },
      watch: {
        ts: {
          files: '**/*.ts',
          tasks: ['ts']
        },
        lesscss: {
          files: '**/*.less',
          tasks: ['less']
        }
      }
  });

  grunt.registerTask('default', 'watch');
};