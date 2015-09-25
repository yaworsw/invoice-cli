require('./globals');

if (Setting.find({ name: 'setup-completed' }).length > 0) {
  state('initial')();
} else {
  state('setup')();
}
