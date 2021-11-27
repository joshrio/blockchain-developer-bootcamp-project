// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;
  string public storedText;

  // Set number
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  /* Set text */
 function setString(string memory y) public {
     storedText = y;
 }

 function getString() public view returns (string memory){
     return storedText;
 }

}
