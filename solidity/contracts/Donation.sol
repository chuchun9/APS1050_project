pragma solidity ^0.8.0;

interface IPets {
    struct User {
        uint id;
        string username;
        string email;
        address account_number;
        uint[] liked;
        bool created;
    }
    function getUser(address useraddress) external view returns (User memory);
}


contract Donation {

    IPets petcontract;

    struct donation {
        string sender;
        uint value;
        uint timestamp;
    }
    uint totalDonations;
    address payable owner;

    donation[] donations;

    constructor(address pa) {
        owner = payable(msg.sender);
        petcontract = IPets(pa);

    }


    function donate() public payable {
        (bool success,) = owner.call{value: msg.value}("");
        addGiver();
        // IPets.User memory u = petcontract.getUser(msg.sender);
        // donation memory d = donation(u.username, msg.value, block.timestamp);
        // donations.push(d);
        require(success, "Failed to send money");
    }


    function getalldonations() public view returns (donation[] memory) {
        return donations;
    }

    function addGiver() internal {
        IPets.User memory u = petcontract.getUser(msg.sender);
        donation memory d = donation(u.username, msg.value, block.timestamp);
        donations.push(d);
    }






}