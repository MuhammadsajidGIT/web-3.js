var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/cc8aa5dceaa144098ec736d6a2294fbc');

const account1 = "0x70A7E04a0F22f511ce1D69da498Dbd806Ab7b9BA";

const privateKey1 = "21f005ecdbfc21faa4d91a905cf83fae3a6d18e1403b4e0cb58cb5abb8881795";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0xd1fd576a7B30ba754e4433b5416493C09bBdc7d8"

const abi = [
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
]
const contract = new web3.eth.Contract(abi, contractAddress);

console.log("Buffer 1 = ",privateKey1Buffer);
//Asyncronious
web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.SetAge(22).encodeABI()
      }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    console.log("tx = ",tx);
    console.log("serializedTx = ",serializedTx);
    console.log("raw = ",raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });

});
contract.methods.getAge().call(function(err, result){
    console.log("Age", result);
});

