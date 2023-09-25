import React from "react";
import { useNavigate } from "react-router-dom";
import accountContext from "../context/accountContext";

//bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar(props) {
  const STAFF_TYPE = "STAFF";
  //const PATIENT_TYPE = "PATIENT";
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn, userType, setUserType, setUserId } =
    React.useContext(accountContext);

  const handleLogout = () => {
    setUserId("");
    setUserType("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Nav className="me-auto">
          {loggedIn ? (
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          ) : (
            <div></div>
          )}

          {userType === "PATIENT" && loggedIn ? (
            <LinkContainer to="/add-alert">
              <Nav.Link>Raise Alert</Nav.Link>
            </LinkContainer>
          ) : (
            <div></div>
          )}


          {userType === STAFF_TYPE && loggedIn ? (
            <LinkContainer to="/patients">
              <Nav.Link>Patients</Nav.Link>
            </LinkContainer>
          ) : (
            <div></div>
          )}

        </Nav>

        <Nav>

          {loggedIn ? (
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          ) : (
            <div></div>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
