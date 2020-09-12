var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/cc8aa5dceaa144098ec736d6a2294fbc');

const Account_1 = "0x70A7E04a0F22f511ce1D69da498Dbd806Ab7b9BA";
const Account_2 = "0x054D65EcC1e1c50aeCA708D2A152c3Fa2405c5d1";
// Direct server pay kaam karnay kay liye aap ko private keys rakhni parengi.
const PrivateKeys_1 = "21f005ecdbfc21faa4d91a905cf83fae3a6d18e1403b4e0cb58cb5abb8881795";
const PrivateKeys_2 = "08bca7086b78a11f20406f326e1d6574ae92e9782aeeea4f402b0dafe8b8842e";


// creating private keys Binary throgh buffer
const privateKey1Buffer = Buffer.from(PrivateKeys_1, 'hex');
const privateKey2Buffer = Buffer.from(PrivateKeys_2, 'hex');

console.log("Buffer 1", privateKey1Buffer );
console.log("Buffer 2", privateKey2Buffer );

web3.eth.getTransactionCount(Account_1, (err, txCount) => {
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       Account_2,
      value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    const tx = new Tx.Transaction(txObject, {chain : 'ropsten', hardfork: 'petersburg'});
    tx.sign(privateKey1Buffer);
    
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    //console.log("tx=", tx);
    //console.log("seriallize Tx=", serializedTx);
    //console.log("raw", raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash);
      });
  });
