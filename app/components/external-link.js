import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    href: "#",
    attributeBindings: ['href', 'target'],
    target: '_blank',
    click: function(event) {
        event.stopPropagation();
    }
});