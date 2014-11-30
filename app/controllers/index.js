import Ember from 'ember';

export default Ember.Controller.extend({
  generatePad: function(length) {
    var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";

    var data = new Uint32Array(length);
    window.crypto.getRandomValues(data);
    data = $.makeArray(data);

    data = data.map(function(item, index, enumerable) {
      var index = item % values.length;
      return values[index];
    });

    return data;
  },

  actions: {
    'generate': function() {
      this.set('pad', this.generatePad(140));
    }
  }
});