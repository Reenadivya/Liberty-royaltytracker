import React from "react";
import LibertyLogo from "../../assets/libert-logo.svg";

function NftSaleCard() {
  return (
    <div className="nftsaledetails__subcontainer">
      <div className="nftimg__left-container">
        <div className="nft__image--wrapper">
          <img src={LibertyLogo} alt="" className="nft__image" />
        </div>
      </div>
      <div className="nftresult__right-container">
        <h3 className="nftresult__heading">Sale Amount: 45 SOL</h3>
        <h3 className="nftresult__heading">Seller: GHy278376JHGSJew879asJ</h3>
        <h3 className="nftresult__heading">Buyer: DfgYTus278y782hd897shgv8</h3>
        <h3 className="nftresult__heading">Marketplace Sold On: Magic Eden</h3>
        <h3 className="nftresult__heading">
          Mint Address: y00ts82387nd90uHSIJh
        </h3>
        <h3 className="nftresult__heading">Royalty Fee: 4.44 %</h3>
        <h3 className="nftresult__heading">Royalty Paid: NO</h3>
        <h3 className="nftresult__heading">
          Royalties were NOT paid to SMBhYe5hTjZB5ioeaFxnYPn2cDU893ymgMkgYipgJw4
        </h3>
      </div>
    </div>
  );
}

export default NftSaleCard;
