Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');

Blockly.ExecutionSequence.math_number = function(executionContext) {
	// Numeric value.
	var id = this.id;
	var code = window.parseFloat(this.getTitleText('NUM'));
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};

Blockly.ExecutionSequence.math_arithmetic = function(executionContext) {
	// Basic arithmetic operators, and power.
	var mode = this.getTitleValue('OP');
	var tuple = Blockly.ExecutionSequence.math_arithmetic.OPERATORS[mode];
	var operator = tuple[0];
	var order = tuple[1];

	// two parameters, the first one is A and second one is B.
	var paramA = this.getInputTargetBlock('A');
	if(!paramA)
		paramA = null;
	else
	{
		var paramAId = paramA.id;
		if(executionContext.dataHash[paramAId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramA = executionContext.dataHash[paramAId];
	}

	var paramB = this.getInputTargetBlock('B');
	if(!paramB)
		paramB = null;
	else
	{
		var paramBId = paramB.id;
		if(executionContext.dataHash[paramBId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramB = executionContext.dataHash[paramBId];
	}

	var argumentA = paramA || 0;
	var argumentB = paramB || 0;
	var id = this.id;
	var code = 0;
	switch(operator)
	{
		case ' + ': 
		code = argumentA + argumentB;
		break;
		case ' - ':
		code = argumentA - argumentB;
		break;
		case ' * ':
		code = argumentA * argumentB;
		break;
		case ' / ':
		code = argumentA / argumentB;
		break;
		case null:
		code = Math.pow(argumentA, argumentB);
		break;
		default:
		break;
	}
		
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}	
};

Blockly.ExecutionSequence.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.ExecutionSequence.ORDER_ADDITION],
  MINUS: [' - ', Blockly.ExecutionSequence.ORDER_SUBTRACTION],
  MULTIPLY: [' * ', Blockly.ExecutionSequence.ORDER_MULTIPLICATION],
  DIVIDE: [' / ', Blockly.ExecutionSequence.ORDER_DIVISION],
  POWER: [null, Blockly.ExecutionSequence.ORDER_COMMA]
};
