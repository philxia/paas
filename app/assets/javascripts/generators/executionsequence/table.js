
Blockly.ExecutionSequence.table_addRow = function(executionContext) {
	if(window.parent && window.parent.table)
		window.parent.table.addRow();
};

Blockly.ExecutionSequence.table_addColumn = function(executionContext) {
	if(window.parent.table)
		window.parent.table.addColumn();
};

Blockly.ExecutionSequence.table_setItem = function(executionContext) {
  // Generate JavaScript for turning left or right.
	var order = 0;

	// two parameters, the first one is A and second one is B.
	var paramA = this.getInputTargetBlock('ROW');
	if(!paramA)
		paramA = null;
	else
	{
		var paramAId = paramA.id;
		if(executionContext.dataHash[paramAId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramA = executionContext.dataHash[paramAId];
	}

	var paramB = this.getInputTargetBlock('COL');
	if(!paramB)
		paramB = null;
	else
	{
		var paramBId = paramB.id;
		if(executionContext.dataHash[paramBId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramB = executionContext.dataHash[paramBId];
	}

	var paramC = this.getInputTargetBlock('VAL');
	if(!paramC)
		paramC = null;
	else
	{
		var paramCId = paramC.id;
		if(executionContext.dataHash[paramCId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramC = executionContext.dataHash[paramCId];
	}

	var rowIndex = paramA || 0;
	var columnIndex = paramB || 1;
	var value;
	if(paramC === null)
		value = '\"Hello world!\"';
	else
		value = paramC;

	if(window.parent.table)
		window.parent.table.setItem( rowIndex, columnIndex, value); 
};
