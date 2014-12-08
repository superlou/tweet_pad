import Ember from 'ember';

export default Ember.Controller.extend({
  generatePad: function(length) {
    var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789#?.";

    var data = new Uint32Array(length);
    window.crypto.getRandomValues(data);
    data = $.makeArray(data);

    data = data.map(function(item, index, enumerable) {
      return item % values.length;
    });

    return data;
  },

  createPad: function(force) {
    if (!this.get('pad') || force) {
      this.set('pad', this.generatePad(140));
    }
  }
});