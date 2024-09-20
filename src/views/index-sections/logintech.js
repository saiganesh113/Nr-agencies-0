import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Row,
  Card,
  CardBody,
  Form
} from 'reactstrap';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js"; 
import TransparentFooter from "components/Footers/TransparentFooter.js"; 

function LoginTech() {
  const navigate = useNavigate();

  // Hardcoded default credentials for technician login
  // const defaultEmail = 'sreeteq@gmail.com';
  // const defaultPassword = 'Sreeteq@1';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Hardcoded credentials for Super Admin
    const defaultEmail = 'sreeteq@gmail.com';
    const defaultPassword = 'Sreeteq@1';
  
    // Simple authentication with default credentials
    if (formData.email === defaultEmail && formData.password === defaultPassword) {
      // Store a simple logged-in flag in localStorage
      localStorage.setItem('isTechLoggedIn', true);
  
      // Redirect to Technician Dashboard on success
      navigate('/techdashboard');
    } else {
      setErrors('Invalid email or password');
    }
  };  
  return (
    <>
      <ExamplesNavbar />
      <div className="login-page">
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2019/05/15/10/16/air-conditioner-4204637_1280.jpg')",
            }}
          ></div>
          <Container>
            <Row className="justify-content-center">
              <Card className="card-login">
                <Form onSubmit={handleLogin}>
                  <CardBody>
                    <InputGroup className="no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        placeholder="Email..."
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </InputGroup>
                    <InputGroup className="no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        placeholder="Password..."
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </InputGroup>

                    {errors && <div className="text-danger text-center">{errors}</div>}

                    <div className="text-center">
                      <Button className="btn-neutral btn-round" color="info" size="lg" type="submit">
                        Login as Technician
                      </Button>
                    </div>
                  </CardBody>
                </Form>
              </Card>
            </Row>
          </Container>
        </div>
      </div>
      <TransparentFooter />
    </>
  );
}

export default LoginTech;
