/**
 * @author xiap
 */


if (!Blockly.Language) Blockly.Language = {};

Blockly.LANG_CATEGORY_REVITMODEL = "RevitModel";


Blockly.Language.revitModel_collect = {
  // Collects the elements by the given filters.
  category: Blockly.LANG_CATEGORY_REVITMODEL,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendTitle("collect elements");
    this.appendInput("of class", Blockly.INPUT_VALUE, 'OfClass', String);
    this.appendInput("of category", Blockly.INPUT_VALUE, 'OfCategory', String);
    this.setOutput(true, Array);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
  }
};

Blockly.Language.revitModel_ofClass = {
  // Collects the elements by the given filters.
  category: Blockly.LANG_CATEGORY_REVITMODEL,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    var dropdown = new Blockly.FieldDropdown(this.TYPES);
    this.appendTitle(dropdown, 'OfClass');
	this.appendTitle("Class");
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
  }
};

Blockly.Language.revitModel_ofCategory = {
  // Collects the elements by the given filters.
  category: Blockly.LANG_CATEGORY_REVITMODEL,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    var dropdown = new Blockly.FieldDropdown(this.CATEGORIES);
    this.appendTitle(dropdown, 'OfCategory');
	this.appendTitle("Category");
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
  }
};

Blockly.Language.revitModel_ofClass.TYPES =
    [["All", 'typeof(Object)'],
     ["Wall", 'typeof(Wall)'],
	 ["Floor", 'typeof(Floor)'],
	 ["FamilyInstance", 'typeof(FamilyInstance)']];

Blockly.Language.revitModel_ofCategory.CATEGORIES =
    [["All", 'BuiltInCategory.INVALID'],
     ["Wall", 'BuiltInCategory.OST_Walls'],
	 ["Floor", 'BuiltIncategory.OST_Floors'],
	 ["Windows", 'BuiltInCategory.OST_Windows'],
	 ["Doors", 'BuiltInCategory.OST_Doors'],
	 ["Columns", 'BuiltInCategory.OST_Columns'],
	 ["StructuralFraming", 'BuiltInCategory.OST_StructuralFraming'],
	 ["Furniture", 'BuiltInCategory.OST_Furniture'],
];
