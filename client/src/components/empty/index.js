// Library Imports
import React from "react";

// Relative Imports
import { Container, Placeholder, Description, Emoji } from "./styles";
import logo from "../../assets/powerballer.svg";

const Empty = () => {
  return (
    <Container>
      <Emoji>💸</Emoji>
      <Description>
        The Powerballer Lottery has begun but there are currently 0 players. If
        you're not the owner of the lottery then you can{" "}
        <strong>Connect a Wallet</strong> and buy a ticket.{" "}
      </Description>
    </Container>
  );
};

export default Empty;
