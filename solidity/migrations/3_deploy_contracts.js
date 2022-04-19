var Pets = artifacts.require("Pets")

module.exports = function(deployer) {
  deployer.deploy(Pets)
  
};