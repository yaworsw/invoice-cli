module.exports = function() {

  inquirer.prompt([
    { name:    'client',
      type:    'list',
      message: 'Choose a client',
      choices:  Client.all().map(function(client) { return { name: client.data.name, value: client.data } })
    }
  ], function(answers) {
    var client = answers.client;
    inquirer.prompt([
      { name:    'client',
        type:    'list',
        message: 'Choose a client',
        choices:  Client.invoices().map(function(client) { return { name: client.data.name, value: client.data } })
      }
    ], function(answers) {
      var client = answers.client;

    });
  });

};
