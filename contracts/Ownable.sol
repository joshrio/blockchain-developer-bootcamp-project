pragma solidity >=0.5.0;

contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
    require(msg.sender == owner, "Sorry, you are not the owner");
    _;
    }
}
