import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";

function Home() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", border: "white" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup></Signup>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default Home;
