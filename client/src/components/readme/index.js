import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Relative Imports

const markdown = `

## Overview

Powerballer is a basic lottery contract that enables people to buy tickets in a lottery. There's two roles, one is a owner/admin and the other is a player. The tickets to the lottery cost 0.01 ETH and the admin randomly selects a winner and the funds are transferred to the winner.

## Frontend Project

The project has a basic directory structure of the following:

- [client](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/client)
- [contracts](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/contracts)
- [migrations](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/migrations)
- [tests](https://github.com/joshrio/blockchain-developer-bootcamp-project/tree/main/test)


The frontend project can be found in **/client** and requires the instructor to **npm install** and then **npm run start** to get the dApplication working.

If running the project via Ganache/Truffle then the instructor needs to run the **truffle develop** to enter the developer console then **compile** and **migrate** to get the local environment running.

## Public Ethereum address

- Ethereum Address for NFT certification: **0xe24a951c2bd93197bcBe03b6Fa5507C61946F4b0**
- [Etherscan link](https://etherscan.io/address/0xe24a951c2bd93197bcBe03b6Fa5507C61946F4b0)

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
