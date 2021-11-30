pragma solidity >=0.5.0;
import  "./Ownable.sol";

// Inherits from the Ownable contract for access control
contract Powerballer is Ownable {

  // Set the variables for the two participants
  address payable[] public players;

  // Manually Start the lottery
  function startLottery() public isOwner {
    // Owner the owner create start the lottery
    owner = msg.sender;
  }

  // Create a simple random number generator that picks a winner
  function randomGenerator() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
  }

  // Enable the participants to enter the lottery
  function enterLottery() public payable {
    // Make the ticket worth exactly 0.01 ETH
    require(msg.value == 0.01 ether, "Ticket price is exactly 0.01 ETH");
    // Prohibit the owner from particpating
    require(msg.sender != owner, "Owner is not allowed to participate");
    // If player has correct && isn't the owner then add to the players array
    players.push(msg.sender);
  }

  // Pick the lottery winner from the array
  function pickWinner() public isOwner {
    // randomGenerator() picks a number no larger than the players array.length
    uint index = randomGenerator() % players.length;
    // Take index value, get the player of that index in the array and transfer money
    players[index].transfer(address(this).balance);
    // Reset the list of players array
    players = new address payable [](0);
  }

  // Get the list of players from the lottery
  function getPlayers() public view returns (address payable[] memory) {
    return players;
  }

}
