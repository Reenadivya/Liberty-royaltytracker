import React from "react";

function SalesPagination({ page, setPage, totalResults, resultsPerPage }) {
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);

  const maxPage = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="pagination__btn">
        Prev
      </button>
      <span className="page__number">Page {page}</span>
      <button
        onClick={handleNextPage}
        disabled={page === maxPage}
        className="pagination__btn">
        Next
      </button>
    </div>
  );
}

export default SalesPagination;
