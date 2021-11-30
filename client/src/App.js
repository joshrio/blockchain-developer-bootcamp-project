import React, { useState } from "react";
import { ethers } from "ethers";

import Navigation from "./components/nav/index.js";
import getEthers from "./getEthers";
import Connect from "./components/connect/index.js";

// Components
import Input from "./components/input";
import Layout from "./components/layout";
import ReactMarkdown from "react-markdown";
import ReadMe from "./components/readme";
import Card from "./components/card";
import Wallet from "./components/wallet";
import Sidebar from "./components/sidebar";
import Empty from "./components/empty";
import Video from "./components/video";

// Contracts
import Powerballer from "./contracts/Powerballer.json";

const App = () => {
  // FOR USER DETAILS & WALLET
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  // FOR CONTRACT
  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [currentContractABI, setCurrentAbiVal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [readOnlyContract, setReadOnlyContract] = useState(null);

  // FOR TRANSACTIONS
  const [ticketHash, setTicketHash] = useState(null);
  const [ticketConfirms, setTicketConfirms] = useState(null);

  // FOR LAYOUT
  const [currentItem, setCurrentItem] = useState("application");

  // FOR ROLES
  const [players, setPlayers] = useState([]);
  const [owner, setOwner] = useState(null);

  /////////////////////////////////////////////////////////////////////////
  //                              SETUP ETHERS
  /////////////////////////////////////////////////////////////////////////

  const setupEthers = async () => {
    const ethers = await getEthers();
    const networkId = await Powerballer.networks;

    const network = Object.keys(Powerballer.networks);
    const deployedContract = Powerballer.networks[network[0]].address;
    const deployedContractABI = Powerballer.abi;

    // Set state for Contract and ABI
    setCurrentContractVal(deployedContract);
    setCurrentAbiVal(deployedContractABI);
    setupReadOnlyContract();
  };

  /////////////////////////////////////////////////////////////////////////
  //                              CONNECT WALLET
  /////////////////////////////////////////////////////////////////////////

  const connectWalletHandler = () => {
    // 1. Check for MetaMask and & Ethereum
    if (window.ethereum && window.ethereum.isMetaMask) {
      // 2. If true, request accounts, show address & balance, then handle button state
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          getAccountBalance(result[0]);
          setConnButtonText("Wallet Connected");
        })
        // 3. Then set the provider  and the signer
        .then(() => {
          let provider = new ethers.providers.Web3Provider(window.ethereum);
          let signer = provider.getSigner();
          setSigner(signer);
          setProvider(provider);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  /////////////////////////////////////////////////////////////////////////
  //                              ACCOUNT CHANGE HANDLER
  /////////////////////////////////////////////////////////////////////////
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    updateEthers();
  };

  /////////////////////////////////////////////////////////////////////////
  //                              UPDATE ETHERS
  /////////////////////////////////////////////////////////////////////////

  const updateEthers = () => {
    const network = Object.keys(Powerballer.networks);

    // Set these else where and call from state
    let contractAddress = Powerballer.networks[network[0]].address;
    let contractABI = Powerballer.abi;

    let tempContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    setContract(tempContract);
  };

  /////////////////////////////////////////////////////////////////////////
  //                              GET ACCOUNT BALANCE
  /////////////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////////////
  //                              START LOTTERY
  /////////////////////////////////////////////////////////////////////////

  const startLottery = async () => {
    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      signer
    );

    const tx = await contract.startLottery();
    const receipt = await tx.wait();
    const { confirmations, transactionHash } = receipt;
  };

  /////////////////////////////////////////////////////////////////////////
  //                              PICK WINNER
  /////////////////////////////////////////////////////////////////////////

  const pickWinner = async () => {
    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      signer
    );

    const tx = await contract.pickWinner();
    const receipt = await tx.wait();
    const { confirmations, transactionHash } = receipt;

    console.log("Winner was picked");
  };

  /////////////////////////////////////////////////////////////////////////
  //                              READ ONLY CONTRACT
  /////////////////////////////////////////////////////////////////////////

  const setupReadOnlyContract = async () => {
    if (readOnlyContract === null) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let network = Object.keys(Powerballer.networks);

      // Set these else where and call from state
      let contractAddress = Powerballer.networks[network[0]].address;
      let contractABI = Powerballer.abi;

      let readOnly = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const players = await readOnly.getPlayers.call();
      const owner = await readOnly.owner.call();

      setOwner(owner);
      setPlayers(players);
      setReadOnlyContract(readOnly);
    }
  };

  /////////////////////////////////////////////////////////////////////////
  //                              ENTER LOTTERY
  /////////////////////////////////////////////////////////////////////////

  const enterLottery = async () => {
    let gas_limit = "0x100000";
    let gas_price = provider.getGasPrice();

    const contract = new ethers.Contract(
      currentContractVal,
      currentContractABI,
      signer
    );

    const tx = {
      from: defaultAccount,
      value: ethers.utils.parseEther("0.01"),
      nonce: provider.getTransactionCount(defaultAccount, "latest"),
      gasLimit: ethers.utils.hexlify(gas_limit), // 100000
      gasPrice: gas_price,
    };

    contract
      .enterLottery(tx)
      .then((transaction) => {
        const { confirmations, transactionHash } = transaction;
        setTicketHash(transactionHash);
        setTicketConfirms(confirmations);
      })
      .catch((e) => {
        switch (e.code) {
          case 4001:
            return console.log("4001: Rejected transation");
          case -32602:
            return console.log("-32602: Params are invalid");
          case -32603:
            return console.log("-32603: Oh shit, something went wrong");
            break;
          default:
        }
      });
  };

  /////////////////////////////////////////////////////////////////////////
  //                              CHAIN CHANGE HANDLER
  /////////////////////////////////////////////////////////////////////////
  const chainChangedHandler = async () => {
    // Reload the page on any change to avoid any errors with chain
    window.location.reload();
  };

  // Listen for account or chain changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  const renderComponent = (item) => {
    setCurrentItem(item);
  };

  const renderItems = () => {
    switch (currentItem) {
      case "project":
        return (
          <>
            <h1>Project</h1>
            <Video />
          </>
        );
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
            <h1>Powerballer Lottery</h1>
            {players.length === 0 ? (
              <Empty />
            ) : (
              players.map((p, i) => (
                <Card
                  key={i}
                  player={p}
                  reciept={ticketHash}
                  confirmations={ticketConfirms}
                />
              ))
            )}
          </>
        );
      case "walkthrough":
        return (
          <>
            <h1>Walkthrough</h1>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/aWuAgwsYNAA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </>
        );
        break;
      default:
    }
  };

  setupEthers();
  setupReadOnlyContract();

  /////////////////////////////////////////////////////////////////////////
  //                              CONSOLE.LOGS
  /////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Navigation connectWallet={connectWalletHandler} label={connButtonText} />
      <Layout
        renderComponent={renderComponent}
        address={defaultAccount}
        balance={userBalance}
        connect={connectWalletHandler}
        walletLabel={connButtonText}
        reciept={ticketHash}
        confirmations={ticketConfirms}
        pickWinner={pickWinner}
        startLottery={startLottery}
        owner={owner}
        enterLottery={enterLottery}
        signer={signer}
        players={players}
        currentItem={currentItem}
      >
        {renderItems()}
      </Layout>
    </>
  );
};

export default App;
