import userContractJson from "../../../artifacts/contracts/UserContract.sol/UserContract.json"
export class UserContract {
    constructor(web3object) {
        this.web3object = web3object;
        this.userAbi = null;
        this.deployedAddress = '';
        this.userContract = null;
    }

    // Initialize the contract with the provided deployed address and ABI JSON
    async initializeContract(deployedAddress) {
        this.deployedAddress = deployedAddress;
        
        
        this.userAbi = userContractJson.abi;
        
        // Initialize the contract instance
        this.userContract = new this.web3object.eth.Contract(this.userAbi, this.deployedAddress);
        console.log('UserContract initialized:', this.userContract);
    }

    // Get the user's name from the smart contract
    async getuserDataNameFunction(userAddress) {
        try {
            const result = await this.userContract.methods.getuserDataName(userAddress).call();
            console.log('User data name:', result);
            return result;
        } catch (e) {
            console.error('Error retrieving user data name:', e);
            return null;
        }
    }

    // Create a new user in the smart contract
    async createUserFunction(schoolAddress, userAddress, userName, firstname, lastname, email, accountsForFee) {
        try {
            const result = await this.userContract.methods.createUser(schoolAddress, userAddress, userName, firstname, lastname, email)
                .send({ from: accountsForFee, gas: 300000 });
            console.log('User created successfully:', result);
            return 'User Successful';
        } catch (e) {
            console.error('Error creating user:', e);
            return 'User Already Existed';
        }
    }
}
