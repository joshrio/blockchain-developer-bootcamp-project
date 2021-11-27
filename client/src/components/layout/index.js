// Library Imports
import React from "react";

// Relative Imports
import { Container, Menu, Body, List, Item } from "./styles";

const Layout = ({ children, renderComponent }) => {
  return (
    <Container>
      <Menu>
        <List>
          <Item onClick={() => renderComponent("project")}>Project</Item>
          <Item onClick={() => renderComponent("readme")}>Readme</Item>
          <Item onClick={() => renderComponent("application")}>
            dApplication
          </Item>
          <Item onClick={() => renderComponent("walkthrough")}>
            Walkthrough
          </Item>
        </List>
      </Menu>
      <Body>{children}</Body>
    </Container>
  );
};

export default Layout;
