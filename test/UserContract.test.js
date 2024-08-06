import { expect } from "chai";
import hardhat from "hardhat";

describe("UserContract", function () {
  let UserContract;
  let userContract;
  let owner;
  let userAddress;
  let schoolAddress;

  beforeEach(async function () {
    UserContract = await hardhat.ethers.getContractFactory("UserContract");
    [owner, schoolAddress, userAddress] = await hardhat.ethers.getSigners();
    userContract = await UserContract.deploy();
    await userContract.deployed();
  });

  it("should create a new user", async function () {
    await userContract.createUser(schoolAddress.address, userAddress.address, "JohnDoe", "John", "Doe", "johndoe@example.com");
    const userName = await userContract.getuserDataName(userAddress.address);
    expect(userName).to.equal("JohnDoe");
  });

  it("should revert when trying to create a user that already exists", async function () {
    await userContract.createUser(schoolAddress.address, userAddress.address, "JohnDoe", "John", "Doe", "johndoe@example.com");
    await expect(userContract.createUser(schoolAddress.address, userAddress.address, "JaneDoe", "Jane", "Doe", "janedoe@example.com"))
      .to.be.revertedWith("User already exists");
  });
});
