// Library Imports
import React from "react";
import Jdenticon from "react-jdenticon";

// Relative Imports
import { Container, Icon } from "./styles";

const Card = ({ player, reciept, confirmations }) => {
  return (
    <Container>
      <Icon>
        <Jdenticon size="52" value={player} />
      </Icon>
      <p>{player}</p>
      <p>{reciept}</p>
      <p>{confirmations}</p>
    </Container>
  );
};

export default Card;
