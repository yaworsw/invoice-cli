var fs      = require('fs-extra');
var path    = require('path');
var pty     = require('pty.js');
var Promise = require('bluebird');
var ansi    = require('ansi-escapes');

module.exports.World = function(cb) {
  var self = this;

  self.ROOT        = path.join(__dirname, '..', '..');
  self.TEST_ROOT   = path.join(self.ROOT, 'test', 'root');

  self.loadFixtureDirectory = function(name) {
    fs.emptyDirSync(self.TEST_ROOT);
    fs.copySync(path.join(self.ROOT, 'test', 'fixtures', 'directories', name), self.TEST_ROOT, { clobber: true });
  };

  var cliOutput = '';
  self.cli = null;
  self.run = function() {
    var args = Array.prototype.slice.call(arguments);

    self.cli = pty.spawn(path.join(self.ROOT, 'bin', 'invoice'), args, {
      cwd: self.TEST_ROOT
    });

    self.cli.on('data', function(data) {
      cliOutput += data;
    });

    return new Promise(function(resolve) {
      setTimeout(resolve, self.ptyWait);
    });
  };

  self.output = function() {
    var temp  = cliOutput;
    cliOutput = '';
    return temp;
  };

  self.send = function(msg) {
    self.cli.write(msg);
    return new Promise(function(resolve) {
      setTimeout(resolve, self.ptyWait);
    });
  }

  self.write = function(msg) {
    return self.send(msg + '\n');
  };

  self.close = function() {
    if (self.cli) {
      self.cli.kill();
      self.cli = null;
    }
  };

  self.select = function(thingToSelect, callback) {
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

  self.generateRandomEmail = function() {
    return 'random@email.com'; // chosen by fair dice roll
                               // guaranteed to be random
  };

  cb(this);
};
