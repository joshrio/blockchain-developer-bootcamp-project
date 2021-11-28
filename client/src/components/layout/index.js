// Library Imports
import React from "react";

// Relative Imports
import { Container, Menu, Body, List, Item } from "./styles";
import Sidebar from "../sidebar";

const Layout = ({
  children,
  renderComponent,
  balance,
  address,
  connect,
  walletLabel,
  pickWinner,
  startLottery,
  enterLottery,
}) => {
  return (
    <Container>
      <Menu>
        <List>
          <Item onClick={() => renderComponent("project")}>Project</Item>
          <Item onClick={() => renderComponent("readme")}>Readme</Item>
          <Item onClick={() => renderComponent("application")}>
            Powerballer
          </Item>
          <Item onClick={() => renderComponent("walkthrough")}>
            Walkthrough
          </Item>
        </List>
      </Menu>
      <Body>{children}</Body>
      <Sidebar
        connect={connect}
        address={address}
        balance={balance}
        walletLabel={walletLabel}
        pickWinner={pickWinner}
        startLottery={startLottery}
        enterLottery={enterLottery}
      />
    </Container>
  );
};

export default Layout;
