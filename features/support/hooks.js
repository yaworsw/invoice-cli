var fs = require('fs-extra')

module.exports = function() {
  this.World = require('./world').World;

  var pwd = process.env.PWD;

  /**
   * Kill any lingering cli instances
   */

  this.After(function() {
    this.close();
  });

  /**
   * Initialize the file system where we'll run tests and clean it up after
   */

  this.Around(function(yield) {
    fs.emptyDirSync(this.TEST_ROOT);
    fs.rmdirSync(this.TEST_ROOT);
    fs.mkdirSync(this.TEST_ROOT);
    yield(function() {
      fs.emptyDirSync(this.TEST_ROOT);
      fs.rmdirSync(this.TEST_ROOT);
    });
  });

  this.Before(function() {
    this.loadFixtureDirectory('default');
  });

};
