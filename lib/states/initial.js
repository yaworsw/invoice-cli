module.exports = function() {

  var name = Setting.findOne({ name: 'name' }).data.value;

  inquirer.prompt({
    name: 'initial',
    type: 'list',
    message: name + ' what would you like to do?',
    choices: [
      { name: 'Add Client',
        value: state('client/new')
      },
      { name: 'Add Invoice',
        value: state('invoice/new')
      },
      { name: 'View Invoices',
        value: state('invoice/index')
      },
      { name: 'Settings',
        value: state('settings/index')
      },
      { name: 'Exit',
        value: noop
      }
    ]
  }, function(answers) {
    answers.initial();
  });

};
