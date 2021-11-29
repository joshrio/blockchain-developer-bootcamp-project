// Library Imports
import React from "react";
import Jdenticon from "react-jdenticon";

// Relative Imports
import { Container, Icon, Row, Player } from "./styles";

const Card = ({ player, reciept, confirmations }) => {
  return (
    <Container>
      <Row>
        <Icon>
          <Jdenticon size="64" value={player} />
        </Icon>
        <Player>{player}</Player>
      </Row>
      <p>{reciept}</p>
      {/*   <p>{confirmations}</p> */}
    </Container>
  );
};

export default Card;
