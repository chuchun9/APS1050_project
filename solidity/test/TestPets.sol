pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Pets.sol";

contract TestPets {
    Pets pets = Pets(DeployedAddresses.Pets());
    address expectedAdopter = address(this);
    
    function testAddPet() public {
        uint age = 2;
        string memory name = "Tebby";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog1";
        string memory location = "Shanghai";
        Pets.Pet memory ret = pets.addPet(age, name, img_hash, breed, location);
        Assert.equal(ret.name, "Tebby", "The name should be the same as Tebby");
        Assert.equal(ret.adopter, address(0), "The adopter address should be empty");

    }

    function testGetPets() public {
        uint age = 2;
        string memory name = "Tebby";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog1";
        string memory location = "Shanghai";
        pets.addPet(age, name, img_hash, breed, location);

        Pets.Pet[] memory ret = pets.getPets();
        Assert.equal(ret[0].name, "Tebby", "The name should be the same as Tebby");
    }

    function testAdopt() public {
        uint age = 2;
        string memory name = "Tebby";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog1";
        string memory location = "Shanghai";
        pets.addPet(age, name, img_hash, breed, location);
        Pets.Pet[] memory ret = pets.getPets();
        Assert.equal(ret[0].adopter, address(0), "The adopter address should be empty");

        pets.adopt(ret[0].id);
        ret = pets.getPets();
        Assert.equal(ret[0].adopter, address(this), "The adopter address should be this contract");
    }

    function testRegister() public {
        bool check = pets.checkUser();
        Assert.equal(check, false, "The user should not be created yet");
        string memory username = "user1";
        string memory email = "123@gmail.com";
        Pets.User memory created_user = pets.registerUser(username, email);
        Assert.equal(created_user.username, username, "Username should be the same");
        Assert.equal(created_user.email, email, "Email should be the same");
        
        check = pets.checkUser();
        Assert.equal(check, true, "The user should be created");

    }

}