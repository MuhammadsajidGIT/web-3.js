
const Web3 = require("web3");

console.log(Web3);

const rpcURL = "HTTP://127.0.0.1:7545";

let web3 = new Web3(rpcURL);

console.log("Web3 is", web3);

let address = "0x9b6C13d798606864C705d8271aAC5b540559Bc51";

web3.eth.getBalance(address, function(err, wei) {
    console.log("wei", wei);
    // To conver wei to ether we use.. web3.utils.fromWei(wei, 'ether').
    let balance = web3.utils.fromWei(wei, 'ether');
    console.log("Balance", balance);
  });
