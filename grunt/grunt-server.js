'use strict';

module.exports = function(grunt) {
  grunt.registerTask('status', 'Shows status of node processes', ['shell:vagrantStatus']);
  grunt.registerTask('stop', 'Stop node processes', ['shell:vagrantStop']);
  grunt.registerTask('start', 'Start node processes', ['shell:vagrantStart']);
  grunt.registerTask('restart', 'Restart node processes', ['stop', 'start']);
  grunt.registerTask('logs', 'Tail logs for all pm2 processes', ['shell:vagrantLogs']);
};
