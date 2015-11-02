var fs      = require('fs-extra');
var path    = require('path');
var pty     = require('pty.js');
var Promise = require('bluebird');
var ansi    = require('ansi-escapes');

var PTY_TIMEOUT = 333;

module.exports.World = function(cb) {
  this.ROOT      = path.join(__dirname, '..', '..');
  this.TEST_ROOT = path.join(this.ROOT, 'test', 'root');

  this.loadFixtureDirectory = function(name) {
    fs.emptyDirSync(this.TEST_ROOT);
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

  this.select = function(thingToSelect, callback) {
    var self = this;

    if (callback === undefined) { callback = function() {}; }

    return new Promise(function(resolve, reject) {
      var out = self.output().split('\n');
      out.reverse();

      var indexOfThingIWantToGoTo, indexOfThingThatIsSelected;
      for (var i in out) {
        var cur = out[i];
        if (cur.indexOf(thingToSelect) > 0)  { indexOfThingIWantToGoTo    = i; }
        if (cur.indexOf('\u001b[36m❯') == 0) { indexOfThingThatIsSelected = i; }
      }

      var promise = Promise.resolve();
      for (var i = indexOfThingIWantToGoTo; i < indexOfThingThatIsSelected; i++) {
        promise = promise.then(function() {
          return self.send(ansi.cursorDown());
        })
      }

      promise.then(function() {
        self.send('\r')
          .then(callback)
          .then(function() {
            resolve();
          });
      });
    });
  };

  this.generateRandomEmail = function() {
    return 'random@email.com'; // chosen by fair dice roll
                               // guaranteed to be random
  };

  cb(this);
};
