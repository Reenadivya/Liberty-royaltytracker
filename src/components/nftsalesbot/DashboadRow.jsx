import React from "react";
import Skeleton from "../skeleton/Skeleton";

function DashboadRow({ data, loading }) {
  const lamports = 10 ** 9;

  return (
    <>
      {loading ? (
        <tr className="table__row">
          <td>
            <Skeleton width="120px" height="35px" borderRadius="8px" />
          </td>
          <td>
            <Skeleton width="290px" height="35px" borderRadius="8px" />
          </td>
          <td>
            <Skeleton width="290px" height="35px" borderRadius="8px" />
          </td>
          <td>
            <Skeleton width="95px" height="35px" borderRadius="8px" />
          </td>
          <td>
            <Skeleton width="70px" height="35px" borderRadius="8px" />
          </td>
          <td>
            <Skeleton width="280px" height="35px" borderRadius="8px" />
          </td>
        </tr>
      ) : (
        <tr className="table__row">
          <td>{data?.nfts[0]?.name}</td>
          <td>{data?.buyer}</td>
          <td>{data?.seller}</td>
          <td>{(data?.source).replace("_", " ")}</td>
          <td>{(data?.amount / lamports).toFixed(2)} SOL</td>
          <td>{data?.signature}</td>
        </tr>
      )}
    </>
  );
}

export default DashboadRow;
