var Invoice = model('invoices', function(data) {
  switch (data.schema) {
    case undefined: return data;
  }
});

module.exports = Invoice;
