// Library Imports
import React from "react";

// Relative Imports
import { Container, Brand, Project, Icon, Wallet } from "./styles";
import icon from "../../assets/powerballer.svg";

const Navigation = ({ connectWallet, label }) => {
  return (
    <Container>
      <Brand>
        <Icon src={icon} />
        <Project>POWERBALLER</Project>
      </Brand>
      <Wallet onClick={connectWallet}>{label}</Wallet>
    </Container>
  );
};

export default Navigation;
