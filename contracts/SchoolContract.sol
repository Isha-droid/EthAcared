// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import './FileContract.sol';
import './StudentContract.sol';

contract SchoolContract {
    
    FileContract filecontract;
    StudentContract studentcontract;
    
    constructor(address _filecontract, address _studentcontract) {
        filecontract = FileContract(_filecontract);
        studentcontract = StudentContract(_studentcontract);
    }
    
    // Additional functions and logic for SchoolContract can go here
}
