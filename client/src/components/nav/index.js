// Library Imports
import React from "react";

// Relative Imports
import { Container, Brand, Project, Icon, Wallet } from "./styles";

const Navigation = ({ onClick, label }) => {
  return (
    <Container>
      <Brand>
        <Icon />
        <Project>Project</Project>
      </Brand>
    </Container>
  );
};

export default Navigation;
