module.exports = function() {

  inquirer.prompt([
    { name:    'client',
      type:    'list',
      message: 'Which client would you like to create an invoice for?',
      choices:  Client.all().map(function(client) { return { name: client.data.name, value: client.data } })
    }
  ], function(answers) {
    var invoice = new Invoice(answers);
    invoice.save();
    state('invoice/line-item/edit', invoice);
  });

};
