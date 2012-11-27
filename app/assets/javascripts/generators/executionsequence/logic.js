Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');

Blockly.ExecutionSequence.logic_compare = function(executionContext) {
	// Comparison operator.
	var mode = this.getTitleValue('OP');
	var operator = Blockly.ExecutionSequence.logic_compare.OPERATORS[mode];

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

	var argumentA = paramA || false;
	var argumentB = paramB || false;
	var id = this.id;
	var code = false;
	switch(operator)
	{
		case '==': 
		code = (argumentA == argumentB);
		break;
		case '!=':
		code = (argumentA != argumentB);
		break;
		case '<':
		code = (argumentA < argumentB);
		break;
		case '<=':
		code = (argumentA <= argumentB);
		break;
		case '>':
		code = (argumentA > argumentB);
		break;
		case '>=':
		code = (argumentA >= argumentB);
		break;
		default:
		break;
	}
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};

Blockly.ExecutionSequence.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.ExecutionSequence.logic_operation = function(executionContext) {
	// Operations 'and', 'or'.
	var operator = (this.getTitleValue('OP') == 'AND') ? '&&' : '||';

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

	var argument0 = paramA || false;
	var argument1 = paramB || false;
    var code = (this.getTitleValue('OP') == 'AND') ? argument0 && argument1 : argument0 || argument1;
	var id = this.id;
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};

Blockly.ExecutionSequence.logic_negate = function(executionContext) {
	// Negation.
	// one parameters BOOL.
	var paramA = this.getInputTargetBlock('BOOL');
	if(!paramA)
		paramA = null;
	else
	{
		var paramAId = paramA.id;
		if(executionContext.dataHash[paramAId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramA = executionContext.dataHash[paramAId];
	}

	var argument0 = paramA || false;
	var code = !argument0;
	var id = this.id;
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};


Blockly.ExecutionSequence.logic_boolean = function(executionContext) {
	// Boolean values true and false.
	var code = (this.getTitleValue('BOOL') == 'TRUE') ? true : false;
	var id = this.id;
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};
