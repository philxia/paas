Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');


Blockly.ExecutionSequence.selection_terminate = function(executionContext) {
	executionContext.blockSequence.pop(); // release the branch blocks.
	executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop(); // pop out the 
	executionContext.iterationSteps = -1;
	executionContext.iteratingStepInIteration = -1;
	executionContext.executingMode = executionContext.historyOfExecutingMode.pop();	
};

// the implementation of 'IF' is a little similar as 'whileUntil'.
// 1. evaluate the statements in 'IF(s)', this will determine the branch we will execute.
Blockly.ExecutionSequence.controls_if = function(executionContext) {
	// initialize the env during the first time entering session in sequence steps.
	if(!this.isInitailize)
	{
		this.isInitailize = true;
		// get the iteration data in 'BOOL'.
		this.iteratingStepInIteration = 0; // reuse the iteration step count here.
		this.iterationSteps = this.elseifCount_;
		var n = this.iteratingStepInIteration;
		var ifblock = this.getInputTargetBlock('IF' + n);
		// push the 'IF0' block set to the sequence even it is null.
		// actually, we just need to add the new array to the stack for adding this block.
		if(ifblock)
		{
			executionContext.pushNewExecutionSequenceWithBranchBlock(null, ifblock);
			// add this block in the middle of 'IFn' and 'DOn'.
			executionContext.pushBlockToExecutingSequence(this);
		}
		else
			executionContext.pushNewExecutionSequenceWithBranchBlock(null, this);

		// figure out the branch sequence in the loop body.
		var doBranchTopBlock = this.getInputTargetBlock('DO' + n);
		executionContext.blockToExecutionSequence(doBranchTopBlock);

		// update the executing index.
		executionContext.historyIndexOfExecutingBlock.push(executionContext.indexOfExecutingBlock);
		executionContext.indexOfExecutingBlock = -1; // will be increased by the doExecution method.	
		// update the executing mode.
		// For while/until loop.
		executionContext.historyOfExecutingMode.push(executionContext.executingMode);
		executionContext.executingMode = executionContext.ExecutingMode_Selection;
	}
	else
	{
		// check the 'IFn' to see if to break the loop.
		// get the iteration data in 'BOOL'.
		var nIF = this.iteratingStepInIteration;
		var ifNblock = this.getInputTargetBlock('IF'+nIF);

		var condition = false;
		if(ifNblock)
			condition = executionContext.dataHash[ifNblock.id];
		if(condition === null //no block for this 'IF', just skip this branch.
		   || condition === false) // the evaluation is false, also skip this branch.
		{
			executionContext.blockSequence.pop(); // release the branch blocks.
			// terminate the selection if there is no other branch.
			if(nIF === this.iterationSteps)
			{
				// terminate the selection if there is no other branch, including elseif and else.
				if(!this.elseCount_ || this.elseCount_ === 0) //elseCount_ is NaN
				{
					executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop(); // pop out the 
					this.iterationSteps = -1;
					this.iteratingStepInIteration = -1;
					this.isInitailize = false;
					executionContext.executingMode = executionContext.historyOfExecutingMode.pop();
					return;
				}
				else // elseCount_ === 1
				{
					// just add the else branch for execution.
					var elseblock = this.getInputTargetBlock('ELSE');
					executionContext.pushNewExecutionSequenceWithBranchBlock(null, elseblock);
					
					// reset the process index.
					executionContext.indexOfExecutingBlock = -1;
					
					// add a special block at the end of this branch to terminate the whole selection. cool:)
					var dummyBlock = {
						type: 'selection_terminate',
						isDummy: true
					};
					executionContext.pushBlockToExecutingSequence(dummyBlock);
				}
			}
			else // add the next elseif branch
			{
				// just add the else branch for execution.
				var nextifblock = this.getInputTargetBlock('IF' + (++nIF));

				// push the 'IFn' block set to the sequence even it is null.
				// actually, we just need to add the new array to the stack for adding this block.
				if(nextifblock)
				{
					executionContext.pushNewExecutionSequenceWithBranchBlock(null, nextifblock);
					// add this block in the middle of 'IFn' and 'DOn'.
					executionContext.pushBlockToExecutingSequence(this);
				}
				else
					executionContext.pushNewExecutionSequenceWithBranchBlock(null, this);

				// figure out the branch sequence in the loop body.
				var nextdoBranchTopBlock = this.getInputTargetBlock('DO' + nIF);
				executionContext.blockToExecutionSequence(nextdoBranchTopBlock);

				// reset the process index.
				executionContext.indexOfExecutingBlock = -1;
			}	
			
		}
		// bingo, we should execute the branch...but how to terminate the selection after this branch.
		else
		{
			// add a special block at the end of this branch to terminate the whole selection. cool:)
			var dummyBlock = {
				type: 'selection_terminate',
				isDummy: true
			};
			executionContext.pushBlockToExecutingSequence(dummyBlock);
		}
		this.iteratingStepInIteration ++;
	}
};


// the implementation is different with forEach, we have to evaluate the input for every iteration.
// 1. 
Blockly.ExecutionSequence.controls_whileUntil = function(executionContext) {
	// initialize the env during the first time entering session in sequence steps.
	if(!this.isInitailize)
	{
		this.isInitailize = true;
		// get the iteration data in 'BOOL'.
		var boolblock = this.getInputTargetBlock('BOOL');
		if(boolblock)
		{
			// push the 'BOOL' block set to the sequence.
			executionContext.pushNewExecutionSequenceWithBranchBlock(null, boolblock);
		}
		else // no input for list - empty collection.
		{
			this.iterationSteps = 0;
		}

		// figure out the branch sequence in the loop body.
		var doBranchTopBlock = this.getInputTargetBlock('DO');
		if(!doBranchTopBlock)
		{
			return; // end the iteration if there is no item in the branch.
		}
		// append this block at the middle of 'BOOL' and 'DO'.
		executionContext.pushBlockToExecutingSequence(this);
		// append the 'DO' branch blocks.
		executionContext.blockToExecutionSequence(doBranchTopBlock);

		// update the executing index.
		executionContext.historyIndexOfExecutingBlock.push(executionContext.indexOfExecutingBlock);
		executionContext.indexOfExecutingBlock = -1; // will be increased by the doExecution method.	
		this.iteratingStepInIteration = 0;
		// update the executing mode.
		// For while/until loop.
		executionContext.historyOfExecutingMode.push(executionContext.executingMode);
		executionContext.executingMode = executionContext.ExecutingMode_Iteration;
	}
	else
	{
		// check the 'BOOL' to see if to break the loop.
		// get the iteration data in 'BOOL'.
		var boolblock = this.getInputTargetBlock('BOOL');
		var until = this.getTitleValue('MODE') == 'UNTIL';
		if(boolblock)
		{
			var condition = executionContext.dataHash[boolblock.id];
			if(condition === null)
				throw 'The condition block of while/until loop is not calculated!';
			if(until)
				condition = !condition;
			if(condition === false) // break the loop.
			{
				// end the iteration if the steps is 0.
				executionContext.blockSequence.pop(); // release the branch blocks.
				executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop(); // pop out the 
				this.iterationSteps = -1;
				this.iteratingStepInIteration = -1;
				this.isInitailize = false;
				executionContext.executingMode = executionContext.historyOfExecutingMode.pop();
				return;	
			}
			this.iteratingStepInIteration ++;
		}
	}
};


Blockly.ExecutionSequence.controls_forEach = function(executionContext) {
	// initialize the env during the first time entering session in sequence steps.
	if(!this.isInitailize)
	{
		this.isInitailize = true;
		// get the iteration data in 'LIST'.
		var collectionblock = this.getInputTargetBlock('LIST');
		if(collectionblock)
		{
			if(executionContext.dataHash[collectionblock.id])
				this.iterationSteps = executionContext.dataHash[collectionblock.id].length;
		}
		else // no input for list - empty collection.
		{
			this.iterationSteps = 0;
		}

		// figure out the branch sequence in the loop body.
		var doBranchTopBlock = this.getInputTargetBlock('DO');
		if(!doBranchTopBlock)
		{
			return; // end the iteration if there is no item in the branch.
		}
		
		// add the branch to the execution sequence as a new stack array.
		// this will duplicate this block in the new sequence, and this is our intend
		// we can reset the var at the beginning of the branch executing.
		executionContext.pushNewExecutionSequenceWithBranchBlock(this, doBranchTopBlock);
		
		// update the executing index.
		executionContext.historyIndexOfExecutingBlock.push(executionContext.indexOfExecutingBlock);
		executionContext.indexOfExecutingBlock = -1; // will be increased by the doExecution method.	
		this.iteratingStepInIteration = 0;
		// update the executing mode.
		// For each loop.
		executionContext.historyOfExecutingMode.push(executionContext.executingMode);
		executionContext.executingMode = executionContext.ExecutingMode_Iteration;
	}
	else
	{
		// executing the first block of the iteration branch.
		if(executionContext.indexOfExecutingBlock != 0)
			throw 'The index of the control block in iteration steps must be 0';
		
		// update the iteration steps.
		if(this.iteratingStepInIteration === this.iterationSteps)
		{
			// end the iteration if the steps is 0.
			executionContext.blockSequence.pop(); // release the branch blocks.
			executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop(); // pop out the 
			this.iterationSteps = -1;
			this.iteratingStepInIteration = -1;
			this.isInitailize = false;
			executionContext.executingMode = executionContext.historyOfExecutingMode.pop();
			return;
		}
		else
		{
			// get the iteration data in 'LIST'.
			var collectionblock = this.getInputTargetBlock('LIST');
            var variableName = Blockly.ExecutionSequence.variableDB_.getName(this.getInputVariable('VAR'), Blockly.Variables.NAME_TYPE);
			executionContext.dataHash[variableName] = executionContext.dataHash[collectionblock.id][this.iteratingStepInIteration];
		}
		this.iteratingStepInIteration ++;
	}
};

Blockly.ExecutionSequence.controls_for = function(executionContext) {
	// For loop.
	if(!this.isInitailize)
	{
		// two parameters, the first one is 'FROM' and second one is 'TO'.
		var paramA = this.getInputTargetBlock('FROM');
		if(!paramA)
			paramA = null;
		else
		{
			var paramAId = paramA.id;
			if(executionContext.dataHash[paramAId] === null)
				throw 'execution failed due to the required parameter is not calculated';
			paramA = executionContext.dataHash[paramAId];
		}

		var paramB = this.getInputTargetBlock('TO');
		if(!paramB)
			paramB = null;
		else
		{
			var paramBId = paramB.id;
			if(executionContext.dataHash[paramBId] === null)
				throw 'execution failed due to the required parameter is not calculated';
			paramB = executionContext.dataHash[paramBId];
		}	

		var argument0 = paramA || 0;
		var argument1 = paramB || 0;
		
		var loopTimes = argument1 - argument0 + 1;
		// no loop if the 'TO' is less than 'FROM'.
		if(loopTimes <= 0)
			return;

		this.isInitailize = true;
		this.iterationSteps = argument1;// tricky! no really means the steps.

		// figure out the branch sequence in the loop body.
		var doBranchTopBlock = this.getInputTargetBlock('DO');
		if(!doBranchTopBlock)
		{
			return; // end the iteration if there is no item in the branch.
		}
		
		// add the branch to the execution sequence as a new stack array.
		// this will duplicate this block in the new sequence, and this is our intend
		// we can reset the var at the beginning of the branch executing.
		executionContext.pushNewExecutionSequenceWithBranchBlock(this, doBranchTopBlock);
		
		// update the executing index.
		executionContext.historyIndexOfExecutingBlock.push(executionContext.indexOfExecutingBlock);
		executionContext.indexOfExecutingBlock = -1; // will be increased by the doExecution method.	
		this.iteratingStepInIteration = argument0;
		// update the executing mode.
		// For each loop.
		executionContext.historyOfExecutingMode.push(executionContext.executingMode);
		executionContext.executingMode = executionContext.ExecutingMode_Iteration;
	}
	else
	{
		// executing the first block of the iteration branch.
		if(executionContext.indexOfExecutingBlock != 0)
			throw 'The index of the control block in iteration steps must be 0';
		
		// update the iteration steps.
		if(this.iteratingStepInIteration > this.iterationSteps)
		{
			// end the iteration if the steps is 0.
			executionContext.blockSequence.pop(); // release the branch blocks.
			executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop(); // pop out the 
			this.iterationSteps = -1;
			this.iteratingStepInIteration = -1;
			this.isInitailize = false;
			executionContext.executingMode = executionContext.historyOfExecutingMode.pop();
			return;
		}
		else
		{
			// get the iteration data in 'LIST'.
            var variableName = Blockly.ExecutionSequence.variableDB_.getName(this.getInputVariable('VAR'), Blockly.Variables.NAME_TYPE);
			executionContext.dataHash[variableName] = this.iteratingStepInIteration;
		}
		this.iteratingStepInIteration ++;
	}
};

Blockly.ExecutionSequence.controls_flow_statements = function(executionContext) {
	var code = this.getTitleValue('FLOW');
	if(code === 'BREAK')
	{
		executionContext.historyOfExecutingMode.push(executionContext.executingMode);
		executionContext.historyIndexOfExecutingBlock.push(executionContext.indexOfExecutingBlock);

		// find the nearest iteration.
		var seqLength = executionContext.historyOfExecutingMode.length;
		var i=seqLength-1;
		for(; i>0; i-- )
		{
			if(executionContext.historyOfExecutingMode[i] === executionContext.ExecutingMode_Iteration)
				break;
		}
		if(i<1)
			throw 'There is no loop to break.';
		for(var j=0; j<(seqLength-i); j++)
		{
			var blocks = executionContext.blockSequence.pop(); // release the branch blocks.
			for(var ii=0; ii<blocks.length; ++ii)
				if(blocks[ii].isInitailize)
					blocks[ii].isInitailize = false;
			executionContext.historyOfExecutingMode.pop();
			executionContext.historyIndexOfExecutingBlock.pop();
		}
		executionContext.executingMode = executionContext.historyOfExecutingMode.pop();
		executionContext.indexOfExecutingBlock = executionContext.historyIndexOfExecutingBlock.pop();
		var exeBlock = executionContext.getExecutingblock();
		// reset the initialize flag to force the loop control to regenerate the branch blocks again.
		if(exeBlock.isInitailize)
			exeBlock.isInitailize = false;
	}
};
