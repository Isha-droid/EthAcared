import { expect } from "chai";
import hardhat from "hardhat";

describe("StudentContract", function () {
  let StudentContract;
  let studentContract;
  let FileContract;
  let fileContract;
  let fileContractAddress;
  let owner;

  beforeEach(async function () {
    // Deploy FileContract
    FileContract = await hardhat.ethers.getContractFactory("FileContract");
    fileContract = await FileContract.deploy();
    await fileContract.deployed();
    fileContractAddress = fileContract.address;

    // Deploy StudentContract
    StudentContract = await hardhat.ethers.getContractFactory("StudentContract");
    studentContract = await StudentContract.deploy(fileContractAddress);
    await studentContract.deployed();

    // Get signers
    [owner] = await hardhat.ethers.getSigners();
  });

  it("should deploy and set fileContract address correctly", async function () {
    expect(await studentContract.filecontract()).to.equal(fileContractAddress);
  });

  it("should create a new user using inherited function", async function () {
    await studentContract.createUser(owner.address, owner.address, "JohnDoe", "John", "Doe", "john.doe@example.com");

    const userName = await studentContract.getuserDataName(owner.address);
    expect(userName).to.equal("JohnDoe");
  });

  it("should revert if trying to create a user that already exists", async function () {
    await studentContract.createUser(owner.address, owner.address, "JohnDoe", "John", "Doe", "john.doe@example.com");

    await expect(
      studentContract.createUser(owner.address, owner.address, "JaneDoe", "Jane", "Doe", "jane.doe@example.com")
    ).to.be.revertedWith("User already exists");
  });
});
