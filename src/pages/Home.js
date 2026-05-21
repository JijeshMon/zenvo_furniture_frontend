import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
// Import your specific chair image
import bg from '../assets/background/bg.png'; // Change to your image name

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home">
    <div className="hero-section" style={{
   minHeight: '90vh',
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  backgroundBlendMode: 'overlay',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  padding: '10px',
  position: 'relative',
  overflow: 'hidden'
}}>
        <div className="hero-content">
          <h1>Welcome To Zenvo</h1>
          <h2>Premium Chair Collection</h2>
          <p>
            Discover premium executive chairs, ergonomic office chairs,
            visitor chairs and modern seating collections designed for
            comfort, style and durability.
          </p>
          <button onClick={() => navigate('/products')}>
            Explore Products <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <i className="fas fa-chair"></i>
          <h3>Ergonomic Design</h3>
          <p>Comfortable chairs with modern ergonomic support for all-day productivity.</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-crown"></i>
          <h3>Premium Seating</h3>
          <p>High-quality executive and office chair collections with luxury materials.</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-tags"></i>
          <h3>Affordable Comfort</h3>
          <p>Luxury seating solutions at competitive prices for every budget.</p>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-smile"></i>
          </div>
          <span className="stat-number">5000+</span>
          <span className="stat-label">Happy Customers</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chair"></i>
          </div>
          <span className="stat-number">100+</span>
          <span className="stat-label">Chair Models</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-headset"></i>
          </div>
          <span className="stat-number">24/7</span>
          <span className="stat-label">Customer Support</span>
        </div>
      </div>
    </div>
  );
}

export default Home;