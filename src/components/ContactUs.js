import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">📞 Contact Us</h2>
      
      <Row className="justify-content-center">
        {/* Contact Information */}
        <Col md={5}>
          <Card className="p-4 shadow">
            <h4>📍 Pharmacy Location</h4>
            <p><FaMapMarkerAlt /> 123, Health Street, Delhi, India</p>
            <p><FaPhone /> +91 98765 43210</p>
            <p><FaEnvelope /> support@medicare.com</p>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>📩 Send a Message</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Type your message..." required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Google Map */}
      <Row className="mt-5">
        <Col>
          <h4 className="text-center">📍 Find Us on Google Maps</h4>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed/v1/place?q=pharmacy&key=YOUR_GOOGLE_MAPS_API_KEY"
            width="100%"
            height="350"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
