const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistry", function () {
  let landRegistry;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    landRegistry = await LandRegistry.deploy(); // Deploy the contract
    // ✅ Fix: no need for landRegistry.deployed(), await is enough above
  });

  it("should register land", async function () {
    await landRegistry.registerLand(1, "Kigali", 500, addr1.address);
    const land = await landRegistry.getLandDetails(1);
    expect(land.location).to.equal("Kigali");
    expect(land.size).to.equal(500);
    expect(land.owner).to.equal(addr1.address);
    expect(land.isRegistered).to.be.true;
  });

  
  it("should transfer ownership", async function () {
    await landRegistry.registerLand(1, "Kigali", 500, addr1.address);
    await landRegistry.transferLandOwnership(1, owner.address);
    const land = await landRegistry.getLandDetails(1);
    expect(land.owner).to.equal(owner.address);
  });
});
