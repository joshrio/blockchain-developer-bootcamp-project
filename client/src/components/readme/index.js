import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Relative Imports

const markdown = `

## Overview

Powerballer is a basic lottery contract that enables people to buy tickets in a lottery. There's two roles, one is a owner/admin and the other is a player. The tickets to the lottery cost 0.01 ETH and the admin randomly selects a winner and the funds are transferred to the winner.

## Screencast

[Screencast Walktrough](https://www.youtube.com/watch?v=Kh0kivKQX6c)

## Frontend Code

The project has a basic directory structure of the following:

- [client](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/client)
- [contracts](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/contracts)
- [migrations](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/migrations)
- [requirements](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/requirements)
- [tests](https://github.com/joshrio/blockchain-developer-bootcamp-project/blob/main/test/powerballer.js)


The frontend project can be found in **/client** and requires the instructor to **npm install** and then **npm run start** to get the dApplication working.

If running the project via Ganache/Truffle then the instructor needs to run the **truffle develop** to enter the developer console then **compile** and **migrate** to get the local environment running. You can run **test** in the developer console to see the 5 unit tests for the contract.

## Frontend Application

The frontend code running at [consensys-bootcamp-project](https://consensys-bootcamp-project.herokuapp.com/) or on [localhost](http://localhost:3000/) has five main sections for ease of use.

- Screencast: A video walkthrough of the project
- Readme: This file that you're reading
- Powerballer: Final project submission
- Patterns: Design pattern descisions
- Common Attacks: SWC issues that are addressed

## Public Ethereum address

- Ethereum Address for NFT certification: **0xe24a951c2bd93197bcBe03b6Fa5507C61946F4b0**
- [Etherscan link](https://etherscan.io/address/0xe24a951c2bd93197bcBe03b6Fa5507C61946F4b0)

## Ropsten Deployed Contract

- Deployed Contract Address: **0x00e856a1154F09A9f219aA75bBBcfF0b467BB747**
- [Ropsten Explorer Contract Link](https://ropsten.etherscan.io/address/0x00e856a1154f09a9f219aa75bbbcff0b467bb747)


## Course Requirements

The project has a folder called **requirements** that hosts a number of documents as required by the submission details. This folder includes

- [design_pattern_decisions.md](https://github.com/joshrio/blockchain-developer-bootcamp-project/blob/main/requirements/design_pattern_decisions.md)
- [avoiding_common_attacks.md](https://github.com/joshrio/blockchain-developer-bootcamp-project/blob/main/requirements/avoiding_common_attacks.md)
- [deployed_address.txt](https://github.com/joshrio/blockchain-developer-bootcamp-project/blob/main/requirements/deployed_address.txt)

`;

const ReadMe = () => {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default ReadMe;
