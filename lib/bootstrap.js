var defaultSettings = [
  { name: 'name',
    message: 'What is your name?',
    display: true
  },
  { name: 'email',
    message: 'What is your email address?',
    display: true
  }
];

defaultSettings.forEach(function(defaultSetting) {
  var setting = Setting.find({ name: defaultSetting.name });
  if (setting.length === 0) {
    var createdSetting = new Setting(defaultSetting);
    createdSetting.save();
  }
})
