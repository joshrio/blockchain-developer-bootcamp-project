pragma solidity >=0.5.0;

// Exportable contract for access control
contract Ownable {
    // Create a public variable called owner
    address public owner;

    // On intialization call the constructor
    constructor() public {
      /* Make the msg.sender the owner */
        owner = msg.sender;
    }

    // Create a modifier that sub contracts can call
    modifier isOwner() {
    // Require msg.sender to be the owner otherwise show error
    require(msg.sender == owner, "Sorry, you are not the owner");
    _;
    }
}
