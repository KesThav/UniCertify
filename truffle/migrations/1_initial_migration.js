const Migrations = artifacts.require("Migrations");
const Certificates = artifacts.require("MyCertificates");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Certificates);
};
