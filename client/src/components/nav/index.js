// Library Imports
import React from "react";

// Relative Imports
import { Container, Brand, Project, Icon, Wallet } from "./styles";
import icon from "../../assets/powerballer.svg";

const Navigation = ({ onClick, label }) => {
  return (
    <Container>
      <Brand>
        <Icon src={icon} />
        <Project>POWERBALLER</Project>
      </Brand>
    </Container>
  );
};

export default Navigation;
