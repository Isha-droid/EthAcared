import { expect } from "chai";
import hardhat from "hardhat";

describe("SchoolContract", function () {
  let SchoolContract;
  let schoolContract;
  let FileContract;
  let fileContract;
  let StudentContract;
  let studentContract;
  let fileContractAddress;
  let studentContractAddress;
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
    studentContractAddress = studentContract.address;

    // Deploy SchoolContract
    SchoolContract = await hardhat.ethers.getContractFactory("SchoolContract");
    schoolContract = await SchoolContract.deploy(fileContractAddress, studentContractAddress);
    await schoolContract.deployed();

    // Get signers
    [owner] = await hardhat.ethers.getSigners();
  });

  it("should deploy and set FileContract and StudentContract addresses correctly", async function () {
    expect(await schoolContract.filecontract()).to.equal(fileContractAddress);
    expect(await schoolContract.studentcontract()).to.equal(studentContractAddress);
  });

  it("should interact with FileContract", async function () {
    const fileHash = "Qm12345";
    await fileContract.sendIPFS(owner.address, fileHash);

    const storedHash = await fileContract.ipfsInbox(owner.address);
    expect(storedHash).to.equal(fileHash);
  });

  it("should interact with StudentContract", async function () {
    await studentContract.createUser(owner.address, owner.address, "JohnDoe", "John", "Doe", "john.doe@example.com");

    const userName = await studentContract.getuserDataName(owner.address);
    expect(userName).to.equal("JohnDoe");
  });
});
