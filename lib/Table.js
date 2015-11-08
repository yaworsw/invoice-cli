// helper to add spaces to a string
var s = function(str, spacesToAdd, right) {
  while (spacesToAdd-- > 0) {
    if (right) {
      str = ' ' + str;
    } else {
      str += ' ';
    }
  }
  return str;
};

var Table = function(columnConfigs) {
  var self = this;

  self.headings = columnConfigs.map(function(col) {
    return col.heading;
  });

  self.columnTypes = columnConfigs.map(function(col) {
    return col.type || 'text';
  });

  self.rows = [];

  self.longestColumns = this.headings.map(function(heading) {
    return heading.length;
  });
};

Table.prototype.addRow = function(/* column... */) {
  var columns = Array.prototype.slice.call(arguments).map(function(column) {
    return '' + column;
  });

  this.rows.push(columns);

  for (var i in columns) {
    var col = columns[i];
    this.longestColumns[i] = Math.max(this.longestColumns[i], col.length);
  }
};

Table.prototype.toString = function() {

  var colSep     = '    ';
  var rowSepChar = '-';

  var out = '';

  var headingRow = [];
  for (var i in this.headings) {
    var col     = '';
    var heading = this.headings[i];
    col += heading;
    col  = s(col, this.longestColumns[i] - heading.length, this.columnTypes[i] !== 'text');
    headingRow.push(col);
  }
  out += headingRow.join(colSep) + '\n';

  var rowSepperator = new Array(out.length).join(rowSepChar) + '\n';
  out += rowSepperator;

  for (var r in this.rows) {
    var rout = [];
    var row  = this.rows[r];
    for (var c in row) {
      var cout = '';
      var col  = row[c];
      cout += col;
      cout  = s(cout, this.longestColumns[c] - col.length, this.columnTypes[c] !== 'text');
      rout.push(cout);
    }
    out += rout.join(colSep) + '\n';
    out += rowSepperator;
  }

  return out;
};

module.exports = Table;
