var Client = model('clients', function(data) {
  switch (data.schema) {
    case undefined: return data;
  }
});

module.exports = Client;
