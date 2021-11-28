import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Navigation from "./components/nav/index.js";

import getEthers from "./getEthers";
import Connect from "./components/connect/index.js";

import Input from "./components/input/index.js";
import Layout from "./components/layout/index.js";
import ReactMarkdown from "react-markdown";
import ReadMe from "./components/readme/index.js";

const App = () => {
  // FOR USER DETAILS & WALLET
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  // FOR TEXT
  const [storedText, setStoredText] = useState("");
  const [storedChainText, setStoredChainText] = useState("");

  // FOR NUMBER
  const [storageValue, setStorageValue] = useState("");
  const [storedChainValue, setStoredChainValue] = useState("");

  // FOR CONTRACT
  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [currentContractABI, setCurrentAbiVal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  // FOR TRANSACTIONS
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionConfirms, setTransactionConfirms] = useState(null);

  // FOR LAYOUT
  const [currentItem, setCurrentItem] = useState("project");

  const setupEthers = async () => {
    // Ethers
    // This gets all the main values required to interact with the contracts
    const ethers = await getEthers();
    const networkId = await SimpleStorageContract.networks;

    // // NOTE: Need to figure out how to get 5777 automatically
    const network = Object.keys(SimpleStorageContract.networks);
    const deployedContract = SimpleStorageContract.networks[network[0]].address;
    const deployedContractABI = SimpleStorageContract.abi;

    // Set the basic values
    setCurrentContractVal(deployedContract);
    setCurrentAbiVal(deployedContractABI);
  };

  const connectWalletHandler = () => {
    // 1. Check for MetaMask and & Ethereum
    if (window.ethereum && window.ethereum.isMetaMask) {
      // 2. If true, request accounts, show address & balance, then handle button state
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        // 3. Then set the provider  and the signer
        .then(() => {
          let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
          let tempSigner = tempProvider.getSigner();
          setSigner(tempSigner);
          setProvider(tempProvider);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
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
    // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // setProvider(tempProvider);

    // let tempSigner = provider.getSigner();
    // setSigner(tempSigner);

    const network = Object.keys(SimpleStorageContract.networks);

    // Set these else where and call from state
    let contractAddress = SimpleStorageContract.networks[network[0]].address;
    let contractABI = SimpleStorageContract.abi;

    let tempContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
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
    // reload the page to avoid any errors with chain
    // change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  const handleChange = (e) => {
    setStorageValue(e.target.value);
    setStoredText(e.target.value);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  // TEXT SETTER
  const textSetter = async (event) => {
    console.log("signer", signer);
    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      signer
    );
    const tx = await contract.setString(storedText);
    const receipt = await tx.wait();
  };

  // TEXT GETTER
  const textGetter = async () => {
    console.log("signer", signer);

    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      provider
    );
    const text = await contract.getString();
    setStoredChainText(text);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  // Number function
  const handleSetter = async () => {
    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      signer
    );
    const tx = await contract.set(storageValue);
    const receipt = await tx.wait();

    const { confirmations, transactionHash } = receipt;

    setTransactionConfirms(confirmations);
    setTransactionHash(transactionHash);
  };

  const handleGetter = async () => {
    // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // setProvider(tempProvider);

    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      provider
    );
    const value = await contract.get();
    const formatValue = await value.toString();

    setStoredChainValue(formatValue);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const renderComponent = (item) => {
    setCurrentItem(item);
  };

  const renderThing = () => {
    switch (currentItem) {
      case "project":
        return <h1>Project</h1>;
      case "readme":
        return (
          <>
            <h1>Readme</h1>
            <ReadMe />
          </>
        );
      case "application":
        return (
          <>
            <h1>Application</h1>
            <div>
              <>
                <Input
                  name="storageValue"
                  placeholder="Enter amount"
                  label="Enter value"
                  type="number"
                  onChange={(e) => setStorageValue(e.target.value)}
                  value={storageValue}
                />
                <Input
                  name="storedText"
                  placeholder="Enter text"
                  label="Enter text"
                  type="text"
                  onChange={(e) => setStoredText(e.target.value)}
                  value={storedText}
                />
                {signer === null ? (
                  <div>Please connect a wallet</div>
                ) : (
                  <div>
                    <>
                      <button onClick={handleGetter}>Get Number</button>
                      <button onClick={handleSetter}>Set Number</button>
                    </>
                    <>
                      <button onClick={textGetter}>Get Text</button>
                      <button onClick={textSetter}>Set Text</button>
                    </>
                  </div>
                )}
              </>
              {transactionHash === null ? (
                <div />
              ) : (
                <>
                  <div>Transaction Hash: {transactionHash}</div>
                  <div>Transaction confirmations: {transactionConfirms}</div>
                </>
              )}

              <div>
                <br />
                <div>
                  <h3>Address: {defaultAccount}</h3>
                </div>
                <div>
                  <h3>Balance: {userBalance}</h3>
                </div>
              </div>
              <div>The state value is: {storageValue}</div>
              <div>The chain value is: {storedChainValue}</div>
              <br />
              <br />
              <div>The state text is: {storedText}</div>
              <div>The chain text is: {storedChainText}</div>
            </div>
          </>
        );
      case "walkthrough":
        return <h1>Walkthrough</h1>;
        break;
      default:
    }
  };

  setupEthers();

  return (
    <>
      <Navigation onClick={connectWalletHandler} label={connButtonText} />
      <Layout renderComponent={renderComponent}>{renderThing()}</Layout>
    </>
  );
};

export default App;
