var Web3 = require('web3');
const fs = require('fs');
var web3 = new Web3 ("HTTP://127.0.0.1:8545");
var file = fs.readFileSync('smart-contract.json')
var contractJSON =JSON.parse(file);

web3.eth.getAccounts().then(result => result[1]);