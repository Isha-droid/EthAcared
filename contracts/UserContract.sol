// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract UserContract {

    struct User {
        address school;
        string name;
        string firstname;
        string lastname;
        string email;
        bool set; // This boolean is used to differentiate between unset and zero struct values
    }

    mapping(address => User) public users;

    function createUser(
        address _schoolAddress, 
        address _userAddress, 
        string memory _userName, 
        string memory _firstname, 
        string memory _lastname, 
        string memory _email
    ) public {
        User storage user = users[_userAddress];
        // Check that the user did not already exist:
        require(!user.set, "User already exists");
        // Store the user
        users[_userAddress] = User({
            school: _schoolAddress,
            name: _userName,
            firstname: _firstname,
            lastname: _lastname,
            email: _email,
            set: true
        });
    }

    function getuserDataName(address _userAddress) external view returns (string memory) {
        return users[_userAddress].name;
    }
}
