const Migrations = artifacts.require("Migrations");
const MyContract = artifacts.require("MyContract");
const MyNewContract = artifacts.require("MyNewContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MyContract);
  deployer.deploy(MyNewContract);
};
