module.exports = function() {

  var clientNameToInvoiceMap = Invoice.all().reduce(function(acc, invoice) {
    var clientName = invoice.data.client.name + ' (' + invoice.data.client.email + ')';
    if (acc[clientName] === undefined) {
      acc[clientName] = [];
    }
    acc[clientName].push(invoice);
    return acc;
  }, {});

  var choices = [];

  for (var name in clientNameToInvoiceMap) {
    var invoices = clientNameToInvoiceMap[name];
    choices.push({
      name:  name + ' (' + invoices.length + ')',
      value: invoices
    });
  }

  inquirer.prompt([
    { name:    'invoices',
      type:    'list',
      message: 'Choose a client',
      choices:  choices }
  ], function(answers) {
    var invoices = answers.invoices;

    var choices = invoices.map(function(invoice) {
      return {
        name:  invoice.data.name + ' (' + moment(invoice.data.start).format('MMM Do') + ')',
        value: invoice
      };
    });

    inquirer.prompt([
      { name:    'invoice',
        type:    'list',
        message: 'Choose an invoice',
        choices:  choices }
    ], function(answers) {

      var invoice = answers.invoice;
      var data    = invoice.data;

      var total   = 0;

      var table = new Table([
        { heading: 'Line Item'                  },
        { heading: 'Cost',     type: 'currency' },
        { heading: 'Quantity', type: 'number'   },
        { heading: 'Total',    type: 'currency' }
      ]);

      for (var i in data.lineItems) {
        var lineItem  = data.lineItems[i];
        var itemTotal = lineItem.qty * lineItem.cost;
        table.addRow(lineItem.name, lineItem.cost, lineItem.qty, itemTotal);
        total += itemTotal;
      }

      table.addRow('', '', '', '');
      table.addRow('Total', '', '', total);

      console.log();
      console.log(data.name);
      console.log();
      console.log(moment(data.start).format('MMM Do'));
      console.log(data.client.name);
      console.log(data.client.email);
      console.log();
      console.log(table.toString());
      console.log();


      state('initial')();
    });
  });

};
