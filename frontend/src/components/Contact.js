import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      submitted: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, message } = this.state;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        this.setState({ submitted: true });
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  }

  render() {
    const { name, email, message, submitted } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        {submitted ? (
          <div>
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={message}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactUs;
