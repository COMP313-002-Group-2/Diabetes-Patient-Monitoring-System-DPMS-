import { useRef, useState, useContext, useEffect } from "react";
import accountContext from "../context/accountContext";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

//bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      password
      userType
    }
  }
`;

export default function Login(props) {
  const { setLoggedIn, setUserType, setUserId } = useContext(accountContext);
  const navigate = useNavigate();

  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [logIn, setLogIn] = useState(false);

  const { loading, data } = useQuery(GET_USER_BY_EMAIL, {
    fetchPolicy: "network-only",
    skip: !logIn,
    variables: {
      email: email,
    },
  });

  function handleChange(e) {
    setLogIn(false);
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPwd(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    setLogIn(true);
  }

  useEffect(() => {
    if (logIn) {
      if (loading) {
        setErrMsg("Authenticating...");
      } else if (data?.userByEmail?.password) {
        if (data.userByEmail.password === password) {
          setLoggedIn(true);
          setUserType(data.userByEmail.userType);
          setUserId(data.userByEmail._id);
          navigate("/home");
        } else {
          setErrMsg("Incorrect username or password.");
          setLogIn(false);
        }
      } else if (logIn) {
        setErrMsg("Incorrect username or password.");
        setLogIn(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  return (
    <Container>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogin}>
          Log In
        </Button>
      </div>

      <div className="d-grid gap-2">
        <p>Don't have account?</p>
        <Button
          variant="outline-info"
          onClick={() => props.onFormSwitch("register")}
        >
          Create new Account
        </Button>
      </div>
    </Container>
  );
}
