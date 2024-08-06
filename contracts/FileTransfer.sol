// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract FileTransfer {

    address public owner = msg.sender;

    // Structure
    mapping(address => string) public ipfsInbox;

    // Events
    event ipfsSent(string _ipfsHash, address payable _address);
    event inboxResponse(string response);

    // Modifiers
    modifier notFull(string memory _string) {
        bytes memory stringTest = bytes(_string); 
        require(stringTest.length == 0, "Inbox is full"); 
        _;
    }

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    // An empty constructor that creates an instance of the contract
    constructor() {}

    // Takes in receiver's address and IPFS address. Places the IPFS address in the receiver's inbox
    function sendIPFS(address payable _address, string memory _ipfsHash) notFull(ipfsInbox[_address]) public {
        ipfsInbox[_address] = _ipfsHash;
        emit ipfsSent(_ipfsHash, _address);
    }

    // Check your inbox and empties it afterward
    function checkInbox() public restricted {
        string memory ipfs_hash = ipfsInbox[msg.sender];
        if (bytes(ipfs_hash).length == 0) {
            emit inboxResponse("Empty Inbox");
        } else {
            ipfsInbox[msg.sender] = "";
            emit inboxResponse(ipfs_hash);
        }
    }

    // Retrieves hash
    function getHash(address _address) public {
        string memory ipfs_hash = ipfsInbox[_address];
        emit inboxResponse(ipfs_hash);
    }
}
