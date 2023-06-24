import {createContext} from "react";
import {getAllCollections} from "./scripts";
import {useWallet} from "@solana/wallet-adapter-react";
import {web3} from "@project-serum/anchor";
import {getParsedNftAccountsByOwner} from "@nfteyez/sol-rayz";
import {api} from "../apis/api";
import {useQuery} from "react-query";
import {GetNFTDataContextValue, NFTCard} from "../components/DataTypes";
import {QUERY_KEYS} from "../common/constant";

export const GetNFTDataContext = createContext<GetNFTDataContextValue>({
  collections: undefined,
  ownNFTs: undefined,
  reFetchOwnNFTs: () => Promise.resolve(),
});

const GetNFTDataProvider: React.FC = ({children}) => {
  const wallet = useWallet();

  const {data: collections} = useQuery({
    queryKey: QUERY_KEYS.collections,
    queryFn: async () => {
      const collectionResult = await getAllCollections();
      if (collectionResult && collectionResult.count) {
        return collectionResult.data.map((col) => ({
          collectionAddr: col.address,
        }));
      } else {
        return [];
      }
    },
  });

  const {data: ownNFTs, refetch} = useQuery({
    queryKey: [QUERY_KEYS.items.ownNFTs, wallet?.publicKey],
    enabled: !!collections,
    queryFn: async () => {
      const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));
      if (wallet.publicKey === null) return [];

      const nftList = await getParsedNftAccountsByOwner({
        publicAddress: wallet.publicKey.toBase58(),
        connection: solConnection,
      });

      let data: NFTCard[] = [];

      for (let item of nftList) {
        if (item.data.creators && (collections || []).find((c) => c.collectionAddr == item.data.creators[0].address)) {
          const [resp] = await api.items.getItemImage(item.data.uri);
          if (resp) {
            data.push({
              tokenId: item?.data.name,
              collectionAddr: item.data?.creators[0].address,
              imgUrl: resp.image,
              mintAddr: item?.mint,
              metaDataUrl: item?.data.uri,
              solPrice: 0,
              tokenPrice: 0,
              collectionName: "",
              listed: false,
              seller: wallet.publicKey.toBase58(),
            });
          }
        }
      }

      return data;
    },
  });

  return (
    <GetNFTDataContext.Provider
      value={{
        collections,
        ownNFTs,
        reFetchOwnNFTs: refetch,
      }}
    >
      {children}
    </GetNFTDataContext.Provider>
  );
};

export default GetNFTDataProvider;
