var Invoice = model('invoices', function(data) {
  if (data.name === undefined) {
    data.name = 'Invoice #' + (Invoice.find({ email: data.client.email }).length + 1);
  }

  switch (data.schema) {
    case undefined: return data;
  }
});

Invoice.prototype.addLineItem = function(name, cost, qty) {
  if (this.data.lineItems === undefined) {
    this.data.lineItems = [];
  }

  this.data.lineItems.push({
    name: name,
    cost: cost,
    qty:  qty
  });
};

module.exports = Invoice;
