console.log(Web3);

const rpcURL = "HTTP://127.0.0.1:7545";

let web3 = new Web3(rpcURL);

console.log("Web3 is", web3);

let address = "0xd4f1346a9F7783B7638D2962c7e2FEE1dc11f864";

web3.eth.getBalance(address, function(err, wei) {
    console.log("wei", wei);
    // To conver wei to ether we use.. web3.utils.fromWei(wei, 'ether').
    let balance = web3.utils.fromWei(wei, 'ether');
    console.log("Balance", balance);
  });