import Ember from 'ember';

export default Ember.View.extend(Ember.Evented, {
  didInsertElement: function() {
    this.trianglify();
  },

  trianglify: function() {
    var t = new Trianglify({
      cellsize: 100
    });

    var $top = this.$('#top');

    if ($top) {
      $top = $top.first();
      var pattern = t.generate($top.width(), $top.height());
      $top.css('background-image', pattern.dataUrl);
    }
  },

  regenerate: function() {
    this.trianglify();
  }.observes('controller.regenerating').on('didInsertElement')
});