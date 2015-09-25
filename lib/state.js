module.exports = function(state /*, params... */) {
  var params = Array.prototype.slice.call(arguments, 1);
  return function() {
    require('./states/' + state).apply(undefined, params);
  };
};
