//Use injected web3
// Here we are only Fetching the data of deployed contract not updating the state of contract.
console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/cc8aa5dceaa144098ec736d6a2294fbc";

let web3 = new Web3(rpcURL);

console.log("Web3 is", web3);

let address = "0xd1fd576a7B30ba754e4433b5416493C09bBdc7d8";

let abi = [
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
		"name": "DoSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
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
];

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
