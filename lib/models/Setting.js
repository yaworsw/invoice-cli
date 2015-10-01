var Setting = model('settings', function(data) {
  switch (data.schema) {
    case undefined: return data;
  }
});

module.exports = Setting;
