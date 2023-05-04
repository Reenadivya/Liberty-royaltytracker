import React from "react";
import { Link } from "react-router-dom";
import "./LandingPageStyle.css";

function LandingPage() {
  return (
    <section id="landingpage__section">
      <div className="landingpage__section--container">
        <h1 className="landingpage__section--header">
          <span className="orange">Solana's Royalty Tracker Tool</span>
        </h1>
        <h2 className="landingpage__section--subheading">
          Made for creators, NFT enthusiasts and degens.
        </h2>
        <h3 className="landingpage__section--para">
          Check Royalty Rate Fulfillment for Various NFT Collections and
          Transactions.<br></br>Track The Latest NFT Sales Across All
          Marketplaces.
        </h3>
      </div>
      <div className="scroll">
        <button className="btn">
          <Link to="/royalty" className="scroll--heading">
            Start Your Search Now
          </Link>
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
