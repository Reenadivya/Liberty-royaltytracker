import { useState, useEffect } from "react";
import axios from "axios";

function useParseTxn(searchFeildString) {
  const apiKey = "2865692e-2c75-42e5-ba5a-4fa45f213a41";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function parseTxn(searchFeildString) {
    try {
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/transactions/?api-key=${apiKey}`,
        {
          transactions: [searchFeildString],
        }
      );
      console.log("Parse Txn: ", data[0]);
      setData(data[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchFeildString) {
      setLoading(true);
      parseTxn(searchFeildString);
    }
  }, [searchFeildString]);

  return { data, loading, error };
}

export default useParseTxn;
