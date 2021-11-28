// Library Imports
import React from "react";

// Relative Imports
import { Container, Brand, Project, Icon, Wallet } from "./styles";

const Navigation = ({ onClick }) => {
  return (
    <Container>
      <Brand>
        <Icon />
        <Project>DESCROW</Project>
      </Brand>
      <Wallet onClick={onClick}>Connect Wallet</Wallet>
    </Container>
  );
};

export default Navigation;
