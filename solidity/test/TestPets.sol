pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Pets.sol";

contract TestPets {
    Pets pets = Pets(DeployedAddresses.Pets());
    address expectedAdopter = address(this);
    
    function testAddPet() public {
        int age = 2;
        string memory name = "Tebby";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog1";
        string memory location = "Shanghai";
        Pets.Pet memory ret = pets.addPet(age, name, img_hash, breed, location);
        Assert.equal(ret.name, "Tebby", "The name should be the same as Tebby");
        Assert.equal(ret.adopter, address(0), "The adopter address should be empty");

    }

    function testGetPets() public {
        // uint age = 2;
        // string memory name = "Tebby";
        // string memory img_hash = "asdasndosandoias";
        // string memory breed = "Dog1";
        // string memory location = "Shanghai";
        // pets.addPet(age, name, img_hash, breed, location);
        Pets.Pet[] memory ret = pets.getPets();
        Assert.equal(ret[0].name, "Tebby", "The name should be the same as Tebby");
    }

    function testAdopt() public {
        // uint age = 2;
        // string memory name = "Tebby";
        // string memory img_hash = "asdasndosandoias";
        // string memory breed = "Dog1";
        // string memory location = "Shanghai";
        // pets.addPet(age, name, img_hash, breed, location);
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


    function testLikeAndDislike() public {
        Pets.Pet[] memory ret = pets.getPets();
        Pets.User memory created_user = pets.getUser(address(this));
        (uint[] memory userliked, uint[] memory petlikes) = pets.likePet(ret[0].id);
        
        Assert.equal(userliked[0], ret[0].id, "petId should be the same");
        Assert.equal(petlikes[0], created_user.id, "userId should be the same");


        (uint[] memory newuserliked, uint[] memory newpetlikes) = pets.dislikePet(userliked[0]);

        Assert.equal(newuserliked.length, 0, "userliked should be empty");
        Assert.equal(newpetlikes.length, 0, "petlikes should be empty");

    }

    function testGetSelectedPets1() public {
        int age = 1;
        string memory name = "Tebby2";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog2";
        string memory location = "Shanghai";
        pets.addPet(age, name, img_hash, breed, location);


        age = 3;
        name = "Tebby3";
        img_hash = "asdasndosandoias";
        breed = "Dog2";
        location = "Shanghai";
        pets.addPet(age, name, img_hash, breed, location);


        Pets.Pet[] memory ret = pets.getSelectedPets("Dog2", -1);

        Assert.equal(ret.length, 2, "the returned array should have two pets");
        Assert.equal(ret[0].breed, "Dog2", "The breed of either one should be Dog2");
        Assert.equal(ret[1].breed, "Dog2", "The breed of either one should be Dog2");



    }

    function testGetSelectedPets2() public {
        int age = 2;
        string memory name = "Tebby4";
        string memory img_hash = "asdasndosandoias";
        string memory breed = "Dog3";
        string memory location = "Shanghai";
        pets.addPet(age, name, img_hash, breed, location);


        Pets.Pet[] memory ret = pets.getSelectedPets("", 2);

        Assert.equal(ret.length, 2, "the returned array should have two pets");
        Assert.equal(ret[0].age, 2, "The age of either one should be 2");
        Assert.equal(ret[1].age, 2, "The age of either one should be 2");


    }

    function testGetSelectedPets3() public {
        Pets.Pet[] memory ret = pets.getSelectedPets("Dog1", 2);

        Assert.equal(ret.length, 1, "the returned array should have 1 pet");
        Assert.equal(ret[0].age, 2, "The age should be 2");
        Assert.equal(ret[0].breed, "Dog1", "The breed should be Dog1");
        Assert.equal(ret[0].name, "Tebby", "The name should be Tebby1");


    }

}