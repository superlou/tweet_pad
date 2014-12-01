import Ember from 'ember';

export default Ember.Controller.extend({
  generatePad: function(length) {
    var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789#@.";

    var data = new Uint32Array(length);
    window.crypto.getRandomValues(data);
    data = $.makeArray(data);

    data = data.map(function(item, index, enumerable) {
      return item % values.length;
    });

    return data;
  },

  actions: {
    'generate': function() {
      this.set('pad', this.generatePad(140));
    }
  }
});