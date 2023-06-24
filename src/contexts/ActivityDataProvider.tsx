import {createContext, useEffect, useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";
import axios from "axios";
import {ActivityDataContextValue, ActivityDataType} from "../components/DataTypes";

export const ActivityDataContext = createContext<ActivityDataContextValue>({
  myActivityData: [],
});

const GetActivityDataProvider: React.FC = ({children}) => {
  const wallet = useWallet();

  const [myActivityData, setMyActivityData] = useState<ActivityDataType[]>([]);

  // Get nfts from the wallet || Get collections added in the contract
  const getMyActivityDatas = async () => {
    let activityData: ActivityDataType[] = [];
    try {
      const res = await axios.get(`http://api.dramsky.xyz/activity/findById/${wallet.publicKey?.toBase58()}`);
      if (res.status === 404) {
        console.log("No datas");
      }
      const userData = res.data;
      for (let i = 0; i < userData.length; i++) {
        const dateString = userData[i].createdAt;
        const date = new Date(dateString);
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
        activityData.push({
          imgUrl: userData[i].imgUrl,
          tokenId: userData[i].tokenId,
          mintAddr: userData[i].mintAddr,
          txType: userData[i].txType,
          solPrice: userData[i].solPrice,
          tokenPrice: userData[i].tokenPrice,
          seller: userData[i].seller,
          buyer: userData[i].buyer,
          createdTime: formattedDate,
        });
      }
      setMyActivityData(activityData);
    } catch (err) {
      console.error(err);
      // You could display an error message to the user or retry the request
    }
  };

  useEffect(() => {
    if (wallet.publicKey && wallet.connected) {
      getMyActivityDatas();
    }
    // eslint-disable-next-line
  }, [wallet.publicKey, wallet.connected]);

  return (
    <ActivityDataContext.Provider
      value={{
        myActivityData,
      }}
    >
      {children}
    </ActivityDataContext.Provider>
  );
};

export default GetActivityDataProvider;
