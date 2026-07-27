import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import styles from "./UserComponent/ContactUs.module.css";

const ContactUs = () => {
  return (
    <Container fluid className={styles.contactPage}>

      {/* Hero Section */}
      <Row className="mb-5">

        <Col className="text-center">

          <h1 className={styles.heading}>
            Contact Us
          </h1>

        </Col>

      </Row>

      {/* Main Content */}

      <Row className="justify-content-center g-4">

        {/* Left Side */}

        <Col lg={5}>

          <Card className={`${styles.infoCard} border-0 h-100`}>

            <Card.Body className="p-5">

              <h2 className="mb-5 fw-bold">
                Get in Touch
              </h2>

              <div className={styles.contactBox}>

                <div className={styles.iconCircle}>
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h5>Visit Us</h5>

                  <p>
                    123 Health Street
                    <br />
                    New Delhi, India
                  </p>

                </div>

              </div>

              <div className={styles.contactBox}>

                <div className={styles.iconCircle}>
                  <FaPhone />
                </div>

                <div>

                  <h5>Call Us</h5>

                  <p>+91 98765 43210</p>

                </div>

              </div>

              <div className={styles.contactBox}>

                <div className={styles.iconCircle}>
                  <FaEnvelope />
                </div>

                <div>

                  <h5>Email Us</h5>

                  <p>support@medicare.com</p>

                </div>

              </div>

              <div className={styles.contactBox}>

                <div className={styles.iconCircle}>
                  <FaClock />
                </div>

                <div>

                  <h5>Business Hours</h5>

                  <p>
                    Monday - Saturday
                    <br />
                    <strong>9:00 AM - 9:00 PM</strong>

                    <br />
                    <br />

                    Sunday
                    <br />
                    <strong>10:00 AM - 5:00 PM</strong>
                  </p>

                </div>

              </div>

            </Card.Body>

          </Card>

        </Col>

        {/* Right Side */}

        <Col lg={6}>

          <Card className={`${styles.formCard} border-0`}>

            <Card.Body className="p-5">

              <h2 className="fw-bold text-success mb-4">
                Send us a Message
              </h2>

              <Form>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-4">

                      <Form.Label>Full Name</Form.Label>

                      <Form.Control
                        type="text"
                        className={styles.customInput}
                        placeholder="Enter your name"
                        required
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-4">

                      <Form.Label>Phone Number</Form.Label>

                      <Form.Control
                        type="text"
                        className={styles.customInput}
                        placeholder="Enter phone number"
                        required
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Form.Group className="mb-4">

                  <Form.Label>Email Address</Form.Label>

                  <Form.Control
                    type="email"
                    className={styles.customInput}
                    placeholder="Enter your email"
                    required
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>Subject</Form.Label>

                  <Form.Control
                    type="text"
                    className={styles.customInput}
                    placeholder="Subject"
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>Message</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                    className={styles.customInput}
                    placeholder="Write your message..."
                    required
                  />

                </Form.Group>

                <Button
                  type="submit"
                  className={styles.submitBtn}
                >
                  <FaEnvelope className="me-2" />
                  Send Message
                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default ContactUs;