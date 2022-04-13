pragma solidity ^0.8.0;

contract Pets {
    struct Pet {
        uint id;
        string name;
        string img_hash;
        uint age;
        string breed;
        string location;
        address adopter;
    }

    struct User {
        uint id;
        string username;
        string email;
        address account_number;
        uint[] liked;
        bool created;
    }
    
    mapping(uint => Pet) allpets;
    mapping(address => User) allusers;

    uint pet_counter;
    uint user_counter;


    function checkUser() public view returns (bool) {
        User storage user = allusers[msg.sender];
        return user.created;
    }

    function registerUser(string memory username, string memory email) public returns (User memory) {
        User storage user = allusers[msg.sender];
        user.username = username;
        user.email = email;
        user.id = user_counter;
        user.account_number = msg.sender;
        user.created = true;
        user_counter = user_counter + 1;

        return user;
    }


    function getPets() public view returns (Pet[] memory) {
        Pet[] memory ret = new Pet[](pet_counter);
        for (uint i = 0; i < pet_counter; i++) {
            ret[i] = allpets[i];
        }
        return ret;
    }

    function addPet(uint age, string memory name, string memory img_hash, string memory breed, string memory location) public returns (Pet memory) {
        Pet storage p = allpets[pet_counter];
        p.id = pet_counter;
        p.name = name;
        p.img_hash = img_hash;
        p.age = age;
        p.breed = breed;
        p.location = location;
        p.adopter = address(0);
        pet_counter = pet_counter + 1;
        Pet memory ret = Pet(p.id, p.name, p.img_hash, p.age, p.breed, p.location, p.adopter);
        return ret;
    }

    function adopt(uint id) public returns (uint, address) {
        Pet storage p = allpets[id];
        p.adopter = msg.sender;
        return (p.id, p.adopter);
    }

}