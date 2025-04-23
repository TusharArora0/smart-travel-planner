import React, { useEffect, useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const officialContacts = {
    headquarters: {
      title: "Uttarakhand Tourism Head Office",
      address: "Uttarakhand Tourism Development Board, Pt. Deendayal Upadhaya Paryatan Bhawan, Near ONGC Helipad, Garhi Cantt, Dehradun, Uttarakhand - 248001",
      phone: "+91-135-2559898",
      email: "info@uttarakhandtourism.gov.in"
    },
    helplines: [
      {
        title: "Tourist Helpline",
        number: "1364",
        available: "24/7"
      },
      {
        title: "Emergency Helpline",
        number: "112",
        available: "24/7"
      }
    ]
  };

  const regionalOffices = [
    {
      region: "Garhwal Region",
      office: "Regional Tourist Office, Garhwal Mandal Vikas Nigam",
      address: "74/1 Rajpur Road, Dehradun - 248001",
      phone: "+91-135-2746817",
      email: "gmvn@gmvnl.in"
    },
    {
      region: "Kumaon Region",
      office: "Regional Tourist Office, Kumaon Mandal Vikas Nigam",
      address: "Oak Park House, Mallital, Nainital - 263001",
      phone: "+91-5942-236356",
      email: "kmvn@kmvn.in"
    }
  ];

  const importantLinks = [
    {
      title: "Official Tourism Website",
      url: "https://uttarakhandtourism.gov.in"
    },
    {
      title: "Online Booking Portal",
      url: "https://booking.uttarakhandtourism.gov.in"
    },
    {
      title: "Char Dham Registration",
      url: "https://badrinath-kedarnath.gov.in"
    },
    {
      title: "Adventure Tourism",
      url: "https://uttarakhandtourism.gov.in/adventure"
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with us or find official tourism information</p>
      </div>

      <div className="contact-content">
        <section className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
              <span className="btn-icon">→</span>
            </button>
          </form>
        </section>

        <section className="official-contacts">
          <h2>Official Tourism Contacts</h2>
          <div className="contact-card">
            <h3>{officialContacts.headquarters.title}</h3>
            <p><i className="location-icon">📍</i> {officialContacts.headquarters.address}</p>
            <p><i className="phone-icon">📞</i> {officialContacts.headquarters.phone}</p>
            <p><i className="email-icon">✉️</i> {officialContacts.headquarters.email}</p>
          </div>

          <div className="helplines-grid">
            {officialContacts.helplines.map((helpline, index) => (
              <div key={index} className="helpline-card">
                <h3>{helpline.title}</h3>
                <p className="helpline-number">{helpline.number}</p>
                <p className="availability">Available {helpline.available}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="regional-offices">
          <h2>Regional Tourism Offices</h2>
          <div className="offices-grid">
            {regionalOffices.map((office, index) => (
              <div key={index} className="office-card">
                <h3>{office.region}</h3>
                <h4>{office.office}</h4>
                <p><i className="location-icon">📍</i> {office.address}</p>
                <p><i className="phone-icon">📞</i> {office.phone}</p>
                <p><i className="email-icon">✉️</i> {office.email}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="important-links">
          <h2>Important Links</h2>
          <div className="links-grid">
            {importantLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                {link.title}
                <span className="link-icon">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 