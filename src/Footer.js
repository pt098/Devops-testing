import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#01796F', color: '#fff', padding: '20px' }}>
      <section style={{ marginBottom: '20px' }}>
        <h4>SIGN UP FOR OUR DAILY INSIDER</h4>
        <input type="email" placeholder="Enter your email" style={{ padding: '8px' }} />
        <button style={{ padding: '8px 16px', marginLeft: '10px' }}>Subscribe</button>
      </section>

      <section style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <h4>Explore</h4>
          <ul>
            <li>Home</li>
            <li>Questions</li>
            <li>Articles</li>
            <li>Tutorials</li>
          </ul>
        </div>
        <div style={{ marginRight: '20px' }}>
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4>Stay connected</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </section>
      
      <section style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <span>DEV@Deakin 2024</span>
        <span>Privacy Policy</span>
        <span>Terms</span>
        <span>Code of Conduct</span>
      </section>
    </footer>
  );
}

export default Footer;
