module.exports = function() {

  var settingOptions = _.map(Setting.find({ display: true }), function(setting) {
    return {
      name:  utils.ucfirst(setting.data.name) + ' (' + setting.data.value + ')',
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
    var setting =  answers.setting;

    if (typeof setting == 'function') { return setting(); }

    inquirer.prompt(setting.data, function(answers) {
      var newVal = answers[setting.data.name];
      setting.data.value = newVal;
      setting.update();
      state('setting/index')();
    });
  });

};
