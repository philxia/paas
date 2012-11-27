Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');

Blockly.ExecutionSequence.revitModel_collect = function(executionContext) {
	var id = this.id;
	
	if(executionContext.isRemoteCalling === false)
	{
		// two parameters, the first one is ofType and second one is ofCategory.
		var param1 = this.inputList[0];
		if(!param1 || !param1.targetConnection)
			param1 = null;
		else
		{
			var param1Id = param1.targetConnection.sourceBlock_.id;
			if(!executionContext.dataHash[param1Id])
				throw 'execution failed due to the required parameter is not calculated';
			param1 = executionContext.dataHash[param1Id];
		}

		var param2 = this.inputList[1];
		if(!param2 || !param2.targetConnection)
			param2 = null;
		else
		{
			var param2Id = param2.targetConnection.sourceBlock_.id;
			if(!executionContext.dataHash[param2Id])
				throw 'execution failed due to the required parameter is not calculated';
			param2 = executionContext.dataHash[param2Id];
		}

		// convert the method to json, and send it to server for execution.
		var methodJson = {
			blockId: id,
			code : "collectElementsWithTypeAndCategory(documentxxx, typeof(xxx), builtincategory.wall)",
			args : [param1, param2]
		};
		var jsonMethodString = JSON.stringify(methodJson);
		if(Blockly.websocket)
			Blockly.websocket.send(jsonMethodString);
		executionContext.isRemoteCalling = true;
	}
	else
	{
		if(Blockly.ExecutionSequence.remotingCallingResult)
		{
			executionContext.dataHash[id] = Blockly.ExecutionSequence.remotingCallingResult;
			executionContext.isRemoteCalling = false;
			Blockly.ExecutionSequence.remotingCallingResult = null;
		}
	}
	
};

Blockly.ExecutionSequence.revitModel_ofClass = function(executionContext) {
	var id = this.id;
	var code = this.getTitleValue('OfClass');
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};

Blockly.ExecutionSequence.revitModel_ofCategory = function(executionContext) {
	var id = this.id;
	var code = this.getTitleValue('OfCategory');
	if(executionContext.dataHash)
	{
		executionContext.dataHash[id] = code;
	}
};
