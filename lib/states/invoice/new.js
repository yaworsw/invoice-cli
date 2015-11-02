module.exports = function() {

  inquirer.prompt([
    { name:    'client',
      type:    'list',
      message: 'Which client would you like to create an invoice for?',
      choices:  Client.all().map(function(client) {
        return {
          name: client.data.name + ' (' + client.data.email + ')',
          value: client.data
        };
      })
    },
    { name:    'template',
      type:    'list',
      message: 'Select a template to create your invoice faster.',
      choices: [
        { name: 'Biweekly', value: 'biweekly' },
        { name: 'Empty',     value: undefined   }
      ]
    }
  ], function(answers) {
    if (answers.template) {
      try {
        var templatePrompt = require('./templates/' + answers.template);
        templatePrompt(answers);
      } catch (ex) { // must be trying to use user created template

      }
    } else {
      // TODO
      // var invoice = new Invoice(answers);
      // invoice.save();
      // state('invoice/line-item/edit', invoice);
    }
  });

};
