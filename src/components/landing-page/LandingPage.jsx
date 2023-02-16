import React from "react";
import "./LandingPageStyle.css";

function LandingPage() {
  return (
    <section id="landingpage__section">
      <div className="landingpage__section--container">
        <h1 className="landingpage__section--header">
          Solana's Royalty Tracker Tool
        </h1>
        <h2 className="landingpage__section--subheading">
          Made for creators, NFT enthusiasts and all NFT noobs.
        </h2>
        <h3 className="landingpage__section--para">
          Check Royalty Rate Fulfillment for Various NFT Collections and
          Transactions. Track the latest NFT sales across all marketplaces.
        </h3>
      </div>
      <div className="scroll">
        <p className="scroll--heading">Scroll Below To Start Searching</p>
      </div>
    </section>
  );
}

export default LandingPage;
