
console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/cc8aa5dceaa144098ec736d6a2294fbc";

let web3 = new Web3(rpcURL);

console.log("Web3 is", web3);

let address = "0x054D65EcC1e1c50aeCA708D2A152c3Fa2405c5d1";

web3.eth.getBalance(address, (err, wei) => {
    console.log("wei", wei);
    // To conver wei to ether we use.. web3.utils.fromWei(wei, 'ether').
    let balance = web3.utils.fromWei(wei, 'ether');
    console.log("Balance", balance);
  });