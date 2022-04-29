var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const config = require('../config');
const tradeInfo = require('../conf/tradeInfo');
const mysqlConnect = require('../libs/db/mysql');
const {BigNumberStr, BigNumberMul} = require('../libs/computer/bignumber');

var web3 = new Web3(config.endPoints);
const account = web3.eth.accounts.privateKeyToAccount(config.privateKey);
router.post('/add', async (req, res, next) => {
  const requestparams = {
    name: 'abc',
    type: 1,
    chainName: 'bsc',
    tokenAddress: '0x6a5Cf604e0115B77d70aB355190Fd1bbaeB7a9df',
    tokenName: 'usdt',
    tokenSymbol: 'usd',
    tokenPic: 'https://pic3.zhimg.com/50/v2-92a043cb39b815182f81ff0141cf1468_400x224',
    addressLength: '10',
    tokenAmount: '40000',
    introduction: 'test data introduction',
    status: 0,
    successful: 3,
    fail: 0,
    tokenAddressArr: ['0xA572120441b920BdeAD2209633Cb02d44c1E0775', '0xa9B47225a473245E7772Fe7ACFc1D7e15Ebaf110', '0x28D9e08b9dC6D8D71085544171d2FD9dDc010b4C'],
    tokenAmountArr: ["100", "210", "999"],
  }
  const {
    name, type, chainName, tokenAddress, tokenName, tokenSymbol, tokenPic, addressLength, tokenAmount, introduction, status, successful, fail, createTime
  } = requestparams;
  await mysqlConnect.query(`
    insert into airdrop (name, type, chainName, tokenAddress, tokenName, tokenSymbol, tokenPic, addressLength, tokenAmount, introduction, status, successful, fail)
    values ("${name}", ${type}, "${chainName}", "${tokenAddress}", "${tokenName}", "${tokenSymbol}", "${tokenPic}", ${addressLength}, ${tokenAmount}, "${introduction}", ${status}, ${successful}, ${fail});
  `, async (err, rows) => {
    // insertId
    for (let k in requestparams.tokenAddressArr) {
      await mysqlConnect.query(`
          insert into airdropAddress (airDropId, tokenAddress, amount, status, address)
          values ("${rows.insertId}", "${tokenAddress}", "${requestparams.tokenAmountArr[k]}", "0", "${requestparams.tokenAddressArr[k]}");
      `);
    }
  });


  res.json({
    code: 0,
    data: {},
    msg: 'success'
  })
});

router.get('/airDrop', async (req, res, next) => {
  mysqlConnect.connect();
  mysqlConnect.query(`
      select * from airdrop limit 10;
    `, async (err, rows) => {
    for (let k in rows) {
      const row = rows[k];
      try {
        // const ledgerInfo = await mortgagePoolContract.methods.getLedger(config[`${item[1]}Token`], config[`${item[0]}Token`], row.address).call();
      }catch (e) {
        console.log('err', e)
      }
    }
  });

  res.send('update ok');
});

module.exports = router;
