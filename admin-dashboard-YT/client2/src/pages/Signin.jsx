import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import "../App.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initValue = {
  email: "",
  password: "",
};

const Signin = () => {
  const [formData, setFormData] = useState(initValue);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      // Navigate to the desired page only if the user is authenticated
      navigate("/products");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    /** fetch API */
    const user = await fetch("http://localhost:3033/api/login/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (user.ok) {
      toast.success("🦄 Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const data = await user.json();
      console.log(data);
      localStorage.setItem("user", data.auth);
      navigate("/products");
    } else {
      toast.error("🚫 Login Failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div>
      <Container className=" mt-5 mb-5">
        <Row>
          <h1 className=" mb-4 text-center text-underline">Signin</h1>
          <Col className="offset-3 col-md-6 border border-white rounded p-5">
            <Form onSubmit={handleSubmit} className="text-left ">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Container className="text-center">
                <Button variant="primary" type="submit" disable={formData}>
                  Signin
                </Button>
              </Container>

              <div className="mt-4 text-left d-flex align-items-center gap-2">
                <h6 className="m-0">Create new account! Please </h6>

                <Nav.Link href="/signup" className="ml-2 custom-link">
                  Signup
                </Nav.Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
