const CryptoCoders = artifacts.require("./CryptoCoders.sol");

contract("CryptoCoders", accounts => {
  let contract;

  before(async () => {
    contract = await CryptoCoders.deployed();
  });

  it("... get deployed", async () => {
    assert.notEqual(contract, "");
  });

  it("... get minted and added", async () => {
    const coderNick = "brunodemasi";
    await contract.mint(coderNick);

    let coder = await contract.coders(0);
  
    assert(coder, coderNick);
  });
});
