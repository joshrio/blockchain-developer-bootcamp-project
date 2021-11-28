// Library Imports
import React from "react";

// Relative Imports
import { Container } from "./styles";

const Wallet = ({ address, balance }) => {
  return (
    <Container>
      <div>{address}</div>
      <div>{balance}</div>
    </Container>
  );
};

export default Wallet;
