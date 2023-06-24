import React, {FC, useContext, useEffect, useRef, useState} from "react";
import styles from "./ItemPage.module.scss";
import {BackHeaderBar} from "../../components/BackHeaderBar/BackHeaderBar";
import {ItemDetails} from "./ItemDetails/ItemDetails";
import {Tab, TabItem} from "../../components/Tab/Tab";
import {ActivityTable} from "../../components/ActivityTable/ActivityTable";
import {NFTCard, NFTMetaData} from "../../components/DataTypes";
import {GetNFTDataContext} from "../../contexts/NFTDataProvider";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../common/constant";
import {useRouter} from "next/router";
import {api} from "../../apis/api";
import {useWallet} from "@solana/wallet-adapter-react";
import {ItemActivities} from "./ItemActivities/ItemActivities";
import {ItemOffers} from "./ItemOffers/ItemOffers";

type Props = {
  nftMetaData: NFTMetaData;
  nftDetails: NFTCard;
};

export const ItemPage: FC<Props> = ({nftMetaData, nftDetails}) => {
  const [selected, setSelected] = useState("Offer");
  const {ownNFTs} = useContext(GetNFTDataContext);
  const router = useRouter();

  const {data: ownNFTDetails} = useQuery({
    queryKey: [QUERY_KEYS.items.getItemDetails, router.query["item-id"]],
    queryFn: () => {
      if (ownNFTs !== undefined) {
        return ownNFTs.find((n) => n.mintAddr == router.query["item-id"]);
      }

      return undefined;
    },
    enabled: !nftDetails && !!router.query["item-id"] && ownNFTs !== undefined,
  });

  const {data: metaDataResp} = useQuery({
    queryKey: [QUERY_KEYS.items.getItemAttrs, ownNFTDetails?.metaDataUrl],
    enabled: !!ownNFTDetails,
    queryFn: async () => {
      const [resp] = await api.items.getItemAttrs(ownNFTDetails?.metaDataUrl || "");
      return resp;
    },
  });

  const nft = nftDetails ? nftDetails : ownNFTDetails;
  const metaData = nftMetaData ? nftMetaData : metaDataResp;

  if (ownNFTs && !nft) {
    return <div>Not Found</div>;
  }

  if (!nftDetails && (!ownNFTs || !nft || !metaData)) {
    return <div>"Loading..."</div>;
  }
  const tabs: TabItem[] = [
    {
      label: "Offer",
      id: "Offer",
    },
    {
      label: "Activity",
      id: "Activity",
    },
  ];

  if (nft && metaData) {
    return (
      <div className={styles["item-page"]}>
        <BackHeaderBar desktopTitle="Back to collection" mobileTitle={nft.tokenId} onBack={() => {}} />
        <div className="container">
          <ItemDetails nftDetails={nft} nftMetaData={metaData} isListed={!!nftDetails} />

          <div className={styles["tab-container"]}>
            <Tab tabs={tabs} selectedValue={selected} onChange={(v) => setSelected(v)} />
          </div>

          {selected == "Offer" ? <ItemOffers nft={nft} /> : <ItemActivities nft={nft} />}
        </div>
      </div>
    );
  }

  return null;
};
