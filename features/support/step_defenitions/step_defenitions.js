var Promise = require('bluebird');

module.exports = function() {
  this.World = require('../world').World;

  this.When(/^I press enter$/, function() {
    return this.write();
  });

  this.When(/^I open invoice the CLI for the first time$/, function() {
    this.loadFixtureDirectory('first-run');
    return this.run();
  });

  this.When(/^I open the invoice the CLI$/, function (callback) {
    return this.run();
  });

  this.Then(/^I should be welcomed$/, function(callback) {
    var out = this.output();
    if (out.indexOf("Looks like it's your first time running Invoice CLI") > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.Then(/^I should be asked "([^"]*)"$/, function (question, callback) {
    var out = this.output();
    if (out.indexOf(question) > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.When(/^I enter "([^"]*)"$/, function(textToEnter) {
    return this.write(textToEnter);
  });

  this.When(/^I enter my name$/, function () {
    return this.write('John Snow');
  });

  this.When(/^I enter my email$/, function () {
    return this.write('admin@the-wall.org');
  });

  this.Then(/^I should be at the main menu$/, function (callback) {
    var out = this.output();
    if (out.indexOf("what would you like to do?") > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.Then(/^I should see an option to add a new client$/, function (callback) {
    var out = this.output();
    if (out.indexOf("Add Client") > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.When(/^I choose to add a new client$/, function (callback) {
    return this.send('\r');
  });

  this.Then(/^I should be asked( to)? "([^"]*)"$/, function (__, thingToBeAsked, callback) {
    var out = this.output();
    if (out.indexOf(thingToBeAsked) > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.When(/^I enter the client's name$/, function (callback) {
    return this.write('Big Client Corp');
  });

  this.When(/^I enter the client's email$/, function (callback) {
    return this.write('accounting@mega-corp.com');
  });

  this.Given(/^I select "([^"]*)"$/, function (nameOfThingIWantToGoTo) {
    return this.select(nameOfThingIWantToGoTo);
  });

  this.Then(/^I should see "([^"]*)"$/, function (thingToSee, callback) {
    var out = this.output();
    if (out.indexOf(thingToSee) > 0) {
      callback();
    } else {
      callback.fail(out);
    }
  });

  this.Given(/^I have a client named "([^"]*)"(?: with the email "([^"]*)")?$/, function (clientName, clientEmail, callback) {
    var self = this;
    return self.select('Add Client').then(function() {
      return self.write(clientName);
    }).then(function() {
      return self.write(clientEmail || self.generateRandomEmail());
    });
  });

};
