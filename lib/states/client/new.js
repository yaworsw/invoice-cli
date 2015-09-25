module.exports = function() {

  inquirer.prompt([
    { name:    'name',
      type:    'input',
      message: 'Enter a name for the client'
    },
    { name:    'email',
      type:    'input',
      message: 'Enter the email address for the client'
    }
  ], function(answers) {
    var client = new Client(answers);
    client.save();
    state('initial')();
  });

};
