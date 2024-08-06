// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract FileContract {
    
    struct File {
        string hash;
        string description;
        address owner;
    }
    
    event FileCreated(
        uint fileCount,
        string hash,
        string description,
        address owner
    );
        
    mapping(address => uint) public fileCount;
    mapping(address => mapping(uint => File)) public files;
    
    // Function to upload a file
    function uploadFile(string memory _fileHash, string memory _description) public {
        require(bytes(_fileHash).length > 0, "File hash must not be empty");
        require(bytes(_description).length > 0, "Description must not be empty");
        require(msg.sender != address(0), "Uploader address must not be zero address");
        
        files[msg.sender][fileCount[msg.sender]++] = File(_fileHash, _description, msg.sender);
        
        emit FileCreated(fileCount[msg.sender], _fileHash, _description, msg.sender);
    }
    
    // Function to retrieve a file's hash
    function getFile(address _ownerAddress, uint _fileNumber) external view returns (string memory) {
        return files[_ownerAddress][_fileNumber].hash;
    }
}
