pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Pets.sol";
import "../contracts/Donation.sol";

contract TestDonation {
    uint public initialBalance = 2 ether;

    Donation d_contract = Donation(DeployedAddresses.Donation());

    address payable expectedDonator = payable(address(this));

    function testDonationAndViewDonations() public {

        expectedDonator.call{value:initialBalance}("");
        
        Assert.equal(expectedDonator.balance, initialBalance, "Test Contract initalized with 2 ether");
        
        d_contract.donate{value:1 ether}();

        Donation.donation[] memory ret = d_contract.getalldonations();
        Assert.equal(ret.length, 1, "There should be 1 donation");
        Assert.equal(ret[0].value, 1 ether, "The donation value should be 1 ether");
    }

}



