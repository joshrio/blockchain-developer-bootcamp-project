// Library Imports
import React from "react";

// Relative Imports
import { Container, Placeholder, Description, Emoji, Button } from "./styles";
import logo from "../../assets/powerballer.svg";

// call start lottery function

const Empty = ({ owner, startLottery }) => {
  return (
    <Container>
      <Emoji>💸</Emoji>
      {owner === null ? (
        <>
          <Description>
            Welcome! So it appears that this lottery doesn't have an owner. To
            become the owner click on <strong>Start Lottery</strong>.
            <Button onClick={startLottery}>Start Lottery</Button>
          </Description>
        </>
      ) : (
        <>
          <Description>
            The Powerballer Lottery has begun but there are currently 0 players.
            If you're not the owner of the lottery then you can{" "}
            <strong>Connect a Wallet</strong> and buy a ticket.{" "}
          </Description>
        </>
      )}
    </Container>
  );
};

export default Empty;
