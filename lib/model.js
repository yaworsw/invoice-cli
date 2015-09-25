var modelStatcMethods = {

  all: function() {
    return this.collection.find().map(this.instanciate);
  },

  find: function() {
    return this.collection.find.apply(this.collection, arguments).map(this.instanciate);
  },

  findOne: function() {
    return this.instanciate(this.collection.findOne.apply(this.collection, arguments));
  }

};

var modelMethods = {

  save: function() {
    db[this.collectionName].save(this.data);
  }

};

module.exports = function(collectionName, constructor) {
  db.connect(ROOT, [collectionName]);

  var Model = function(data) {
    for (var name in properties) {
      this[name] = properties[name];
    }
    this.data = constructor.call(this, data);
  };

  Model.prototype = modelMethods;

  var properties = {
    collectionName: collectionName,
    constructor:    Model,
    collection:     db[collectionName],
    instanciate: function(data) {
      return new Model(data);
    }
  };

  for (var i in modelStatcMethods) {
    Model[i] = modelStatcMethods[i].bind(properties);
  }

  return Model;
};
