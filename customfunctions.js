function ADD42(num1, num2) {
	return num1 + num2 + 2;
}

// The following function is an example of an asynchronous function:
function ADD42ASYNC(num1, num2) {
	// waits 1 second before returning the result
	return new OfficeExtension.Promise(function(resolve) {
		setTimeout(function() {
			resolve(num1 + num2 + 42);
		}, 1000);
	});
}

// The following function is an example that returns a boolean value:
function ISPRIME(num) {
	if(num <= 1 || !Number.isInteger(num)) return false; // validates input
	// checks natural numbers below the square root (not optimal)
	for(var factor = Math.floor(Math.sqrt(num)); factor > 1; factor--){
    		if(num % factor == 0) return false;
  	}
  	return true;
}

// The following function is an example that's computation-intensive for high inputs:
function NTHPRIME(n){
  	var primeCount = 0;
  	for(var num = 2; primeCount < n; num++){
    		if(ISPRIME(num)) primeCount++;
  	}
  	return num - 1;  
}

// The following function is an example that returns a string:
function GETDAY() {
	var d = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[d.getDay()];
}

// The following function is an example that streams values:
function INCREMENTVALUE(increment, caller){    
	var result = 0;
	var myInterval = setInterval(function(){
		result += increment;
		caller.setResult(result);
	}, 1000);
	caller.onCanceled = function(){
		clearInterval(myInterval);
	}
}

// The following function is an example that uses a range of cells:
function SECONDHIGHEST(range){
	var highest = range[0][0], secondHighest = range[0][0];
	for(var i = 0; i < range.length;i++){
		for(var j = 0; j < range[i].length;j++){
			if(range[i][j] >= highest){
				secondHighest = highest;
				highest = range[i][j];
			}
			else if(range[i][j] >= secondHighest){
				secondHighest = range[i][j];
			}
		}
	}
	return secondHighest;
}

// helper code for getting temperature
var scales = {};
var timeStarted = false;

function DEMORESET(id){
	scales["C00001"] = 530;
	scales["C00002"] = 320;
	scales["C00005"] = 440;
	scales["C00007"] = 370;
	if(!timeStarted) startTime();
	return new OfficeExtension.Promise(function(resolve) {
		setTimeout(function() {
			resolve(1);
		}, 100);
	});
}

function startTime(){
	timeStarted = true;
	
	if(scales["C00005"] < 20 || (scales["C00007"] < 20 || scales["C00001"] < 20)){
		var myRand = Math.random();
		scales["C00001"] += myRand * 18;
		scales["C00005"] += myRand * 18;
		scales["C00007"] += myRand * 18;
	}
	else{
		var myRand = Math.random();
		scales["C00001"] += (myRand - 0.7) * 38;
		scales["C00005"] += (myRand - 0.7) * 38;
		scales["C00007"] += (myRand - 0.7) * 38;
	}
	scales["C00002"] += (Math.random() - 0.5) * 5;
	setTimeout(startTime, 500);
}

function getWeightFromServer(scaleID, callback){
	var staticScales = {};
	staticScales["C00001"] = 530;
	staticScales["C00002"] = 320;
	staticScales["C00005"] = 440;
	staticScales["C00007"] = 370;
	setTimeout(function(){
		var data = {};
		data.weight = staticScales[scaleID].toFixed(1);
		callback(data);
	}, 200);
}

// chocolate factory

function GETWEIGHT(scaleID){ 

	return new OfficeExtension.Promise(function(setResult, setError){ 
		getWeightFromServer(scaleID, function(data){ 
			setResult(data.weight); 
		}); 
		
	}); 
}

function STREAMWEIGHT(scaleID, caller){
	if(!timeStarted) DEMORESET();
	function getNextWeight(){ 
		caller.setResult(scales[scaleID]); 
		setTimeout(getNextWeight, 500); 
	} 
	getNextWeight(); 
}



function LISTNUMBERS(n){
	console.log("list numbers called");
	var outputList = [];
	for(var i = 1; i <= n; i++){
		outputList.push([i]);
	}
	console.log("output" + outputList);

	return outputList;
}

function HELLO()
{
	return "HELLO";
}