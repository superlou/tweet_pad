import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'pad',
  pad: Ember.computed.alias('controllers.pad.pad'),

  copies: [0, 1, 2, 3, 4, 5, 6, 7]
});
