import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Relative Imports

const markdown = `

## Contract Logic

The design patterns of the project are as follows

1. Create two contracts called **Ownable** and **Powerballer**
2. The deployer of the contract is made the owner
3. Inherit the access control **isOwner** from **Ownable** into **Powerballer**
4. The **owner** of the lottery starts the lottery
5. Once the lottery is started then the players can buy tickets
6. The players must buy a ticket for exactly 0.01 ETH
7. If the players submit anything except 0.01 ETH then an error is thrown
8. If the owner tries to enter the lottery then they are prevented
9. If the player tries to pick winner then they are prevented
10. Once the owner wants to pick a winner they call **pickWinner()**
11. A simple randomGenerator creates a number
12. The contract then transfers the balance to the winner
13. The winner receives the balance
14. The contract then clears the array of players and a new game can begin
15. Repeat the game

`;

const Patterns = () => {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default Patterns;
