import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion
} from "react-bootstrap";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRight
} from "react-icons/fa";

import styles from "./UserComponent/ContactUs.module.css";

const ContactUs = () => {
  return (
    /*<Container fluid>
    The fluid prop tells Bootstrap:
    "Take the full width of the screen."*/

    /*It uses Flexbox and means:
className="justify-content-center"
Center all columns horizontally inside the row.

Internally, Bootstrap applies something similar to:*/
    <Container fluid className={styles.contactPage}>

      {/* ================= HERO ================= */}
     
      <Row className="justify-content-center">

        <Col lg={6} className="text-center">

          <h1 className={styles.heading}>
            Contact Us
          </h1>

          <div className={styles.headingDivider}></div>

          <p className={styles.subHeading}>
            We'd love to hear from you. Whether you have a question regarding
            medicines, healthcare services, orders or appointments, our support
            team is always ready to help you.
          </p>

        </Col>

      </Row>

      {/* ================= MAIN SECTION ================= */}

      <Row className="justify-content-center mt-5 g-5">

        {/* ================= LEFT CARD ================= */}

        <Col lg={5}>

          <Card className={`${styles.infoCard} border-0 h-100`}>

            <Card.Body className="p-5">

              <h2 className="fw-bold mb-5">
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

              {/* ================= SOCIAL ================= */}

              <hr className="my-5" />

              <h5 className="fw-bold mb-4">
                Follow Us
              </h5>

              <div className={styles.socialIcons}>

                <div className={styles.socialCircle}>
                  <FaFacebookF />
                </div>

                <div className={styles.socialCircle}>
                  <FaInstagram />
                </div>

                <div className={styles.socialCircle}>
                  <FaLinkedinIn />
                </div>

                <div className={styles.socialCircle}>
                  <FaTwitter />
                </div>

              </div>

              {/* ================= STATS ================= */}

              <Row className="text-center mt-5">

                <Col>

                  <h3>15K+</h3>

                  <small>Happy Customers</small>

                </Col>

                <Col>

                  <h3>24/7</h3>

                  <small>Support</small>

                </Col>

                <Col>

                  <h3>200+</h3>

                  <small>Cities</small>

                </Col>

              </Row>

            </Card.Body>

          </Card>

        </Col>

        {/* ================= FORM ================= */}

        <Col lg={7}>

          <Card className={`${styles.formCard} border-0`}>

            <Card.Body className="p-3">

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
                        placeholder="Enter your full name"
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
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>Subject</Form.Label>

                  <Form.Control
                    type="text"
                    className={styles.customInput}
                    placeholder="Enter subject"
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>Message</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                    className={styles.customInput}
                    placeholder="Write your message..."
                  />

                </Form.Group>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                >
                  <FaEnvelope className="me-2" />

                  Send Message

                  <FaArrowRight className="ms-2" />

                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* ================= MAP ================= */}

      <Row className="justify-content-center mt-5">

        <Col lg={12}>

          <Card className={`${styles.mapCard} border-0`}>

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=New+Delhi&output=embed"
              width="100%"
              height="350"
              style={{
                border: 0,
                borderRadius: "20px"
              }}
              loading="lazy"
            />

          </Card>

        </Col>

      </Row>

      

    </Container>
  );
};

export default ContactUs;