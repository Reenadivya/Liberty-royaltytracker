import React from "react";
import "./SearchBar.css";

function SearchBar({ handleSubmit }) {
  return (
    <section id="searchbar">
      <div className="searchbar__container">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="searchTerm"
            placeholder="Enter Transaction ID"
          />
          <button type="submit" className="searchButton">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
