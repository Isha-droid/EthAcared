import { expect } from "chai";
import hardhat from "hardhat"

describe("FileContract", function () {
  let FileContract;
  let fileContract;
  let owner;

  beforeEach(async function () {
    FileContract = await hardhat.ethers.getContractFactory("FileContract");
    [owner] = await hardhat.ethers.getSigners();
    fileContract = await FileContract.deploy();
    await fileContract.deployed();
  });

  it("should allow a user to upload a file", async function () {
    const fileHash = "Qm12345";
    const description = "Test file";

    await fileContract.uploadFile(fileHash, description);
    const fileCount = await fileContract.fileCount(owner.address);
    const file = await fileContract.getFile(owner.address, fileCount - 1);

    expect(file).to.equal(fileHash);
  });

  it("should revert when uploading a file with an empty hash", async function () {
    await expect(fileContract.uploadFile("", "Test description"))
      .to.be.revertedWith("File hash must not be empty");
  });

  it("should revert when uploading a file with an empty description", async function () {
    await expect(fileContract.uploadFile("Qm12345", ""))
      .to.be.revertedWith("Description must not be empty");
  });
});
