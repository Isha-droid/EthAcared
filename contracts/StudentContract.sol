// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import './FileContract.sol';
import './UserContract.sol';

contract StudentContract is UserContract {
    
    FileContract filecontract;
    
    constructor(address _fileaddress) {
        filecontract = FileContract(_fileaddress);
    }
    
    // Uncomment and implement this function if needed
    // function callgetFile(address _owneraddress) public view returns(string memory) {
    //     return filecontract.getFile(_owneraddress);
    // }
    
    // Additional logic for file count remaining under a student's ownership can go here
}
