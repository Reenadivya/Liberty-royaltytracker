import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../searchbar/SearchBar";
import "./NftSaleCollectionQuery.css";
import SalesPagination from "./SalesPagination";
import DashboadRow from "./DashboadRow";

function NftSaleCollectionQuery() {
  const [searchTerm, setSearchTerm] = useState();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState();
  const [page, setPage] = useState(1);
  const url = `https://api.helius.xyz/v1/nft-events?api-key=2865692e-2c75-42e5-ba5a-4fa45f213a41`;
  const RESULTS_PER_PAGE = 10;

  const getSales = async (searchterm) => {
    setLoading(true);
    const { data } = await axios.post(url, {
      query: {
        sources: ["MAGIC_EDEN"],
        types: ["NFT_SALE"],
        nftCollectionFilters: {
          verifiedCollectionAddress: [searchterm],
        },
      },
    });
    setSales(data?.result);
    setLoading(false);
  };

  const mintAcc = sales[0]?.nfts[0]?.mint;

  async function getMetaData(mintAdd) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/tokens/metadata?api-key=2865692e-2c75-42e5-ba5a-4fa45f213a41`,
        { mintAccounts: mintAdd }
      );

      setMetadata(data[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error: ", err);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const searchFieldString = event.target[0].value;
    setSearchTerm(searchFieldString);
  }

  function getPageData() {
    const start = (page - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    return sales?.slice(start, end);
  }

  useEffect(() => {
    if (searchTerm) {
      getSales(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (sales?.length > 0 && sales[0]?.nfts.length > 0) {
      const mintAcc = sales[0]?.nfts[0].mint;
      getMetaData([mintAcc]);
    }
  }, [sales]);

  return (
    <div>
      {sales?.length === 0 ? (
        <section id="nftsalecollectionquery">
          <div className="container">
            <h1 className="header">Query Your Favourite NFT Collections</h1>
            <h3 className="subheader">
              ‼️Please read this first before querying‼️
            </h3>
            <p className="faq">How to query</p>
            <p className="faq__para">
              You can find the verified collection address for an NFT on Solana
              by checking the NFT's metadata. NFT metadata often includes a
              field called "collection" or "collectionAddress" that contains the
              verified collection address.<br></br>
              You can also check on popular Solana explorers like, Solscan or
              solana.fm to see if the NFT is listed there. If it is, it should
              be listed in the NFT metadata tab, under tokenStandard ➡️
              collection ➡️ key collection address. Finally, some NFT creators
              or projects may provide the verified collection address on their
              official website or social media accounts.
            </p>
          </div>
          <SearchBar
            handleSubmit={handleSubmit}
            placeholderText={"Enter NFT Collection Address"}
          />
        </section>
      ) : (
        <section id="nftsalecollectionquery">
          <h1 className="header">Query Your Favourite NFT Collections</h1>
          <h3 className="subheader">
            ‼️Please read this first before querying‼️
          </h3>
          <p className="faq">How to query</p>
          <p className="faq__para">
            You can typically find the verified collection address for an NFT on
            Solana by checking the NFT's metadata. NFT metadata often includes a
            field called "collection" or "collectionAddress" that contains the
            verified collection address.<br></br>
            You can also check on popular Solana explorers like, Solscan or
            solana.fm to see if the NFT is listed there. If it is, it should be
            listed in the NFT metadata tab, under tokenStandard ➡️ collection ➡️
            key collection address. Finally, some NFT creators or projects may
            provide the verified collection address on their official website or
            social media accounts.
          </p>
          <SearchBar handleSubmit={handleSubmit} />
          <div className="dashboard">
            <h2 className="dashboard__header">
              Collection Symbol:{" "}
              {(metadata?.offChainData?.symbol)
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>NFT Name</th>
                    <th>Buyer</th>
                    <th>Seller</th>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Signature</th>
                  </tr>
                </thead>
                <tbody>
                  {getPageData().map((sales, index) => (
                    <DashboadRow data={sales} loading={loading} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <SalesPagination
              page={page}
              setPage={setPage}
              totalResults={sales?.length}
              resultsPerPage={RESULTS_PER_PAGE}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default NftSaleCollectionQuery;
