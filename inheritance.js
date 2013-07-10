var baseObj = function() {
	var objName = '',
		object = null,
	
	getObjName = function() {
		return objName;
	},
	
	display = function() {
		console.log("orig base object display");
	},
	
	baseInit = function(on){
		objName = on;
	};
	
	return {
		display: display,
		getObjName: getObjName,
		baseInit: baseInit
	};
};

var baseObj2 = function() {
	var display = function() {
		console.log('this is the display');
	},
	
	display2 = function() {console.log('this is the other display');};
	
	return {
		display: display,
		display2: display2
	};
};

// create interfaces for functional validation
var ITestObject = ["display","crap"];

var testObj = function() {
	var testName = '',
		
	getTestName = function() {
		return testName;
	},
	
	getAllNames = function() {
		return returnObjects.getTestName() + ', ' + returnObjects.getObjName();
	},
	
	// this has the same name as a function in the inherited base classes
	// by adding this function explicitly to the returnObjects object it will override any of the 
	display = function() {
		console.log("not inherited display method");
	},
	
	init = function(tn,on) {
		testName = tn;
		returnObjects.baseInit(on);
	};
	
	// the rest of this code to the bottom of the object is required for the inheritance
	// the code below MUST be the last code in the object
	// required object to list the public members, do not change the name, only add your public members
	var returnObjects = {
		// expose all of your public members here
		getTestName: getTestName,
		getAllNames: getAllNames,
		display: display, // because this is defined in this object it will not be inherited from any of the base objects
		init: init
	};
	
	// do not change any of the code below	
	var baseObjects = [],
		interfacesImplemented = [],
		interfaceNamesImplemented = [],
		defaultInterface = false,
		__loopC = 0,
		__loopC2 = 0,
		__loopC3 = 0,
		__loopC4 = 0,
		__newNum = 0,
		__newNum2 = 0,
		__n = ""
		__f = null,
		__e = 0,
		__s = 0;
	if (typeof arguments[arguments.length-1]=="boolean") {
		eval("defaultInterface="+arguments[arguments.length-1].toString()+";");
	}
	
	for (__loopC = 0; __loopC < arguments.length; __loopC++) {
		__newNum = new Number(__loopC);
		if (typeof arguments[__newNum] == "string"){
			if (arguments[__newNum].indexOf("I") == 0){
				interfacesImplemented.push(eval(arguments[__newNum]));
				interfaceNamesImplemented.push(arguments[__newNum]);
			}
		}
		else{
			__loopC2 = new Number(baseObjects.length);
			buildObjects(arguments[__newNum],__loopC2);
		}
	}
	
	for (__loopC = 0; __loopC < interfacesImplemented.length; __loopC++) {
		__newNum = new Number(__loopC);
		for (__loopC3 = 0; __loopC3 < interfacesImplemented[__newNum].length; __loopC3++){
			__n = interfacesImplemented[__newNum][__loopC3];
			__f = eval("returnObjects."+__n);
			if(__f == 'undefined' || __f == null) {
				if (defaultInterface) {
					eval("returnObjects."+__n+"=function(){}");
				}
				else {
					eval("returnObjects."+__n+"=function(){throw \"'"+__n+"()' member not implemented from Interface '" + interfaceNamesImplemented[__newNum] +"'\";}");
				}
			}
		}
	}
	
	function buildObjects(arg,bo) {
		var baseObjectNames = [],
			baseObjectArgs = [];
		
		baseObjects.push(eval(arg));
		for (__n in arg) {
			baseObjectNames.push(__n);
			__s = arg[__n].toString().indexOf("(");
			__e = arg[__n].toString().indexOf(")")+1;
			baseObjectArgs.push(arg[__n].toString().substr(__s,__e-__s));
		}	
	
		for (__loopC4 = 0; __loopC4 < baseObjectNames.length; __loopC4++) {
			__newNum2 = new Number(__loopC4);
			__f = eval("returnObjects."+baseObjectNames[__newNum2]);
			if(__f == 'undefined' || __f == null) {
				eval("returnObjects."+baseObjectNames[__newNum2]+"= function"+baseObjectArgs[__newNum2]+" {return baseObjects["+bo.toString()+"]."+baseObjectNames[__newNum2]+baseObjectArgs[__newNum2]+";};");
			}
		}
	}
	
	return returnObjects;
	// do not change any of the code above
};

var t = new testObj(new baseObj(), "ITestObject",new baseObj2(),true); //the last argument is set to create any undefined functions from 
																		//	the interfaces to throw an error when called and false or missing
																		//  or an empty function if true
t.crap();
t.display();
t.init("test name", "object Name");
console.log(t.getAllNames());
t.display2();

/*
key points:
	1. allows for multiple inheritance
		a. **NOTE: inheritance is done on a FIFO basis.  e.g. if two base objects contain the same members, the first base object is
					the member inherited
	2. allows for interface validation
		b. all interfaces specified are passed as strings and all 
	3. allows for interface member defaulting
		a. last argument in the constructor can be a boolean or not specified
		b. if not specified, assume false
		c. if true, create any functions specified in the interface that is not created explicitly or inherited will be created
						as an empty function
		d. if false, create any functions specified in the interface that is not created explicitly or inherited will be created
						to throw an error when called
	4. allows for polymorphism
		a. define the member in the child object, any members of the same name in the base object(s) are ignored
*/