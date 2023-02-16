import React, { useState, useEffect } from "react";
import "./NftSaleDetails.css";
import useParseTxn from "../fetchAPI/useParseTxn";
import useGetMetaData from "../fetchAPI/useGetMetaData";
import NftSaleCard from "./NftSaleCard";

function NftSaleDetails({ searchTerm }) {
  const { data, loading, error } = useParseTxn(searchTerm);
  console.log(data);
  const mintAcc = data?.events.nft.nfts[0].mint;
  const nativeTrf = data?.nativeTransfers;
  const { metadata, metaDataError, metaDataLoading } = useGetMetaData(mintAcc);
  console.log(metadata);
  const creators = metadata?.onChainData?.data.creators;
  const [royaltypaid, setRoyaltyPaid] = useState("");

  if (metadata) {
    for (const creator of creators) {
      if (creator.share > 0) {
        const royaltypayment = nativeTrf.filter(
          (trf) => trf.toUserAccount === creator.address
        );
        if (royaltypayment.length > 0) {
          const payentAmt = royaltypayment[0].amount;
          console.log(`${payentAmt} was paid to ${creator.address}`);
        } else {
          console.log(`Royalties not paid to ${creator.address}`);
        }
      }
    }
  }

  return (
    <section id="nftsaledetails">
      <div className="nftsaledetails__container">
        <h2 className="nftsaledetails__container--header">Sale Details</h2>
        <NftSaleCard />
      </div>
    </section>
  );
}

export default NftSaleDetails;
