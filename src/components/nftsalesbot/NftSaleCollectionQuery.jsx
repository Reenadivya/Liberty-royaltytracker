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
  const [page, setPage] = useState(1);
  const url = `https://api.helius.xyz/v1/nft-events?api-key=2865692e-2c75-42e5-ba5a-4fa45f213a41`;

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
    setSales(data?.result.slice(0, 6));
    setLoading(false);
    console.log(data.result.slice(0, 6));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const searchFieldString = event.target[0].value;
    setSearchTerm(searchFieldString);
  }

  useEffect(() => {
    if (searchTerm) {
      getSales(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      {sales?.length === 0 ? (
        <section id="nftsalecollectionquery">
          <h1 className="header">Query Your Favourite NFT Collections</h1>
          <h3 className="subheader">Please read this first before querying</h3>
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
        </section>
      ) : (
        <>
          <section id="nftsalecollectionquery">
            <h1 className="header">Query Your Favourite NFT Collections</h1>
            <h3 className="subheader">
              Please read this first before querying
            </h3>
            <p className="faq">How to query</p>
            <p className="faq__para">
              You can typically find the verified collection address for an NFT
              on Solana by checking the NFT's metadata. NFT metadata often
              includes a field called "collection" or "collectionAddress" that
              contains the verified collection address.<br></br>
              You can also check on popular Solana explorers like, Solscan or
              solana.fm to see if the NFT is listed there. If it is, it should
              be listed in the NFT metadata tab, under tokenStandard ➡️
              collection ➡️ key collection address. Finally, some NFT creators
              or projects may provide the verified collection address on their
              official website or social media accounts.
            </p>
            <SearchBar handleSubmit={handleSubmit} />
          </section>
          <div className="dashboard">
            <h2 className="dashboard__header">Collection Name: ABC</h2>
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
                  {sales?.map((sales, index) => (
                    <DashboadRow data={sales} loading={loading} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <SalesPagination page={page} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
}

export default NftSaleCollectionQuery;
