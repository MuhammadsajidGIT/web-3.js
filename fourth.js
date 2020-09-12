var Tx = require('ethereumjs-tx').Transaction;

const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');

const Account_1 = "0xC4caA76AE2845D0c43C8CfC7778b3467Ef888BA7";
const Account_2 = "0x5202cB720f987aAab157745Ca7F6695e281E9314";
// Direct server pay kaam karnay kay liye aap ko private keys rakhni parengi.
const PrivateKeys_1 = "21eab4c3489f69ca5be8f62a92ce1723b46d4cffb9bd7781c68fb51f5ed1514a";
const PrivateKeys_2 = "e5ffea369c9a5aff261320f556df3b0a59024293f86e386a88c07152a4be8dc3";


// creating private keys Binary throgh buffer because we are tranferig data to binary form not text form..
const privateKey1Buffer = Buffer.from(PrivateKeys_1, 'hex');
const privateKey2Buffer = Buffer.from(PrivateKeys_2, 'hex');

console.log("Buffer 1", privateKey1Buffer );
console.log("Buffer 2", privateKey2Buffer );

web3.eth.getTransactionCount(Account_1, (err, txCount) => {
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       Account_2,
      value:    web3.utils.toHex(web3.utils.toWei('3', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    const tx = new Tx(txObject);
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

 
