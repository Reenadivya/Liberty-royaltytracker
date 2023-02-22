import React, { useState, useEffect, useRef } from "react";
import Skeleton from "../skeleton/Skeleton";
import axios from "axios";

function NftSaleCard({ data, loading }) {
  console.log(loading);
  const apiKey = "2865692e-2c75-42e5-ba5a-4fa45f213a41";
  const lamports = 10 ** 9;
  const mintAcc = data?.events.nft.nfts[0].mint;
  const [img, setImg] = useState();
  const mountedRef = useRef(true);
  const [metadata, setMetaData] = useState(null);
  const [metaDataLoading, setmetaDataLoading] = useState(false);
  const [metaDataError, setmetaDataError] = useState(null);
  const [royaltypaid, setRoyaltyPaid] = useState("");
  const [royaltypaidBool, setroyaltypaidBool] = useState("");

  const nativeTrf = data?.nativeTransfers;

  const creators = metadata?.onChainData?.data.creators;

  async function getMetaData(mintAdd) {
    try {
      setmetaDataLoading(true);
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/tokens/metadata?api-key=${apiKey}`,
        { mintAccounts: mintAdd }
      );
      console.log("metadata: ", data[0]);
      setMetaData(data[0]);
      setmetaDataLoading(false);
    } catch (err) {
      setmetaDataError(err);
      setmetaDataLoading(false);
    }
  }

  function royalty() {
    if (metadata) {
      setmetaDataLoading(true);
      for (const creator of creators) {
        if (creator.share > 0) {
          const royaltypayment = nativeTrf.filter(
            (trf) => trf.toUserAccount === creator.address
          );
          if (royaltypayment.length > 0) {
            const payentAmt = royaltypayment[0].amount;
            setmetaDataLoading(false);
            setroyaltypaidBool("YES");
            setRoyaltyPaid(`${payentAmt} was paid to ${creator.address}`);
          } else {
            setmetaDataLoading(false);
            setroyaltypaidBool("NO");
            setRoyaltyPaid(`Royalties not paid to ${creator.address}`);
          }
        }
      }
    }
    console.log("metaDataLoading:", metaDataLoading);
  }

  console.log(royaltypaid);
  useEffect(() => {
    const image = new Image();
    image.src = metadata?.offChainData.image;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 1000);
    };
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mintAcc) {
      const nftAddresses = [mintAcc];
      getMetaData(nftAddresses);
    }
  }, [mintAcc]);

  useEffect(() => {
    royalty();
    setmetaDataLoading(false);
  }, [metadata]);

  return (
    <div className="nftsaledetails__subcontainer">
      {!loading ? (
        <>
          <div className="nftimg__left-container">
            <div className="nft__image--wrapper">
              {/* <img
                src={metadata?.offChainData.image}
                alt=""
                className="nft__image"
              /> */}
            </div>
          </div>
          <div className="nftresult__right-container">
            {/* <h3 className="nftresult__heading">
              NFT Name: {metadata?.onChainData.data.name}
            </h3> */}
            <h3 className="nftresult__heading">
              Sale Amount: {data?.events.nft.amount / lamports} SOL
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
            {/* <h3 className="nftresult__heading">
              Royalty Fee:{" "}
              {metadata?.onChainData.data.sellerFeeBasisPoints / 100} %
            </h3>
            <h3 className="nftresult__heading">
              Royalty Paid: {royaltypaidBool}
            </h3>
            <h3 className="nftresult__heading">{royaltypaid}</h3> */}
          </div>{" "}
        </>
      ) : (
        <>
          <div className="nftimg__left-container">
            <div className="nft__image--wrapper">
              <Skeleton width="60px" height="60px" borderRadius="8px" />
            </div>
          </div>
          <div className="nftresult__right-container">
            <h3 className="nftresult__heading">
              NFT Name: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              Sale Amount: <Skeleton width="80px" height="30px" /> SOL
            </h3>
            <h3 className="nftresult__heading">
              Seller: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              Buyer: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              Marketplace Sold On: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              Mint Address: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              Royalty Fee: <Skeleton width="80px" height="30px" /> %
            </h3>
            <h3 className="nftresult__heading">
              Royalty Paid: <Skeleton width="80px" height="30px" />
            </h3>
            <h3 className="nftresult__heading">
              <Skeleton width="80px" height="30px" />
            </h3>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default NftSaleCard;
