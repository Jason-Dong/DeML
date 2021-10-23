const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Contract = await ethers.getContractFactory("DeML");
    const contract = await Contract.deploy("https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf", 500, 1000000, 10000000000);
    await contract.deployed();

    expect(await contract.dataset_link()).to.equal("test-link");
    const competitionEnd = await contract.competition_time();
    console.log(competitionEnd);
    const registrationEnd = await contract.registration_time();
    expect(competitionEnd - registrationEnd).to.equal(1000000);


    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
