import React, {FC, useContext} from "react";
import styles from "./MyActivity.module.scss";
import {ColumnType, DataTable} from "../../../../components/DataTable/DataTable";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import GetActivityDataProvider, {ActivityDataContext} from "../../../../contexts/ActivityDataProvider";
import {useQuery} from "react-query";
import {async} from "rxjs";
import {api} from "../../../../apis/api";
import {useRouter} from "next/router";
import {getWalletID} from "../ListedItems/SellerListedItems";
import {useWallet} from "@solana/wallet-adapter-react";
import {IActivity, TxType} from "../../../../apis/activities-api";
import {PaginationDataTable} from "../../../../components/DataTable/PaginationDataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {QUERY_KEYS} from "../../../../common/constant";
import {ActivityTable} from "../../../../components/ActivityTable/ActivityTable";
dayjs.extend(relativeTime);

type Props = {};

export const MyActivity: FC<Props> = ({}) => {
  const wallet = useWallet();

  const {data: activities} = useQuery({
    queryKey: [QUERY_KEYS.activity.myActivities, getWalletID(wallet)],
    enabled: !!wallet.publicKey,
    queryFn: async () => {
      const [resp] = await api.activity.getActivities(getWalletID(wallet));
      return resp;
    },
  });

  const columns: ColumnType[] = [
    {
      header: "NAME",
      render: (row: IActivity) => (
        <div className={styles["collection"]}>
          <img src={row.imgUrl} className={styles["collection-avatar"]} alt="" />
          <div className={styles["name"]}>{row.tokenId}</div>
        </div>
      ),
      width: 150,
      maxWidth: 220,
    },
    {
      header: "TRANSACTION TYPE",
      render: (row: IActivity) => <TransactionType txType={row.txType} />,
    },
    {
      header: "TOTAL",
      render: (row: IActivity) => <ProductPrice product={row} />,
    },
    {
      header: "SELLER",
      render: (row: IActivity) => row.seller,
      maxWidth: 150,
      width: 150,
    },
    {
      header: "BUYER",
      render: (row: IActivity) => row.buyer,
      maxWidth: 150,
      width: 150,
    },
    {
      header: "CREATED AT",
      render: (row: IActivity) => dayjs(row.createdAt).fromNow(),
    },
  ];

  return <PaginationDataTable rows={activities || []} columns={columns} />;
};

export const TransactionType = ({txType}: {txType: TxType}) => {
  const TYPES: {[key in TxType]: any} = {
    "0": <span style={{color: "white"}}>Listing</span>,
    "1": <span style={{color: "#7F7D7A"}}>Cancel List</span>,
    "2": <span style={{color: "white"}}>Place offer</span>,
    "3": <span style={{color: "white"}}>Cancel offer</span>,
    "4": <span style={{color: "#A5F56F"}}>Sale</span>,
  };

  return TYPES[txType];
};
