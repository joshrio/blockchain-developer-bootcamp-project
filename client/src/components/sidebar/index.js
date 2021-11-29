// Library Imports
import React, { useState } from "react";

// Relative Imports
import {
  Container,
  Button,
  EmptyState,
  MetaMask,
  Description,
  Tabs,
  Tab,
  Overview,
  Row,
  Key,
  Value,
} from "./styles";
import Connect from "../connect";
import metamask from "../../assets/metamask.svg";

const Sidebar = ({
  balance,
  address,
  walletLabel,
  pickWinner,
  owner,
  startLottery,
  enterLottery,
  signer,
  players,
}) => {
  const [role, setRole] = useState("player");
  const [admin, setOwner] = useState(null);
  const [disabled, setDisable] = useState(true);
  const [newSigner, setSigner] = useState("");

  const checkOwner = () => {
    if (signer !== null && owner !== null) {
      const isSigner = signer.provider.provider.selectedAddress;
      const isOwner = owner.toLowerCase();
      const isEqual = isSigner === isOwner;

      return isEqual && players.length > 0 ? (
        <Button disabled onClick={pickWinner}>
          Pick Winner
        </Button>
      ) : (
        <Button disabled onClick={startLottery}>
          Start Lottery
        </Button>
      );
    }
  };

  const formatPlayer = () => {
    if (signer !== null) {
      const extractedAddress = signer.provider.provider.selectedAddress;
      const firstFour = extractedAddress.slice(0, 5);
      const lastFour = extractedAddress.slice(38, 42);
      const formattedPlayer = firstFour + "..." + lastFour;

      return formattedPlayer;
    } else {
      return "Wallet not connected";
    }
  };

  const formatOwner = () => {
    if (owner !== null) {
      const firstFour = owner.slice(0, 5);
      const lastFour = owner.slice(38, 42);
      const formattedOwner = firstFour + "..." + lastFour;

      return formattedOwner.toLowerCase();
    } else {
      return "Lottery hasn't started";
    }
  };

  const formatBalance = () => {
    if (balance !== null) {
      // console.log(typeof balance.toNumber());
      const toNumber = parseFloat(balance);
      const rounded = toNumber.toFixed(4);
      return rounded;
    } else {
      return "Wallet not connected";
    }
  };

  return (
    <Container>
      <>
        <h2>Enter Lottery</h2>
        <Overview>
          <Row>
            <Key>Admin Address:</Key> <Value>{formatOwner()}</Value>
          </Row>
          <Row>
            <Key>Your Balance:</Key> <Value>{formatBalance()}</Value>
          </Row>

          <Row>
            <Key>Your Address:</Key> <Value>{formatPlayer()}</Value>
          </Row>
        </Overview>
      </>
      <Tabs>
        <Tab
          isActive={role === "player" ? true : false}
          onClick={() => setRole("player")}
          disabled={false}
        >
          Player
        </Tab>
        <Tab
          isActive={role === "owner" ? true : false}
          onClick={() => setRole("owner")}
          disabled={!checkOwner()}
        >
          Owner
        </Tab>
      </Tabs>
      {address === null && (
        <EmptyState>
          <>
            <MetaMask src={metamask} />
            <Description>
              To get started using Powerballer please connect your Metamask
              wallet
            </Description>
          </>
        </EmptyState>
      )}
      {role === "player" ? (
        <Button
          disabled={signer === null ? true : false}
          onClick={enterLottery}
        >
          Enter Lottery
        </Button>
      ) : (
        <>
          {players.length > 0 ? (
            <Button onClick={pickWinner}>Pick Winner</Button>
          ) : (
            <Button onClick={startLottery}>Start Lottery</Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Sidebar;
