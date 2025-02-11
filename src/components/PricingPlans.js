import React from 'react';
import './PricingPlans.css'; 
function PricingPlans() {
  const handleSubscribePremium = () => {
    // Redirect to Stripe checkout for Premium Plan
    window.location.href = 'https://buy.stripe.com/test_7sIaFR80Lfii62s4gi';
  };

  return (
    <div className="pricing-plans">
      <h1>Our Plans</h1>
      <p>Upgrade to our Premium Plan today!</p>

      <div className="plans">
        {/* Basic Plan */}
        <div className="plan basic-plan">
          <h2>Basic Plan</h2>
          <p>This plan includes:</p>
          <ul>
            <li>Access to free features</li>
            <li>Limited usage</li>
            <li>Community support</li>
          </ul>
          <button className="already-included" disabled>
            Included
          </button>
        </div>

        {/* Premium Plan */}
        <div className="plan premium-plan">
          <h2>Premium Plan</h2>
          <p>$50/month</p> {/* Added price */}
          <p>This plan includes:</p>
          <ul>
            <li>Access to all advanced features</li>
            <li>Unlimited usage</li>
            <li>Priority support</li>
          </ul>
          <button className="buy-now" onClick={handleSubscribePremium}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingPlans;
