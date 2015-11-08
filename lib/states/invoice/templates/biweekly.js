var afterStartSelected = function(config) {
  config.end = config.start.clone().add(2, 'week');

  var week1 = config.start.format('MMM Do');
  var week2 = config.start.clone().add(1, 'week').format('MMM Do');

  inquirer.prompt([
    { name:    'rate',
      type:    'input',
      message: 'What is your hourly rate for this invoice?' },
    { name:    'week1Hours',
      type:    'input',
      message: 'How many hours billable for the week of ' + week1 },
    { name:    'week2Hours',
      type:    'input',
      message: 'How many hours billable for the week of ' + week2 }
  ], function(answers) {

    var invoice = new Invoice(config);
    invoice.addLineItem('Week of ' + week1, answers.rate, answers.week1Hours);
    invoice.addLineItem('Week of ' + week2, answers.rate, answers.week2Hours);

    invoice.save();

    state('initial')();
  });
};

module.exports = function(config) {

  var startOfThisWeek = moment().startOf('week');
  var startOfWeeks = [2, 3, 4, 5].map(function(weeksAgo) {
    var thisTime = startOfThisWeek.clone().subtract(weeksAgo, 'week');
    return {
      name:  thisTime.format('MMM Do'),
      value: thisTime
    }
  });

  startOfWeeks.push({
    name: 'Manual Input',
    value: undefined
  });

  inquirer.prompt([
    { name:    'start',
      type:    'list',
      message: 'Select the week which your invoice STARTS',
      choices: startOfWeeks
    }
  ], function(answers) {

    if (answers.start === undefined) {

    } else {
      config.start = answers.start;
      afterStartSelected(config);
    }

  });

};
