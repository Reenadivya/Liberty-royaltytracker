import React from "react";
import Skeleton from "../skeleton/Skeleton";

function DashboadRow({ data, loading }) {
  const lamports = 10 ** 9;
  return (
    <>
      {loading ? (
        <tr className="table__row">
          <td colSpan={6}>
            <div className="dashboard__row">
              <div className="dashboard__nftName column">
                <Skeleton width="50px" height="35px" borderRadius="8px" />
              </div>
              <div className="dashboard__buyer column">
                <Skeleton width="300px" height="35px" borderRadius="8px" />
              </div>
              <div className="dashboard__seller column">
                <Skeleton width="300px" height="35px" borderRadius="8px" />
              </div>
              <div className="dashboard__source column">
                <Skeleton width="50px" height="35px" borderRadius="8px" />
              </div>
              <div className="dashboard__saleAmount column">
                <Skeleton width="50px" height="35px" borderRadius="8px" />
              </div>
              <div className="dashboard__signature column  long-string">
                <Skeleton width="100px" height="35px" borderRadius="8px" />
              </div>
            </div>
          </td>
        </tr>
      ) : (
        <tr className="table__row">
          <td>{data?.nfts[0]?.name}</td>
          <td>{data?.buyer}</td>
          <td>{data?.seller}</td>
          <td>{data?.source}</td>
          <td>{data?.amount / lamports} SOL</td>
          <td>{data?.signature}</td>
        </tr>
      )}
    </>
  );
}

export default DashboadRow;
