require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

// let deployWallet = new HDWalletProvider({
//   mnemonic: {
//     phrase: process.env.MNEMONIC,
//   },
//   providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
// });

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    develop: {
      port: 8545,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC,
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
        });
      },
      gasPrice: 100000000000000000,
      network_id: 3,
    },
  },
  // compilers: {
  //   solc: {
  //     version: ">=0.5.0;",
  //   },
  // },
};
