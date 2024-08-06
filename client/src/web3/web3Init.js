import Web3 from 'web3';

export class Web3Repo {
    constructor() {
        this.web3 = null;
        this.address = '';
    }

    // Load Web3 and set the current provider
    async loadWeb3() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error('User denied account access');
            }
        } else if (window.web3) {
            this.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    // Get the current provider
    getCurrentProvider() {
        return this.web3 ? this.web3.currentProvider : null;
    }

    // Get the address of the currently connected account
    async getAddressOfAccount() {
        if (this.web3) {
            const accounts = await this.web3.eth.getAccounts();
            this.address = accounts[0] || '';
            return this.address;
        } else {
            throw new Error('Web3 instance not initialized');
        }
    }
}
