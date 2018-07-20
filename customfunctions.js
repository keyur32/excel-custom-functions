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
	scales["Ganache Mixer"] = 530;
	scales["Truffle Mixer"] = 320;
	scales["Small Truffles"] = 440;
	scales["Large Truffles"] = 370;
	if(!timeStarted) startTime();
	return new OfficeExtension.Promise(function(resolve) {
		setTimeout(function() {
			resolve(1);
		}, 100);
	});
}

function startTime(){
	timeStarted = true;
	
	if(scales["Small Truffles"] < 20 || (scales["Large Truffles"] < 20 || scales["Ganache Mixer"] < 20)){
		var myRand = Math.random();
		scales["Ganache Mixer"] += myRand * 18;
		scales["Small Truffles"] += myRand * 18;
		scales["Large Truffles"] += myRand * 18;
	}
	else{
		var myRand = Math.random();
		scales["Ganache Mixer"] += (myRand - 0.7) * 38;
		scales["Small Truffles"] += (myRand - 0.7) * 38;
		scales["Large Truffles"] += (myRand - 0.7) * 38;
	}
	scales["Truffle Mixer"] += (Math.random() - 0.5) * 5;
	setTimeout(startTime, 500);
}

function getWeightFromServer(scaleID, callback){
	var staticScales = {};
	staticScales["Ganache Mixer"] = 530;
	staticScales["Truffle Mixer"] = 320;
	staticScales["Small Truffles"] = 440;
	staticScales["Large Truffles"] = 370;
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