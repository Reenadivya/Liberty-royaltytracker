import axios from "axios";
import { useState, useEffect } from "react";

function useGetMetaData(mintAdd) {
  const apiKey = "2865692e-2c75-42e5-ba5a-4fa45f213a41";

  const [metadata, setMetaData] = useState(null);
  const [metaDataLoading, setmetaDataLoading] = useState(false);
  const [metaDataError, setmetaDataError] = useState(null);

  async function getMetaData(mintAdd) {
    try {
      const { data } = await axios.post(
        `https://api.helius.xyz/v0/tokens/metadata?api-key=${apiKey}`,
        { mintAccounts: mintAdd }
      );
      console.log("metadata: ", data[0]);
      setMetaData(data[0]);
    } catch (err) {
      setmetaDataError(err);
    } finally {
      setmetaDataLoading(false);
    }
  }

  useEffect(() => {
    if (mintAdd) {
      setmetaDataLoading(true);
      const nftAddresses = [mintAdd];
      getMetaData(nftAddresses);
    }
  }, [mintAdd]);

  return { metadata, metaDataError, metaDataLoading };
}

export default useGetMetaData;
