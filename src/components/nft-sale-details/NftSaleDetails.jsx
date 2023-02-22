import React, { useState, useEffect, useRef } from "react";
import "./NftSaleDetails.css";
import Skeleton from "../skeleton/Skeleton";
import axios from "axios";

function NftSaleDetails({ searchTerm }) {
  const apiKey = "2865692e-2c75-42e5-ba5a-4fa45f213a41";
  const lamports = 10 ** 9;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function parseTxn(searchFeildString) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/transactions/?api-key=${apiKey}`,
        {
          transactions: [searchFeildString],
        }
      );
      console.log("Parse Txn: ", data[0]);
      setData(data[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      parseTxn(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="null__background">
      {!searchTerm ? null : (
        <section id="nftsaledetails">
          <div className="nftsaledetails__container">
            <h2 className="nftsaledetails__container--header">Sale Details</h2>
            {loading ? (
              <div className="nftresult__right-container">
                <h3 className="nftresult__heading">
                  <Skeleton width="100%" height="30px" borderRadius="12px" />
                </h3>
                <h3 className="nftresult__heading">
                  <Skeleton width="100%" height="30px" borderRadius="12px" />
                </h3>
                <h3 className="nftresult__heading">
                  <Skeleton width="100%" height="30px" borderRadius="12px" />
                </h3>
                <h3 className="nftresult__heading">
                  <Skeleton width="100%" height="30px" borderRadius="12px" />
                </h3>
                <h3 className="nftresult__heading">
                  <Skeleton width="100%" height="30px" borderRadius="12px" />
                </h3>
              </div>
            ) : (
              <div className="nftsaledetails__subcontainer">
                <div className="nftimg__left-container">
                  <div className="nft__image--wrapper">
                    <img />
                  </div>
                </div>
                <div className="nftresult__right-container">
                  <h3 className="nftresult__heading">
                    Sale Amount:{" "}
                    {!data ? null : data?.events.nft.amount / lamports} SOL
                  </h3>
                  <h3 className="nftresult__heading">
                    Seller: {data?.events.nft.seller}
                  </h3>
                  <h3 className="nftresult__heading">
                    Buyer: {data?.events.nft.buyer}
                  </h3>
                  <h3 className="nftresult__heading">
                    Marketplace Sold On: {data?.events.nft.source}
                  </h3>
                  <h3 className="nftresult__heading">
                    Mint Address: {data?.events.nft.nfts[0].mint}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default NftSaleDetails;
