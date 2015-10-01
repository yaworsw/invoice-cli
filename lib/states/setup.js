module.exports = function() {

  console.log();
  console.log('Looks like it\'s your first time running Invoice CLI');
  console.log();
  console.log('We\'re going to get started by asking you a few questions.')
  console.log();

  inquirer.prompt([
    { name: 'name',
      message: 'What is your name?',
    },
    { name: 'email',
      message: 'What is your email address?'
    }
  ], function(answers) {
    var setupComplete = new Setting({ name: 'setup-completed', display: false });
    setupComplete.save();

    var name = Setting.findOne({ name: 'name' });
    name.data.value = answers.name;
    name.update();

    var email = Setting.findOne({ name: 'email' });
    email.data.value = answers.email;
    email.update();

    state('initial')();
  });

};
