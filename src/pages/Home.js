import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome To Zenvo</h1>

          <h2>Premium Chair Collection</h2>

         <p>
  Discover premium executive chairs, ergonomic office chairs,
  visitor chairs and modern seating collections designed for
  comfort, style and durability.
</p>

       <button onClick={() => navigate('/products')}>
  Explore Products
</button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Ergonomic Design</h3>
<p>Comfortable chairs with modern ergonomic support.</p>
        </div>

        <div className="feature-card">
          <h3>Premium Seating</h3>
<p>High-quality executive and office chair collections.</p>
        </div>

        <div className="feature-card">
        <h3>Affordable Comfort</h3>
<p>Luxury seating solutions at competitive prices.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;