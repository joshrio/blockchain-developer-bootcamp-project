import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Navigation from "./components/navigation/index.js";
import detectEthereumProvider from "@metamask/detect-provider";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors/connectors.js";

import "./App.css";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import Connect from "./components/connect/index.js";

import Input from "./components/input/index.js";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    storedValue: 0,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("ACCOUNTS", accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(instance);
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { accounts, contract, storageValue } = this.state;
    console.log("Accounts", accounts[0], "contract", contract.methods);

    // Stores a given value, 5 by default.
    await contract.methods.set(storageValue).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const { contract, account } = this.state;

    return (
      <>
        <Navigation onClick={this.connectWallet} />
        <Connect
          contractAddress={this.state.contract._address}
          contractABI={this.state.contract._jsonInterface}
        />
        <h2>My Contract</h2>
        <div>
          <Input
            name="storageValue"
            placeholder="Enter amount"
            value={this.state.storageValue}
            label="Enter value"
            type="number"
            onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}>Submit</button>
        </div>

        <div>The stored value is: {this.state.storageValue}</div>
        <div>User Address: {contract._address}</div>
        <div>Contact Accounts: {contract.account}</div>
      </>
    );
  }
}

export default App;
