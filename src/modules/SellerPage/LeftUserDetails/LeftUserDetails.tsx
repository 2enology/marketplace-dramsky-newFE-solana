import React, {FC, useContext} from "react";
import styles from "./LeftUserDetails.module.scss";
import {GridMoreViewIcon, GridViewIcon, LaunchIcon} from "../../../components/Icons/Icons";
import cn from "classnames";
import {GetNFTDataContext} from "../../../contexts/NFTDataProvider";
import {useRouter} from "next/router";
import {useWallet} from "@solana/wallet-adapter-react";
import {useQuery} from "react-query";
import {api} from "../../../apis/api";
import {getWalletID} from "../CollectionList/ListedItems/SellerListedItems";
import {QUERY_KEYS} from "../../../common/constant";

type Props = {
  collectionState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export const LeftUserDetails: FC<Props> = ({collectionState}) => {
  const {collections, ownNFTs} = useContext(GetNFTDataContext);
  const [selectedCol, setSelectedCol] = collectionState;

  return (
    <div className={styles["left-user-details"]}>
      <div className={styles["seller-info-box"]}>
        <img className={styles["seller-avatar"]} src="/img/seller-avatar.png" alt="" />

        <h1 className={styles["seller-name"]}>Sellername</h1>
        <SellerStats />
      </div>

      <div className={styles["collections"]}>
        <div
          className={cn(styles["all-collections"], !selectedCol && styles["active"])}
          onClick={() => {
            setSelectedCol(null);
          }}
        >
          <div className={styles["icon"]}>
            <GridMoreViewIcon />
          </div>
          <div className={styles["col-name"]}>All Collections {collections && <span>({collections.length})</span>}</div>
        </div>

        <div className={styles["collection-list"]}>
          <div className={styles["title"]}>Collection List</div>

          {(collections || []).map((col) => (
            <div
              className={cn(styles["collection"], col.collectionAddr == selectedCol && styles["active"])}
              key={col.collectionAddr}
              onClick={() => setSelectedCol(col.collectionAddr)}
            >
              <img src="/img/item-mock.png" alt="" />
              <div className={styles["col-name"]}>
                <div>{col.collectionAddr}</div>
                {ownNFTs && ownNFTs.length > 0 && (
                  <span>({ownNFTs.filter((n) => n.collectionAddr == col.collectionAddr).length})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SellerStats = () => {
  const wallet = useWallet();
  const {ownNFTs} = useContext(GetNFTDataContext);

  const {data: listedNFTs, refetch} = useQuery({
    queryKey: [QUERY_KEYS.items.getListedItems, getWalletID(wallet)],
    enabled: !!wallet.publicKey,
    queryFn: async () => {
      const [resp] = await api.items.getListedItems(getWalletID(wallet));
      if (resp) {
        return resp.map((item) => ({
          ...item,
          listed: true,
          collectionName: "",
        }));
      }

      return [];
    },
  });

  return (
    <div className={styles["seller-stats"]}>
      <div className={styles["wallet-box"]}>
        {wallet.publicKey?.toBase58()}
        <LaunchIcon />
      </div>

      <div className={styles["items-stats"]}>
        <div className={styles["box"]}>
          <div className={styles["name"]}>Items:</div>

          <div className={styles["value"]}>{ownNFTs?.length}</div>
        </div>
        <div className={styles["box"]}>
          <div className={styles["name"]}>Listed:</div>

          <div className={styles["value"]}>{listedNFTs?.length}</div>
        </div>
        <div className={styles["box"]}>
          <div className={styles["name"]}>Est. item values:</div>

          <div className={styles["value"]}>000</div>
        </div>
      </div>
    </div>
  );
};
