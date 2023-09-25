import { useRef, useState, useEffect } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

//bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $userType: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      userType: $userType
    ) {
      _id
    }
  }
`;

export default function Register(props) {
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("PATIENT");
  const [register, setRegister] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [getUserByEmail, { loading, data }] = useLazyQuery(GET_USER_BY_EMAIL);
  const [addUser] = useMutation(ADD_USER, {
    variables: {
      name: name,
      email: email,
      password: password,
      userType: userType,
    },
  });
  function handleChange(e) {
    setRegister(false);
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "isStaff":
        if (e.target.checked) {
          setUserType("STAFF");
        } else {
          setUserType("PATIENT");
        }
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (loading) {
      setErrMsg("");
    } else if (data?.userByEmail?._id) {
      setErrMsg("Email is already registered.");
    } else if (register) {
      addUser()
        .then(() => {
          //handle ok
          navigate("/login");
          setRegister(false);
        })
        .catch((error) => {
          //handle error
          setErrMsg(error.message);
          setRegister(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  async function handleRegister(e) {
    e.preventDefault();
    setRegister(true);
    getUserByEmail({
      variables: {
        email: email,
      },
    });
  }

  return (
    <Container>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={name}
            name="name"
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Staff"
            name="isStaff"
            value={userType}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </Container>
  );
}
