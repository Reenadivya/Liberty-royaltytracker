import React from "react";

function SalesPagination({ page, setPage, totalResults, resultsPerPage }) {
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);

  const maxPage = Math.ceil(totalResults / resultsPerPage);

  return (
    <div>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </button>
      <span>Page {page}</span>
      <button onClick={handleNextPage} disabled={page === maxPage}>
        Next
      </button>
    </div>
  );
}

export default SalesPagination;
