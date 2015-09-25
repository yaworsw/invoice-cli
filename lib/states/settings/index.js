module.exports = function() {

  var settingOptions = settings.map(function(setting) {
    return {
      name:  setting.data.name + ' (' + setting.data.value + ')',
      value: setting
    }
  });

  settingOptions.push({
    name: 'Back',
    value: state('initial')
  });

  inquirer.prompt([
    { name:    'setting',
      type:    'list',
      message: 'Select a setting to edit:',
      choices:  settingOptions
    }
  ], function(answers) {
    var setting = answers.setting;
    var spec    = setting.data.spec;
    spec.name   = 'setting',

    inquirer.prompt([spec], function(answers) {
      var newVal = answers.setting;
      setting.data.value = newVal;
      setting.save();
      state('setting/index')();
    });
  });

};
