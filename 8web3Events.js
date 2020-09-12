console.log(Web3);
// websocket
const rpcURL = "wss://ropsten.infura.io/ws/v3/cc8aa5dceaa144098ec736d6a2294fbc";

let web3 = new Web3(rpcURL);

console.log("Web3 is", web3);

let address = "0x5586a819B6dC56b6B21916D24E86159DE9995CE5";

let abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "Alert",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DoSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "SetAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, address);

//console.log("contract", contract);
//console.log("Methods", contract.method);
//console.log("getAge", contract.getAge);
//console.log("DoSomeWork", contract.DoSomeWork);

// we are using call back function and Promisses here...
 contract.methods.DoSomeWork().call(function(err, result){
    console.log("Work", result);
});
 contract.methods.getAge().call(function(err, result){
    console.log("Age", result);
});
// To listen the contract event...
contract.events.Alert({
   fromBlock: 0
}, function(error, event){ 
	console.log("error",error);
	console.log("event",event);
})
.on("connected", function(subscriptionId){
    console.log("connected=" ,subscriptionId);
})
.on('data', function(event){
    console.log("data=" ,event); // same results as the optional callback above
})
.on('changed', function(event){
	// remove event from local database
	console.log("changed=" ,event);
})
.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log("error=" , error);
    console.log("work=" ,receipt);
});

// to call  specific event you can write specific event name which you write in your cntract intead of "AllEvent"
contract.getPastEvents(
	'AllEvents',
	{
	  fromBlock: 0,
	  toBlock: 'latest'
	},
	(err, events) => { console.log(events) 
		console.log("err", err);
		console.log("Work", events);
	}
  )
