import '../styles/About.css';

function About() {
  const openGoogleMaps = () => {
    window.open("https://www.google.com/maps/place/10%C2%B008'14.3%22N+76%C2%B028'02.6%22E/@10.1372922,76.4648132,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.1372922!4d76.4673881?hl=en&entry=ttu", "_blank");
  };

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Zenvo</h1>
        <p className="subtitle">Premium furniture craftsmanship since establishment</p>
      </div>

      <div className="about-container">
        {/* Left Side - Info Cards */}
        <div className="about-info-cards">
          <div className="info-card">
            <div className="card-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <h3>Quality Assurance</h3>
            <p>We ensure every piece meets the highest standards of quality and durability.</p>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Timely Delivery</h3>
            <p>Fast and reliable delivery service across all locations.</p>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Dedicated customer support for all your queries and concerns.</p>
          </div>
        </div>

        {/* Right Side - Main Info Box */}
        <div className="about-box">
          <h2>Shop Information</h2>
          <table>
            <tbody>
              <tr>
                <td>Shop Name</td>
                <td>Zenvo Furniture</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>IVORY ASSOCIATES, BUILDING NO. 13/520 - B, VALLOM KODANAD ROAD, VALLOM, OKKAL P.O. - 683550, ERNAKULAM DIST.</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>+91 86065 11611</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>zenvofurniture@gmail.com</td>
              </tr>
              <tr>
                <td>GSTIN</td>
                <td>32AALFI6174Q1ZQ</td>
              </tr>
            </tbody>
          </table>

          {/* Business Hours */}
          <div className="business-hours">
            <h3>
              <i className="fas fa-business-time"></i>
              Business Hours
            </h3>
            <p>
              <span className="day">Monday - Friday:</span>
              <span className="time">9:00 AM - 7:00 PM</span>
            </p>
            <p>
              <span className="day">Saturday:</span>
              <span className="time">10:00 AM - 6:00 PM</span>
            </p>
            <p>
              <span className="day">Sunday:</span>
              <span className="time">Closed</span>
            </p>
          </div>
        </div>
      </div>

      {/* Map Section - Working Google Maps */}
      <div className="map-section">
        <h3>Visit Our Showroom</h3>
        <div className="map-container">
          {/* Embedded Google Map */}
          <iframe
            title="Zenvo Furniture Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5!2d76.4648132!3d10.1372922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0809e2f4b5e8f1%3A0x0!2zMTDCsDA4JzE0LjMiTiA3NsKwMjgnMDIuNiJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          {/* Clickable link below map */}
          <div className="map-link">
            <i className="fas fa-external-link-alt"></i>
            <a 
              href="https://www.google.com/maps/place/10%C2%B008'14.3%22N+76%C2%B028'02.6%22E/@10.1372922,76.4648132,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.1372922!4d76.4673881?hl=en&entry=ttu" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={openGoogleMaps}
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;