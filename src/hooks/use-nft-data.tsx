import {useState, useEffect} from "react";
import axios from "axios";
import {NFTCardType} from "../components/DataTypes";

const useNftData = (mintAddr: string): [NFTCardType[] | undefined, boolean, Error | undefined] => {
  const [nftData, setNftData] = useState<NFTCardType[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchNftData = async () => {
      try {
        const response = await axios.get(`https://api.dramsky.xyz/activity/findByMintAddr/${mintAddr}`);
        console.log("response.data", response.data);
        // setNftData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNftData();
  }, [mintAddr]);

  return [nftData, loading, error];
};

export default useNftData;
