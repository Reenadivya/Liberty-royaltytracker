import React, { useState, useEffect } from "react";
import NftSaleDetails from "../components/nft-sale-details/NftSaleDetails";
import SearchBar from "../components/searchbar/SearchBar";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const searchFieldString = event.target[0].value;
    setSearchTerm(searchFieldString);
  }

  return (
    <div>
      <SearchBar
        handleSubmit={handleSubmit}
        placeholderText={"Enter Transaction ID"}
      />
      <NftSaleDetails searchTerm={searchTerm} />
    </div>
  );
}

export default SearchResults;
