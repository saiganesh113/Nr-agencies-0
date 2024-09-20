import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row
} from "reactstrap";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const [useridFocus, setuseridFocus] = useState(false);
  const [nameFocus, setnameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userid) newErrors.userid = "Userid is required.";
    if (!formData.name) newErrors.name = "Fullname is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Ensure the backend URL is correct and CORS is enabled on the backend
      const response = await axios.post("https://nr-agencies-0-api.onrender.com/api/auth/register-user", formData);
      // console.log(response.data);

      // On successful signup, navigate to login page
      navigate("/login-page");
    } catch (error) {
      console.error("Error during signup:", error.response?.data?.message || "Signup failed");
      setErrors({ submit: error.response?.data?.message || "Signup failed" });
    }
  };

  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form className="form" onSubmit={handleSubmit}>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Sign Up
                  </CardTitle>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  {/* User ID Field */}
                  <InputGroup className={"no-border" + (useridFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="userid"
                      placeholder="Userid..."
                      type="text"
                      onFocus={() => setuseridFocus(true)}
                      onBlur={() => setuseridFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.userid && <div className="text-danger">{errors.userid}</div>}
                  </InputGroup>
                  
                  {/* Full Name Field */}
                  <InputGroup className={"no-border" + (nameFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="name"
                      placeholder="Full Name..."
                      type="text"
                      onFocus={() => setnameFocus(true)}
                      onBlur={() => setnameFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                  </InputGroup>
                  
                  {/* Email Field */}
                  <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      placeholder="Email..."
                      type="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </InputGroup>

                  {/* Phone Number Field */}
                  <InputGroup className={"no-border" + (phoneFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons tech_mobile"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="phone"
                      placeholder="Phone Number..."
                      type="text"
                      onFocus={() => setPhoneFocus(true)}
                      onBlur={() => setPhoneFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                  </InputGroup>

                  {/* Password Field */}
                  <InputGroup className={"no-border" + (passwordFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons objects_key-25"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      placeholder="Password..."
                      type="password"
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </InputGroup>

                  {/* Confirm Password Field */}
                  <InputGroup className={"no-border" + (confirmPasswordFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password..."
                      type="password"
                      onFocus={() => setConfirmPasswordFocus(true)}
                      onBlur={() => setConfirmPasswordFocus(false)}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                  </InputGroup>

                  {/* Submit Error */}
                  {errors.submit && <div className="text-danger">{errors.submit}</div>}
                </CardBody>
                <CardFooter className="text-center">
                  <Button className="btn-fill" color="primary" type="submit">
                    Sign Up
                  </Button>
                  <Row className="text-center">
                  <Col>
                  <Link to="/login-page">Already have an account? Login</Link>
                  </Col>
                  </Row>
                </CardFooter>
              </Form>
            </Card>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
