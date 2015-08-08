'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      options: {
        config: '.jscsrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/public/bower_components/**'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/public/bower_components/**'
      ]
    },
    githooks: {
      all: {
        options: {
          endMarker: ''
        },
        'pre-commit': 'analyze',
        'post-checkout': 'shell:gitLog',
        'post-commit': 'shell:gitLog',
        'post-merge': 'shell:gitLog shell:npmInstall'
      }
    },
    shell: {
      gitLog: {
        command: 'git log -1 > git-info.txt'
      },
      npmInstall: {
        command: 'npm install'
      },
      serverLogs: {
        command: 'pm2 logs'
      },
      serverStatus: {
        command: 'pm2 list'
      },
      serverStop: {
        command: 'pm2 kill'
      },
      serverDelete: {
        command: 'pm2 delete pm2.json'
      },
      serverStart: {
        command: 'pm2 start pm2.json'
      }
    }
  });

  grunt.registerTask('default', ['analyze']);
  grunt.registerTask('analyze', 'Validates code style', ['jshint', 'jscs']);
  grunt.registerTask('status', 'Shows status of node processes', ['shell:serverStatus']);
  grunt.registerTask('stop', 'Stop node processes', ['shell:serverStop']);
  grunt.registerTask('start', 'Start node processes', ['shell:serverStart']);
  grunt.registerTask('restart', 'Restart node processes', ['stop', 'start']);
  grunt.registerTask('logs', 'Tail logs for all pm2 processes', ['shell:serverLogs']);
};
