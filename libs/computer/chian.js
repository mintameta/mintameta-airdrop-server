const txHandle = async (from, to, value, encodedABI, privateKey, providerAddress) => {
  const web3 = new Web3(providerAddress);
  // let price = await web3.eth.getGasPrice();
  return new Promise((resolve, reject) => {
    const tx = {
      // this could be provider.addresses[0] if it exists
      from: from,
      // target address, this could be a smart contract address
      to: to,
      // optional if you want to specify the gas limit
      // gasPrice: 2,
      gas: 2000000,
      // optional if you are invoking say a payable function
      value: value,
      // nonce:
      // this encodes the ABI of the method and the arguements
      // bp.methods.withdraw(tokenIds).encodeABI()
      data: encodedABI
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    let res = false;
    signPromise.then((signedTx) => {
      // raw transaction string may be available in .raw or
      // .rawTransaction depending on which signTransaction
      // function was called
      const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
      sentTx.on("receipt", receipt => {
        // do something when receipt comes back
        // console.log('receipt = ', receipt);
        resolve(true)
      });
      sentTx.on("error", err => {
        // do something on transaction error
        console.log('err txHandle == ', err);
        reject(err)
      });
    }).catch((err) => {
      // do something when promise fails
      console.log('signPromise err', err)
      reject(err)
    });
  })
}


module.exports = {
  txHandle
}
