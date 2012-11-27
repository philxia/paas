/**
 * @author xiap
 */


if (!Blockly.Language) Blockly.Language = {};

Blockly.LANG_CATEGORY_TABLE = "Table";


Blockly.Language.table_addColumn = {
  // Create an empty list.
  category: Blockly.LANG_CATEGORY_TABLE,
  helpUrl: Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL,
  init: function() {
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendTitle("add column");
    this.setTooltip("Adds a new column.");
  }
};


Blockly.Language.table_addRow = {
	category: Blockly.LANG_CATEGORY_TABLE,
	helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
	init: function() {
		this.setColour(210);
		this.appendTitle("add row");
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
	}
}

Blockly.Language.table_setItem = {
  // Set element at given row and column index.
  category: Blockly.LANG_CATEGORY_TABLE,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendTitle("set item");
    this.appendInput("at row", Blockly.INPUT_VALUE, 'ROW', Number);
    this.appendInput("at column", Blockly.INPUT_VALUE, 'COL', Number);
    this.appendInput("to", Blockly.INPUT_VALUE, 'VAL', null);
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
  }
};

Blockly.JavaScript.table_addRow = function() {
  // Generate JavaScript for turning left or right.
  var code = 'table.addRow();\n'; 
  return code;
};

Blockly.JavaScript.table_addColumn = function() {
  // Generate JavaScript for turning left or right.
  var code = 'table.addColumn();\n'; 
  return code;
};

Blockly.JavaScript.table_setItem = function() {
  // Generate JavaScript for turning left or right.
  var order = 0;
  var rowIndex = Blockly.JavaScript.valueToCode(this, 'ROW', order) || '0';
  var columnIndex = Blockly.JavaScript.valueToCode(this, 'COL', order) || '1';
  var value = Blockly.JavaScript.valueToCode(this, 'VAL', order) || '\"Hello world!\"';
  
  var code = 'table.setItem(' + rowIndex + ', ' + columnIndex + ', ' + value + ');\n'; 
  return code;
};