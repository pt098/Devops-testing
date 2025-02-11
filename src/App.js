import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FeaturedArticles from './FeaturedArticles';
import FeaturedTutorials from './FeaturedTutorials';
import PostPage from './components/PostPage';
import FindQuestion from './components/FindQuestionPage';
import PricingPlans from './components/PricingPlans';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <FeaturedArticles />
              <FeaturedTutorials />
              <Footer />
            </>
          }
        />
        <Route
          path="/find-question"
          element={
            <div className="find-question-container">
              <FindQuestion />
              <div className="navigation-buttons">
                <Link to="/" className="home-button">Go to Home</Link>
                <Link to="/post" className="post-button">Go to Post Page</Link>
              </div>
            </div>
          }
        />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
