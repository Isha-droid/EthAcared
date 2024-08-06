// Replace require with import
import fs from "fs";
import hardhat from "hardhat";

async function main() {
  const addresses = {};

  // Deploy FileContract
  const FileContract = await hardhat.ethers.getContractFactory("FileContract");
  const fileContract = await FileContract.deploy();
  await fileContract.deployed();
  console.log("FileContract deployed to:", fileContract.address);
  addresses.FileContract = fileContract.address;

  // Deploy StudentContract with FileContract address
  const StudentContract = await hardhat.ethers.getContractFactory("StudentContract");
  const studentContract = await StudentContract.deploy(fileContract.address);
  await studentContract.deployed();
  console.log("StudentContract deployed to:", studentContract.address);
  addresses.StudentContract = studentContract.address;

  // Deploy UserContract
  const UserContract = await hardhat.ethers.getContractFactory("UserContract");
  const userContract = await UserContract.deploy();
  await userContract.deployed();
  console.log("UserContract deployed to:", userContract.address);
  addresses.UserContract = userContract.address;

  // Deploy SchoolContract with addresses of FileContract and StudentContract
  const SchoolContract = await hardhat.ethers.getContractFactory("SchoolContract");
  const schoolContract = await SchoolContract.deploy(fileContract.address, studentContract.address);
  await schoolContract.deployed();
  console.log("SchoolContract deployed to:", schoolContract.address);
  addresses.SchoolContract = schoolContract.address;

  // Deploy FileTransfer (if needed)
  const FileTransfer = await hardhat.ethers.getContractFactory("FileTransfer");
  const fileTransfer = await FileTransfer.deploy();
  await fileTransfer.deployed();
  console.log("FileTransfer deployed to:", fileTransfer.address);
  addresses.FileTransfer = fileTransfer.address;

  // Write all addresses to a JSON file
  fs.writeFileSync("deployedAddresses.json", JSON.stringify(addresses, null, 2));
  console.log("All contract addresses saved to deployedAddresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
