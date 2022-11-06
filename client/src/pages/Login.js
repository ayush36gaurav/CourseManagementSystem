import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../components/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../redux/userActions";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);
  return (
    <>
      <Navbar key="lg" bg="dark" variant="dark" expand={"md"} className="mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
           CMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                CMS
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="container item-center">
        <h1 className="text-center py-3">Login</h1>
        <hr className="opacity-100" />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginUser({ username, password }));
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-danger">
              {errors.username ? errors.username : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-danger">
              {errors.password ? errors.password : ""}
            </Form.Text>
          </Form.Group>

          <div className="container d-flex flex-column justify-content-center">
            <Form.Text className="text-danger pb-1 text-center">
              {errors.general ? errors.general : ""}
            </Form.Text>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Loading /> : "Login"}
            </Button>
            <p className="text-center">
              Don't have a account? Sign Up <Link to="/signup">here</Link>
            </p>
          </div>
          <hr className="opacity-100" />
        </Form>
      </div>
    </>
  );
}