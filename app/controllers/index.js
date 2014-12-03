import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'pad',
  pad: Ember.computed.alias('controllers.pad.pad')
});