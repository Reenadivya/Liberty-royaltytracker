import React, { useState, useEffect, useRef } from "react";
import "./NftSaleDetails.css";
import Skeleton from "../skeleton/Skeleton";
import axios from "axios";

function NftSaleDetails({ searchTerm }) {
  const apiKey = "2865692e-2c75-42e5-ba5a-4fa45f213a41";
  const lamports = 10 ** 9;
  const [data, setData] = useState(null);
  const [metadata, setMetaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metaDataLoading, setmetaDataLoading] = useState(true);
  const [royaltyPaid, setRoyaltyPaid] = useState("");

  async function parseTxn(searchFeildString) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/transactions/?api-key=${apiKey}`,
        {
          transactions: [searchFeildString],
        }
      );

      setData(data[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error: ", err);
    }
  }

  async function getMetaData(mintAdd) {
    try {
      setmetaDataLoading(true);
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/tokens/metadata?api-key=${apiKey}`,
        { mintAccounts: mintAdd }
      );

      setMetaData(data[0]);
      setmetaDataLoading(false);
      royalty(data[0].onChainData.data.creators);
    } catch (err) {
      setmetaDataLoading(false);
      console.log("Error: ", err);
    }
  }

  const mintAcc = data?.events.nft.nfts[0].mint;
  const nativeTrf = data?.nativeTransfers;

  function royalty(creators) {
    setmetaDataLoading(true);
    let royaltyPaidText = ""; // Initialize a variable to hold the concatenated values
    for (const creator of creators) {
      if (creator.share > 0) {
        const royaltypayment = nativeTrf.filter(
          (trf) => trf.toUserAccount === creator.address
        );
        if (royaltypayment.length > 0) {
          const payentAmt = royaltypayment[0].amount;
          royaltyPaidText += `✅ ${(payentAmt / lamports).toFixed(
            2
          )} SOL was paid to ${creator.address}`; // Concatenate the string
        } else {
          royaltyPaidText += ` ❌ Royalties were not paid to ${creator.address}`; // Concatenate the string
        }
      }
    }

    setRoyaltyPaid(royaltyPaidText); // Set the concatenated string as the state of royaltyPaid
    setmetaDataLoading(false);
  }

  useEffect(() => {
    if (searchTerm) {
      parseTxn(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data) {
      getMetaData([mintAcc]);
    }
  }, [data]);

  return (
    <div className="null__background">
      {!searchTerm ? (
        <h2 className="null__background--text">
          Enter Your Transaction ID to Begin Your Search...
        </h2>
      ) : (
        <section id="nftsaledetails">
          <div className="nftsaledetails__container">
            <h2 className="nftsaledetails__container--header">Sale Details</h2>
            {!loading && !metaDataLoading ? (
              <div className="nftsaledetails__subcontainer">
                <div className="nftimg__left-container">
                  <div className="nft__image--wrapper">
                    <img
                      src={metadata?.offChainData?.image}
                      alt=""
                      className="nft__image lazy"
                    />
                  </div>
                </div>
                <div className="nftresult__right-container">
                  <h3 className="nftresult__heading">
                    NFT Name: {metadata?.onChainData?.data.name}
                  </h3>
                  <h3 className="nftresult__heading">
                    Creator Royalty:{" "}
                    {(
                      metadata?.onChainData?.data.sellerFeeBasisPoints / 100
                    ).toFixed(1)}{" "}
                    %
                  </h3>
                  <h3 className="nftresult__heading">
                    Sale Amount:{" "}
                    {!data
                      ? null
                      : (data?.events.nft.amount / lamports).toFixed(2)}{" "}
                    SOL
                  </h3>
                  <h3 className="nftresult__heading">
                    Seller: {data?.events.nft.seller}
                  </h3>
                  <h3 className="nftresult__heading">
                    Buyer: {data?.events.nft.buyer}
                  </h3>
                  <h3 className="nftresult__heading">
                    Marketplace Sold On:{" "}
                    {(data?.events.nft.source).replace("_", " ")}
                  </h3>
                  <h3 className="nftresult__heading">
                    Mint Address: {data?.events.nft.nfts[0].mint}
                  </h3>
                  <h3
                    className="nftresult__heading"
                    style={{ whiteSpace: "pre-wrap" }}>
                    {royaltyPaid.split("✅" || "❌").join("\n✅" || "\n❌")}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="nftsaledetails__subcontainer">
                <div className="nftimg__left-container">
                  <div className="nft__image--wrapper">
                    <Skeleton width="300px" height="300px" borderRadius="8px" />
                  </div>
                </div>
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
                  <h3 className="nftresult__heading">
                    {" "}
                    <Skeleton width="100%" height="30px" borderRadius="12px" />
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
