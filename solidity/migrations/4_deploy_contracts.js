var Donation = artifacts.require("Donation");
var Pets = artifacts.require("Pets")


module.exports = function(deployer) {
    deployer.deploy(Donation, Pets.address)
  
};