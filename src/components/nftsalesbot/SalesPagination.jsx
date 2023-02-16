import React from "react";

function SalesPagination({ page, setPage }) {
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);
  return (
    <div>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </button>
      <span>Page {page}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

//Random

export default SalesPagination;
