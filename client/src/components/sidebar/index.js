// Library Imports
import React, { useState } from "react";

// Relative Imports
import {
  Container,
  Button,
  EmptyState,
  Image,
  Description,
  Tabs,
  Tab,
  Overview,
  Row,
  Key,
  Value,
  Emoji,
} from "./styles";
import Connect from "../connect";
import metamask from "../../assets/metamask.svg";
import powerball from "../../assets/powerballer.svg";

// Assets for placeholder empty states
import isOwner from "../../assets/admin.svg";
import isPlayer from "../../assets/player.svg";
import isEmpty from "../../assets/empty.svg";

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

      return isEqual;
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
      return "No Admin";
    }
  };

  const formatBalance = () => {
    if (balance !== null) {
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

      {address !== null && (
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
          >
            Owner
          </Tab>
        </Tabs>
      )}

      {address === null && (
        <EmptyState>
          <Emoji>🦁</Emoji>
          <Description>
            To get started using Powerballer please connect your Metamask wallet
          </Description>
        </EmptyState>
      )}

      {address !== null && role === "player" && (
        <EmptyState>
          <Emoji>🎟</Emoji>
          <Description>To enter Powerballer please buy a ticket</Description>

          <Button disabled={checkOwner()} onClick={enterLottery}>
            Enter Lottery
          </Button>
        </EmptyState>
      )}

      {address !== null && role === "owner" && (
        <EmptyState>
          <Emoji>🧙</Emoji>
          <Description>
            To end the lottery click pick winner button and the funds will be
            distributed to the winner
          </Description>
          <Button disabled={!checkOwner()} onClick={pickWinner}>
            Pick Winner
          </Button>
        </EmptyState>
      )}
    </Container>
  );
};

export default Sidebar;
