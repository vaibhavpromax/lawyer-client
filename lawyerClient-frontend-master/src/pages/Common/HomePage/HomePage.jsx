import "./HomePage.scss";
import React from "react";

import PageContainer from "../../../components/PageContainer/PageContainer";
import Container from "../../../components/Container/Container";
import Title from "../../../components/Title/Title";
import Navbar from "../../../components/Navbar/Navbar";

export default function HomePage() {
  return (
    <PageContainer className={"homepage-container"}>
      <Container>
        <Navbar />
        <div className="first-section">
          <img
            src="https://www.theladders.com/wp-content/uploads/handshake_190617.jpg"
            alt=""
          />
          <div className="page-title">
            <Title size="5rem"> VAKALAT </Title>
          </div>
          <div className="tagline">
            <h1 className="tagline__text">
              Find the perfect Lawyer that suits your needs{" "}
            </h1>
            <h1 className="tagline__text">
              Find More clients and grow your practice{" "}
            </h1>
          </div>
        </div>
      </Container>
    </PageContainer>
  );
}
