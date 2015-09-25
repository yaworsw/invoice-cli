var fs      = require('fs-extra');
var path    = require('path');
var pty     = require('pty.js');
var Promise = require('bluebird');

var PTY_TIMEOUT = 300;

module.exports.World = function(cb) {
  this.ROOT      = path.join(__dirname, '..', '..');
  this.TEST_ROOT = path.join(this.ROOT, 'test', 'root');

  this.loadFixtureDirectory = function(name) {
    fs.copySync(path.join(this.ROOT, 'test', 'fixtures', 'directories', name), this.TEST_ROOT, { clobber: true });
  };

  var cliOutput = '';
  this.cli = null;
  this.run = function() {
    var args = Array.prototype.slice.call(arguments);

    this.cli = pty.spawn(path.join(this.ROOT, 'bin', 'invoice'), args, {
      cwd: this.TEST_ROOT
    });

    this.cli.on('data', function(data) {
      cliOutput += data;
    });

    return new Promise(function(resolve) {
      setTimeout(resolve, PTY_TIMEOUT);
    });
  };

  this.output = function() {
    var temp  = cliOutput;
    cliOutput = '';
    return temp;
  };

  this.send = function(msg) {
    this.cli.write(msg);
    return new Promise(function(resolve) {
      setTimeout(resolve, PTY_TIMEOUT);
    });
  }

  this.write = function(msg) {
    return this.send(msg + '\n');
  };

  this.close = function() {
    if (this.cli) {
      this.cli.kill();
      this.cli = null;
    }
  };

  cb(this);
};
