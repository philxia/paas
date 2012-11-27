Blockly.ExecutionSequence = Blockly.Generator.get('ExecutionSequence');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.ExecutionSequence.RESERVED_WORDS_ =
    // https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan';


/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.ExecutionSequence.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.ExecutionSequence.ORDER_MEMBER = 1;         // . []
Blockly.ExecutionSequence.ORDER_NEW = 1;            // new
Blockly.ExecutionSequence.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.ExecutionSequence.ORDER_INCREMENT = 3;      // ++
Blockly.ExecutionSequence.ORDER_DECREMENT = 3;      // --
Blockly.ExecutionSequence.ORDER_LOGICAL_NOT = 4;    // !
Blockly.ExecutionSequence.ORDER_BITWISE_NOT = 4;    // ~
Blockly.ExecutionSequence.ORDER_UNARY_PLUS = 4;     // +
Blockly.ExecutionSequence.ORDER_UNARY_NEGATION = 4; // -
Blockly.ExecutionSequence.ORDER_TYPEOF = 4;         // typeof
Blockly.ExecutionSequence.ORDER_VOID = 4;           // void
Blockly.ExecutionSequence.ORDER_DELETE = 4;         // delete
Blockly.ExecutionSequence.ORDER_MULTIPLICATION = 5; // *
Blockly.ExecutionSequence.ORDER_DIVISION = 5;       // /
Blockly.ExecutionSequence.ORDER_MODULUS = 5;        // %
Blockly.ExecutionSequence.ORDER_ADDITION = 6;       // +
Blockly.ExecutionSequence.ORDER_SUBTRACTION = 6;    // -
Blockly.ExecutionSequence.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.ExecutionSequence.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.ExecutionSequence.ORDER_IN = 8;             // in
Blockly.ExecutionSequence.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.ExecutionSequence.ORDER_EQUALITY = 9;       // == != === !==
Blockly.ExecutionSequence.ORDER_BITWISE_AND = 10;   // &
Blockly.ExecutionSequence.ORDER_BITWISE_XOR = 11;   // ^
Blockly.ExecutionSequence.ORDER_BITWISE_OR = 12;    // |
Blockly.ExecutionSequence.ORDER_LOGICAL_AND = 13;   // &&
Blockly.ExecutionSequence.ORDER_LOGICAL_OR = 14;    // ||
Blockly.ExecutionSequence.ORDER_CONDITIONAL = 15;   // ?:
Blockly.ExecutionSequence.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.ExecutionSequence.ORDER_COMMA = 17;         // ,
Blockly.ExecutionSequence.ORDER_NONE = 99;          // (...)


Blockly.websocket;
Blockly.initWebsocket = function() {
	Blockly.websocket = new WebSocket("ws://10.148.204.119:8080/", "echo-protocol");
	Blockly.websocket.onopen = function()
	{
		alert("open");
	};
	Blockly.websocket.onclose = function()
	{
		alert("close");
	};
	Blockly.websocket.onmessage = function(message)
	{
		var data = message.data;
		var result;
		try{
			result = JSON.parse(data);
		}
		catch(e)
		{
			result={};
		}
		Blockly.ExecutionSequence.remotingCallingResult = result;
		Blockly.ExecutionSequence.isRemoteCalling = true;
	};
};

/**
 * Initialise the generator.
 */
Blockly.ExecutionSequence.init = function()
{
	// Create a dictionary of definitions to be printed before the code.
	Blockly.ExecutionSequence.definitions_ = {};

	if (Blockly.Variables) {
		if (!Blockly.ExecutionSequence.variableDB_) {
			Blockly.ExecutionSequence.variableDB_ =
				new Blockly.Names(Blockly.ExecutionSequence.RESERVED_WORDS_.split(','));
		} else {
			Blockly.ExecutionSequence.variableDB_.reset();
		}

		var defvars = [];
		var variables = Blockly.Variables.allVariables();
		for (var x = 0; x < variables.length; x++) {
			defvars[x] = 'var ' +
				Blockly.ExecutionSequence.variableDB_.getDistinctName(variables[x],
																	  Blockly.Variables.NAME_TYPE) + ';';
		}
		Blockly.ExecutionSequence.definitions_['variables'] = defvars.join('\n');
	}
	
	// create the data hash.
	Blockly.ExecutionSequence.dataHash = {};
	Blockly.ExecutionSequence.blockSequence = new Array(); // stack in stack op.
	this.blockSequence.push(new Array()); // initialize a new empty array.
	Blockly.ExecutionSequence.indexOfExecutingBlock = 0;
	Blockly.ExecutionSequence.historyIndexOfExecutingBlock = new Array(); // stack op.
	Blockly.ExecutionSequence.historyOfExecutingMode = new Array();
	Blockly.ExecutionSequence.executingStack = new Array();// array op.
	Blockly.ExecutionSequence.iterationSteps = -1;// the iteration times.
	Blockly.ExecutionSequence.iteratingStepInIteration = -1; // the iterating step during the iteration.

	// initailise the remote calling status.
	Blockly.ExecutionSequence.isRemoteCalling = false;
	Blockly.ExecutionSequence.remotingCallingResult = null;

	// initialise the block executing mode - {sequence 0, iteration 1, selection 2}
	Blockly.ExecutionSequence.ExecutingMode_Sequence = 0;
	Blockly.ExecutionSequence.ExecutingMode_Iteration = 1;
	Blockly.ExecutionSequence.ExecutingMode_Selection = 2;
	Blockly.ExecutionSequence.executingMode = this.ExecutingMode_Sequence;

	// member methods.
	Blockly.ExecutionSequence.isBlockContainBranch = function(block)
	{
		if(block.category === "Control" && block.type != "controls_flow_statements")
			return true;
		return false;
	};
	
	Blockly.ExecutionSequence.pushBlockToExecutingSequence = function(block)
	{
		this.blockSequence[this.blockSequence.length-1].push(block);
	};

	Blockly.ExecutionSequence.getExecutingblock = function()
	{
		// end of execution.
		if(this.indexOfExecutingBlock >= this.blockSequence[this.blockSequence.length-1].length)
		{
			// if the current execution mode is iteration, just go to the first item
			// and let the control block to terminate the iteration if it should do.
			if(this.executingMode === this.ExecutingMode_Iteration)
				this.indexOfExecutingBlock = 0;
			else
				return null;
		}

		return this.blockSequence[this.blockSequence.length-1][this.indexOfExecutingBlock] || null;
	};

	// setup the websocket.
	//if(this.websocket instanceof WebSocket)
	//	return;


};

/**
 * Generate the blocks executing sequence with the given block as the first executing block.
 * @param {Block} block the first exeucting block.
 * @param {bool} isNewStack indicates if we need to start a new call stack frame.
 */
Blockly.ExecutionSequence.blockToExecutionSequence = function(block)
{
	if(!block)
		return;

	// 1. handles the previous block. WE DO NOT NEED TO HANDLE THE PREVIOUS BLOCK!
	/*
	if(block.previousConnection)
	{
		var previousBlock = block.previousConnection.targetConnection;
		if(previousBlock)
			blockToExecutionSequence(previousBlock);
	}
	*/

	// 2. handles the input list.
	// skip the input list of the block which contains the branch such as loop and selection, we will handle 
	// them later.
	if(block.inputList)
	{
		if(this.isBlockContainBranch(block))
		{
			if(block.type === 'controls_forEach')
			{
				var listBlock = block.getInputTargetBlock('LIST');
				this.blockToExecutionSequence(listBlock);
			}
			else if(block.type === 'controls_for')
			{
				var fromBlock = block.getInputTargetBlock('FROM');
				this.blockToExecutionSequence(fromBlock);
				var toBlock = block.getInputTargetBlock('TO');
				this.blockToExecutionSequence(toBlock);
			}
		}
		else
		{
			for( var i=0, inputBlockConnection; i<block.inputList.length; i++)
			{
				inputBlockConnection = block.inputList[i]; // connection objects.
				inputBlockConnection = inputBlockConnection && inputBlockConnection.targetBlock();
				if(!inputBlockConnection)
					continue;
				
				this.blockToExecutionSequence(inputBlockConnection);
			}
		}
	}

	// 3. add block to execution sequence.
	this.pushBlockToExecutingSequence(block);

	// if the block has the output connection, it do not has the pre&next connection.
	// we only handle the next connection becuase the propogation happen from the outputs to inputs.
	// 4. handles the next connection.
	if(block.nextConnection)
	{
		var nextBlock = block.nextConnection.targetBlock();
		if(nextBlock)
			this.blockToExecutionSequence(nextBlock);
	}
}

Blockly.ExecutionSequence.pushNewExecutionSequenceWithBranchBlock = function(controlBlock, branchTopBlock)
{
	if(!controlBlock && !branchTopBlock)
		return;
	
	this.blockSequence.push(new Array());
	if(controlBlock)
		this.pushBlockToExecutingSequence(controlBlock);
	
	if(branchTopBlock)
		this.blockToExecutionSequence(branchTopBlock);
}

Blockly.ExecutionSequence.execute = function(endOfExecutionCallback)
{
	if(!this.blockSequence)
		return;

	if(this.blockSequence.length<1)
		return;

	Blockly.mainWorkspace.traceOn(Blockly.TraceOn);

	var self = this;
	var callee = this.doExecution;
	this.doExecution(endOfExecutionCallback);
	//setTimeout( function(){callee.call(self)}, 0);
}

Blockly.ExecutionSequence.doExecution = function(endOfExecutionCallback)
{
	var block = this.getExecutingblock();
	if(!block)// end of execution.
	{
		// unselect the last hightlight block when is tracing on.
		if(Blockly.TraceOn && Blockly.selected)
			Blockly.selected.unselect();
		
		setTimeout(endOfExecutionCallback, 500);
		return;
	}

	var func = this[block.type];
	if(!func)
		throw 'Language "' + name + '" does not know how to generate code ' +
            'for block type "' + block.type + '".';

	func.call(block, this);

	var timeOutInterval = 0;
	if(Blockly.TraceOn)
		timeOutInterval = 500;
	if(!block.isDummy)
		Blockly.mainWorkspace.highlightBlock(block.id);// animate
	else
		timeOutInterval = 0;// no animation and wait for the dummy block.

	if(this.isRemoteCalling === false)
		this.indexOfExecutingBlock ++;
	else
		timeOutInterval = 500;// repeat this call if it is a remoting call.

	// this will make sure the next timeout call will set the this 
	// pointer to ExecutionSequence instead of window object.
	var self = this;
	var callee = arguments.callee;
	setTimeout( function(){callee.call(self, endOfExecutionCallback);}, timeOutInterval);
}
