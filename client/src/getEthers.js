import { ethers } from "ethers";

const getEthers = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const ether = new ethers.providers.Web3Provider(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();

          // Accounts now exposed
          resolve(ether);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new ethers.JsonRpcProvider.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const ether = new ethers(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(ether);
      }
    });
  });

export default getEthers;
