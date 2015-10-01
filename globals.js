GLOBAL.path     = require('path');
GLOBAL.fs       = require('fs');

GLOBAL.ROOT     = path.join(process.cwd(), 'data');
GLOBAL.noop     = function() {};

GLOBAL._        = require('lodash');
GLOBAL.chalk    = require('chalk');

GLOBAL.inquirer = require('inquirer');
GLOBAL.db       = require('diskdb');

GLOBAL.utils    = require('./lib/utils');
GLOBAL.model    = require('./lib/model');
GLOBAL.state    = require('./lib/state');

try {
  // disable stdout for a time because diskdb prints stuff to stdout whether we
  // want it to or not
  var oldWrite         = process.stdout.write;
  process.stdout.write = noop;

  var modelCollections = [];
  var models = fs.readdirSync(path.join(__dirname, 'lib', 'models'));
  for (var i in models) {
    var moduleName = models[i].replace(/\.js$/, '');
    GLOBAL[moduleName] = require('./lib/models/' + moduleName);
    modelCollections.push(GLOBAL[moduleName].collectionName);
  }

  process.stdout.write = oldWrite;
} catch (ex) {

}

require('./lib/bootstrap');
