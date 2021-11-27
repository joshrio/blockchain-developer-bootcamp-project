// Library Imports
// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, { useState } from "react";
import { ethers } from "ethers";

// Relative Imports
import { Container } from "./styles";

const Connect = ({ contractAddress, contractABI }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  // Tut 2
  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    updateEthers();
  };

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      contractABI,
      tempSigner
    );
    setContract(tempContract);
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = async () => {
    // console.log("ETHERS OBJECT", ethers);
    // const networkId = await ethers.eth.net.getId();
    // console.log("networkId", networkId);
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  // console.log("ETHERS CONTRACT", contract);
  // console.log("ETHERS OBJECT", ethers);
  // console.log("PROPS", ab_Contract._jsonInterface);

  return (
    <Container>
      <div>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div>
        <h3>Balance: {userBalance}</h3>
      </div>

      <button onClick={connectWalletHandler}>{connButtonText}</button>
    </Container>
  );
};

export default Connect;
