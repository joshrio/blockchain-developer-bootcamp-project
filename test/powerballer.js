const Powerballer = artifacts.require("./Powerballer.sol");

contract("Powerballer", (accounts) => {
  let lottery;
  let amount = 10000000000000000; // 0.01 ETH

  ///////////////////////////////////////////////////////
  //                    TEST ONE
  ///////////////////////////////////////////////////////

  it("(1)...should start lottery from accounts[0]", async () => {
    const lottery = await Powerballer.deployed();
    await lottery.startLottery({ from: accounts[0] });
    const owner = await lottery.owner.call();
    assert.equal(owner, accounts[0], "The owner is the deployer");
  });

  ///////////////////////////////////////////////////////
  //                    TEST TWO
  ///////////////////////////////////////////////////////

  it("(2)...should sell one lottery ticket to accounts[1]", async () => {
    const lottery = await Powerballer.deployed();

    await lottery.enterLottery({
      from: accounts[1],
      value: amount,
    });

    const player = await lottery.getPlayers.call();
  });

  ///////////////////////////////////////////////////////
  //                    TEST THREE
  ///////////////////////////////////////////////////////

  it("(3)...should let multiple players enter the lottery", async () => {
    const lottery = await Powerballer.deployed();

    await lottery.enterLottery({
      from: accounts[1],
      value: amount,
    });

    await lottery.enterLottery({
      from: accounts[2],
      value: amount,
    });

    await lottery.enterLottery({
      from: accounts[3],
      value: amount,
    });

    const players = await lottery.getPlayers.call();
    assert.equal(
      players.length,
      4,
      "There should be 4 players in the Powerballer Lottery"
    );
  });

  ///////////////////////////////////////////////////////
  //                    TEST FOUR
  ///////////////////////////////////////////////////////

  it("(4)...should pick a winner and transfer balance", async () => {
    const lottery = await Powerballer.deployed();
    beforeWinnerIsPicker = await web3.eth.getBalance(lottery.address);
    await lottery.pickWinner();

    afterWinnerIsPicker = await web3.eth.getBalance(lottery.address);
    assert(
      beforeWinnerIsPicker !== afterWinnerIsPicker,
      "Balance should be different"
    );
  });

  ///////////////////////////////////////////////////////
  //                    TEST FIVE
  ///////////////////////////////////////////////////////

  it("(5)...prevent owner from entering lottery", async () => {
    const lottery = await Powerballer.deployed();
    owner = accounts[0];
    player = accounts[1];
    await lottery.enterLottery({ from: player, value: amount });

    assert(owner !== player);
  });
});
