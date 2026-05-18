import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <h1>About Zenvo</h1>

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
              <td>Thiruvananthapuram, Kerala</td>
            </tr>

            <tr>
              <td>Phone</td>
              <td>+91 9876543210</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>zenvofurniture@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;