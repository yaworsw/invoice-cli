var Invoice = model('invoices', function(data) {
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
