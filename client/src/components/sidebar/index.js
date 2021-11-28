// Library Imports
import React from "react";

// Relative Imports
import { Container, Button } from "./styles";
import Connect from "../connect";

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

  return (
    <Container>
      <h2>Enter Lottery</h2>
      <p>{balance}</p>
      <p>{formatAddress()}</p>
      <Button onClick={connect}>{walletLabel}</Button>
      <Button onClick={pickWinner}>Pick Winner</Button>
      <Button onClick={startLottery}>Start Lottery</Button>
      <Button onClick={enterLottery}>Enter Lottery</Button>
    </Container>
  );
};

export default Sidebar;
