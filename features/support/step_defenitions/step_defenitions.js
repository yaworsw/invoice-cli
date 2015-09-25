module.exports = function() {
  this.World = require('../world').World;

  this.When(/^I open the launch the CLI for the first time$/, function() {
    this.loadFixtureDirectory('first-run');
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

  this.When(/^I enter my name$/, function () {
    return this.write('William Yaworsky');
  });

  this.When(/^I enter my email$/, function () {
      return this.write('wouldent.you.like@to_know.com');
  });

this.Then(/^I should be at the main menu$/, function (callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});

};
