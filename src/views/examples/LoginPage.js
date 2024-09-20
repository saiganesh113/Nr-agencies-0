import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

const API_BASE_URL = `https://nr-agencies-0-api.onrender.com/api/auth`; // Adjust as necessary

function LoginPage() {
  const [userId, setUserId] = useState(""); // User ID state
  const [password, setPassword] = useState(""); // Password state
  const [firstFocus, setFirstFocus] = useState(false); // Input focus states
  const [lastFocus, setLastFocus] = useState(false);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return () => {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Check if required fields are filled
    if (!userId || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // User login endpoint
      const endpoint = `${API_BASE_URL}/login-user`;

      // Payload for user login
      const payload = { userid: userId, password };

      // Make login request to backend
      const response = await axios.post(endpoint, payload);

      // console.log(response.data); // Log the response to inspect its structure

      // Extract token and ID from the response
      const { token, user } = response.data;
      const decodedToken = jwtDecode(token);
      const id = user?.userid || decodedToken.userId;

      if (token && id) {
        // Store token and ID in localStorage
        localStorage.setItem("user_token", token);
        localStorage.setItem("user_id", id);

        // Redirect to user dashboard
        navigate("/userdashboard");
      } else {
        setError("Invalid User ID or password. Please try again.");
      }
    } catch (error) {
      // Handle the login error
      console.error("Login error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2019/05/15/10/16/air-conditioner-4204637_1280.jpg')",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={handleLogin} className="form">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="Logo"
                        src={require("assets/img/now-logo.png")}
                      />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="User ID"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      />
                    </InputGroup>

                    {error && <div className="text-danger text-center">{error}</div>}
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                      type="submit"
                    >
                      Get Started
                    </Button>
                    <div className="text-center mt-3">
                      <a href="/signup-page" className="link">
                        Create Account
                      </a>
                    </div>
                    <div className="text-center mt-2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="link"
                      >
                        Need Help?
                      </a>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
