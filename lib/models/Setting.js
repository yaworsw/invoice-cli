var defaultSettings = [

];

var Setting = model('settings', function(data) {
  switch (data.schema) {
    case undefined: return data;
  }
});

Setting.initializeIfNotAlready = function() {
  var settings = Setting.all();
  if (settings.length < defaultSettings.length) {

  }
};

module.exports = Setting;
