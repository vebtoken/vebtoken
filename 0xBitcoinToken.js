var _KiwiToken = artifacts.require("./_KiwiToken.sol");

var ethUtil =  require('ethereumjs-util');
var web3utils =  require('web3-utils');
var solidityHelper =  require('./solidity-helper');
var miningHelper =  require('./mining-helper');
var networkInterfaceHelper =  require('./network-interface-helper');

const Web3 = require('web3')
// Instantiate new web3 object pointing toward an Ethereum node.
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

contract('_KiwiToken', function(accounts) {

    it("can deploy ", async function () {

      console.log( 'deploying token' )
      var tokenContract = await _KiwiToken.deployed();

    }),

    it("can be minted", async function () {

      await printBalances(accounts)
      var tokenContract = await _KiwiToken.deployed();

      console.log('contract')
      console.log(tokenContract.address)

      var challenge_number = await tokenContract.getChallengeNumber.call( );
      challenge_number = '0x085078f6e3066836445e800334b4186d99567065512edfe78fa7a4f611d51c3d'

     var solution_number = 1185888746
     var solution_digest = '0x000016d56489592359ce8e8b61ec335aeb7b7dd5695da22e25ab2039e02c8976'
     var from_address = '0x2B63dB710e35b0C4261b1Aa4fAe441276bfeb971';
     var targetString = await tokenContract.getMiningTarget.call({from: from_address});
     var target = web3utils.toBN(targetString);

     console.log('target',target)

     const phraseDigest = web3utils.soliditySha3(challenge_number, from_address, solution_number )

     console.log('phraseDigest', phraseDigest);  // 0x0007e4c9ad0890ee34f6d98852d24ce6e9cc6ecfad8f2bd39b7c87b05e8e050b
     console.log(solution_digest);
     console.log(solution_number)

     var checkDigest = await tokenContract.getMintDigest.call(solution_number,phraseDigest,challenge_number, {from: from_address});

     console.log('checkDigest',checkDigest)
     console.log('target',target)
     console.log('challenge_number',challenge_number)

   });

   it("can be mined", async function () {

     await printBalances(accounts)
     var tokenContract = await _0xBitcoinToken.deployed();

     console.log('contract')
     console.log(tokenContract.address)

     var test_account= {
      'address': '0x087964cd8b33ea47c01fbe48b70113ce93481e01',
      'privateKey': 'dca672104f895219692175d87b04483d31f53af8caad1d7348d269b35e21c3df'
    }

    networkInterfaceHelper.init(web3,tokenContract,test_account);
    miningHelper.init(web3,tokenContract,test_account,networkInterfaceHelper);

  });

});


async function printBalances(accounts) {

  var balance_val = await (web3.eth.getBalance(accounts[0]));
  console.log('acct 0 balance', web3utils.fromWei(balance_val.toString() , 'ether') )
}
