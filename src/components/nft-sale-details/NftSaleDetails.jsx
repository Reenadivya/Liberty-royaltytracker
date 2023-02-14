import React, { useState, useEffect } from "react";
import "./NftSaleDetails.css";
import useParseTxn from "../fetchAPI/useParseTxn";
import useGetMetaData from "../fetchAPI/useGetMetaData";

function NftSaleDetails({ searchTerm }) {
  const { data, loading, error } = useParseTxn(searchTerm);
  const mintAcc = data?.events.nft.nfts[0].mint;
  const nativeTrf = data?.nativeTransfers;
  const { metadata, metaDataError, metaDataLoading } = useGetMetaData(mintAcc);
  const creators = metadata?.onChainData?.data.creators;
  const [royaltypaid, setRoyaltyPaid] = useState("");

  // if (metadata) {
  //   for (const creator of creators) {
  //     if (creator.share > 0) {
  //       const royaltypayment = nativeTrf.filter(
  //         (trf) => trf.toUserAccount === creator.address
  //       );
  //       if (royaltypayment.length > 0) {
  //         const payentAmt = royaltypayment[0].amount;
  //         console.log(`${payentAmt} was paid to ${creator.address}`);
  //       } else {
  //         console.log(`Royalties not paid to ${creator.address}`);
  //       }
  //     }
  //   }
  // }

  if (error) console.log(error);
  if (metaDataError) console.log(error);
  if (loading) return <h1>Loading...</h1>;
  if (metaDataLoading) return <h1>Loading...</h1>;

  return (
    <section id="nftsaledetails">
      <div className="nftsaledetails__container">
        <h2 className="nftsaledetails__container--header">Sale Details</h2>
        <div className="nftsaledetails__subcontainer">
          <div className="nftimg__left-container">
            <div className="nft__image--wrapper">
              <img
                src={metadata?.offChainData?.image}
                alt=""
                className="nft__image"
              />
            </div>
          </div>
          <div className="nftresult__right-container">
            <h3 className="nftresult__heading">
              Sale Amount: {data?.events.nft.amount}
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
            <h3 className="nftresult__heading">
              Royalty Fee:
              {metadata?.onChainData?.data.sellerFeeBasisPoints / 100} %
            </h3>
            {metadata && (
              <h3 className="nftresult__heading">
                {creators
                  .filter((creator) => creator.share > 0)
                  .map((creator) => {
                    const royaltyPayment = nativeTrf.find(
                      (trf) => trf.toUserAccount === creator.address
                    );
                    let content;
                    let content2;
                    if (royaltyPayment) {
                      content = `${royaltyPayment.amount} was paid to ${creator.address}`;
                      content2 = `Royalty Paid: Yes`;
                    } else {
                      content = `Royalties was not paid to ${creator.address}`;
                      content2 = `Royalty Paid: No`;
                    }
                    return (
                      <p key={creator.address}>
                        {content} {content2}
                      </p>
                    );
                  })}
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NftSaleDetails;
