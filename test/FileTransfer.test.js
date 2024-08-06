import { expect } from "chai";
import hardhat from "hardhat"
describe("FileTransfer", function () {
  let FileTransfer;
  let fileTransfer;
  let owner;
  let receiver;

  beforeEach(async function () {
    // Get the contract factory and signers
    FileTransfer = await hardhat.ethers.getContractFactory("FileTransfer");
    [owner, receiver] = await hardhat.ethers.getSigners();
    
    // Deploy the contract
    fileTransfer = await FileTransfer.deploy();
    await fileTransfer.deployed();
  });

  it("should allow a user to send an IPFS hash", async function () {
    const ipfsHash = "Qm12345";

    // Send IPFS hash to the receiver
    await fileTransfer.sendIPFS(receiver.address, ipfsHash);
    
    // Get the IPFS hash from the receiver's inbox
    const inboxHash = await fileTransfer.ipfsInbox(receiver.address);

    // Assert that the hash was correctly stored
    expect(inboxHash).to.equal(ipfsHash);
  });

  it("should emit an event when sending an IPFS hash", async function () {
    const ipfsHash = "Qm12345";

    // Send IPFS hash and check if the event was emitted
    await expect(fileTransfer.sendIPFS(receiver.address, ipfsHash))
      .to.emit(fileTransfer, "ipfsSent")
      .withArgs(ipfsHash, receiver.address);
  });

  it("should allow the owner to check their inbox", async function () {
    const ipfsHash = "Qm12345";
    
    // Send IPFS hash to the owner's inbox
    await fileTransfer.sendIPFS(owner.address, ipfsHash);

    // Check the inbox and assert the event was emitted with the correct args
    await expect(fileTransfer.checkInbox())
      .to.emit(fileTransfer, "inboxResponse")
      .withArgs(ipfsHash);
  });

  it("should revert when the inbox is already full", async function () {
    // Send an IPFS hash to the receiver
    await fileTransfer.sendIPFS(receiver.address, "Qm12345");

    // Try to send another IPFS hash to the same receiver and expect it to revert
    await expect(fileTransfer.sendIPFS(receiver.address, "Qm67890"))
      .to.be.revertedWith("Inbox is full");
  });
});
