// Library Imports
import React from "react";

// Relative Imports
import { Container, Button, EmptyState, MetaMask, Description } from "./styles";
import Connect from "../connect";
import metamask from "../../assets/metamask-fox-wordmark-stacked.svg";

const Sidebar = ({
  connect,
  balance,
  address,
  walletLabel,
  pickWinner,
  owner,
  startLottery,
  enterLottery,
}) => {
  const formatAddress = () => {
    if (address !== null) {
      const firstFour = address.slice(0, 5);
      const lastFour = address.slice(38, 42);
      const formattedAddress = firstFour + "..." + lastFour;

      return formattedAddress;
    }
  };

  console.log(address);

  return (
    <Container>
      <>
        <h2>Enter Lottery</h2>
        <>
          {address !== null && (
            <>
              <p>{balance}</p>
              <p>{formatAddress()}</p>
            </>
          )}
        </>
      </>
      <EmptyState>
        <>
          <MetaMask src={metamask} />
          <Description>
            To get started using Powerballer please connect your Metamask wallet
          </Description>
        </>
      </EmptyState>
      <>
        {address === null && <Button onClick={connect}>{walletLabel}</Button>}
        {address !== null && address === owner && (
          <>
            <Button onClick={pickWinner}>Pick Winner</Button>
            <Button onClick={startLottery}>Start Lottery</Button>
          </>
        )}
        {address !== null && address !== owner && (
          <Button onClick={enterLottery}>Enter Lottery</Button>
        )}
      </>
    </Container>
  );
};

export default Sidebar;
