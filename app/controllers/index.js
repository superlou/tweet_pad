import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'pad',
  pad: Ember.computed.alias('controllers.pad.pad'),

  actions: {
    pdf: function() {
      var doc = new jsPDF("portrait", "mm", "letter");  // units in pts
      var origins = [
        {x: 18.8, y:  12.0}, {x: 107.8, y:  12.0},
        {x: 18.8, y:  62.8}, {x: 107.8, y:  62.8},
        {x: 18.8, y: 113.5}, {x: 107.8, y: 113.5},
        {x: 18.8, y: 164.1}, {x: 107.8, y: 164.1},
        {x: 18.8, y: 214.9}, {x: 107.8, y: 214.9},
      ]

      var _this = this;
      origins.forEach(function(origin) {
        _this.drawCard(doc, origin.x, origin.y, _this.get('pad'), false);
      });

      doc.save('Test.pdf');
    }
  },

  drawCard: function(doc, origin_x, origin_y, pad, isOutlined) {
    var card_width = 88.9;  // 3.5 inches
    var card_height = 50.8; // 2 inches

    if (isOutlined) {
      doc.rect(origin_x, origin_y, card_width, card_height);
    }

    // Draw sequence
    var dx = 6;
    var dy = 4;
    var row = 0;
    var col = 0;
    var text_offset_x = 2;
    var text_offset_y = 4.5;

    doc.setFont('courier');
    doc.setFontSize(9);

    var fontSize = doc.internal.getFontSize();
    var scaleFactor = doc.internal.scaleFactor;

    pad.forEach(function(item) {
      var x = origin_x + dx*col + text_offset_x;
      var y = origin_y + dy*row + text_offset_y;

      var text = item.toString();

      // fontSize and scaleFactor necessary to deal with units
      var textWidth = doc.getStringUnitWidth(text) * fontSize / scaleFactor;
      doc.text(item.toString(), x + (dx - textWidth) / 2, y);

      col += 1;

      if (col > 9 && row < 5) {
        row += 1;
        col = 0;
      } else if (col > 13) {
        row += 1;
        col = 0;
      }
    });

    // Draw key, note space is for extra column after ever 5 characters
    var key = "ABCDE FGHIJKLMNO PQRSTUVWXY Z_01234567 89#@.";

    var dx = 2;
    var dy = 4;
    var row = 0;
    var col = 0;
    var text_offset_x = 65;
    var text_offset_y = 6;

    doc.setFontSize(8);

    key.split("").forEach(function(item) {
      var x = origin_x + dx*col + text_offset_x;
      var y = origin_y + dy*row + text_offset_y;
      doc.text(item, x, y);

      col += 1;

      if (col > 10) {
        row += 1;
        col = 0;
      }
    });

    // Draw border around key


    return doc;
  }
});