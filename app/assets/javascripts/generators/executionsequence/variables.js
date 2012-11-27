
Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');

Blockly.ExecutionSequence.variables_get = function(executionContext) {
	// Variable getter.
	var varName = Blockly.ExecutionSequence.variableDB_.getName(this.getTitleText('VAR'),
															 Blockly.Variables.NAME_TYPE);
	var id = this.id;
	var code = executionContext.dataHash[varName];
	if(executionContext.dataHash && code !== null)
	{
		executionContext.dataHash[id] = code;
	}
};

Blockly.ExecutionSequence.variables_set = function(executionContext) {
  // Variable setter.
	// two parameters, the first one is A and second one is B.
	var paramA = this.getInputTargetBlock('VALUE');
	if(!paramA)
		paramA = null;
	else
	{
		var paramAId = paramA.id;
		if(executionContext.dataHash[paramAId] === null)
			throw 'execution failed due to the required parameter is not calculated';
		paramA = executionContext.dataHash[paramAId];
	}

	var argument0 = paramA || 0;
	var varName = Blockly.ExecutionSequence.variableDB_.getName(this.getTitleText('VAR'),
														 Blockly.Variables.NAME_TYPE);
	if(executionContext.dataHash)
	{
		executionContext.dataHash[varName] = argument0;
	}
};

