import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaPills, FaSpa, FaFlask, FaHeartbeat, FaBaby, FaDumbbell, FaStethoscope, FaSyringe } from "react-icons/fa";
import "../CategoryBar.css";
// import ItemList from './components/ItemList';
import ItemList from "./ItemList";

const CategoryBar = () => {
  return (
    <>
    <Navbar expand="lg" className="category-bar">
      <Container>
        <Nav className="mx-auto category-nav">
          <Nav.Link href="/medicine" style={{color:"black"}}>
            <FaPills /> Medicine
          </Nav.Link>
          <Nav.Link href="/wellness" style={{color:"black"}}>
            <FaSpa /> Wellness
          </Nav.Link>
          <Nav.Link href="/lab-tests" style={{color:"black"}}>
            <FaFlask /> Lab Tests
          </Nav.Link>
          <Nav.Link href="/beauty" style={{color:"black"}}>
            <FaHeartbeat /> Beauty
          </Nav.Link>
          <Nav.Link href="/mom-baby" style={{color:"black"}}>
            <FaBaby /> Mom & Baby
          </Nav.Link>
          <Nav.Link href="/fitness" style={{color:"black"}}>
            <FaDumbbell /> Fitness
          </Nav.Link>
          <Nav.Link href="/surgical" style={{color:"black"}}>
            <FaStethoscope /> Surgicals
          </Nav.Link>
          <Nav.Link href="/treatments" style={{color:"black"}}>
            <FaSyringe /> Treatments
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <ItemList />
    </>
  );
};

export default CategoryBar;
