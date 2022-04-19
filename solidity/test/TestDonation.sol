pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Pets.sol";
import "../contracts/Donation.sol";


contract TestDonation {
    Donation donation = Donation(DeployedAddresses.Donation())

    address expectedAdopter = address(this);

    
}