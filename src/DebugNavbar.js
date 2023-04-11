import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const DebugNavbar = () => (
  <Navbar bg="warning">
    <Container>
      <Navbar.Brand>IO IO IO</Navbar.Brand>
      <Navbar.Text>Debug only navbar</Navbar.Text>
      <Navbar.Collapse>
        <Nav className="me-auto">
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/mechanic/home">
            <Nav.Link>Mechanic Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/client/order">
            <Nav.Link>Client Order</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>YES WE CAN</Navbar.Text>
    </Container>
  </Navbar>
);

export default DebugNavbar;