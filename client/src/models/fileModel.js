// Import the ABI directly from the artifacts folder
import fileContractArtifact from '../../../artifacts/contracts/FileContract.sol/FileContract.json'; // Adjust path as needed

export class FileContract {
    constructor(web3object) {
        this.web3object = web3object;
        this.fileContractAbi = fileContractArtifact.abi; // Access the ABI from the JSON file
        this.deployedAddress = '';
        this.fileContract = null;
    }

    async initializeContract(deployedAddress) {
        this.deployedAddress = deployedAddress;
        this.fileContract = new this.web3object.eth.Contract(this.fileContractAbi, this.deployedAddress);
        console.log(this.fileContract);
    }

    async uploadFileFunction(fileHash, fileDescription, accountsForFee) {
        try {
            const result = await this.fileContract.methods.uploadFile(fileHash, fileDescription).send({
                from: accountsForFee,
                gas: 300000
            });
            console.log(result);
            console.log('File uploaded Successfully');
        } catch (e) {
            console.error('Error uploading file:', e);
        }
    }

    async getFileFunction(addressOwner, fileNumber) {
        try {
            const result = await this.fileContract.methods.getFile(addressOwner, fileNumber).call();
            console.log(result);
            return result;
        } catch (e) {
            console.error('Error retrieving file:', e);
            return '';
        }
    }
}
