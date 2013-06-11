module.exports = function(grunt) {
  // 'use strict'

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          // 'css/prezenter.css': 'sass/prezenter.scss'
          '../css/prezenter.css': 'sass/*.scss'
        }
      },
      options: {
        'compass': true
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production',
          outputStyle: 'expanded'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },


    coffee: {
      compile: {
        files: {
          '../js/prezenter.js': 'coffee/prezenter.coffee'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '../'
          // keepalive:true
        }
      }
    },


    watch: {
      coffee: {
        files: ['coffee/prezenter.coffee'],
        tasks: 'coffee'
      },
      compass: {
        files: ['sass/*'],
        tasks: 'compass'
      }
      // sass: {
      //   files: ['sass/prezenter.scss'],
      //   tasks: 'sass'
      // }
    },

    open: {
      dev: {
        path: 'http://localhost:8000'
      }
    },

    uglify: {
      solo: {
        files: {
          '../js/prezenter.min.js': ['../js/prezenter.js']
        }
      },
      full: {
        files: {
          '../js/prezenter-full.min.js': ['../js/jquery.tranzit.js', '../js/prezenter.js']
        }
      }
    }
  });

  // Load necessary plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['connect', 'open:dev', 'watch']);

};