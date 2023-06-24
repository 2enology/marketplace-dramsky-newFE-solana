import React, {FC} from "react";
import styles from "./ActivityTable.module.scss";
import {ColumnType} from "../DataTable/DataTable";
import {PaginationDataTable} from "../DataTable/PaginationDataTable";
import {IActivity, TxType} from "../../apis/activities-api";
import {ProductPrice} from "../ProductPrice/ProductPrice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {sortBy} from "lodash";
dayjs.extend(relativeTime);

type Props = {
  activities: IActivity[];
};

export const ActivityTable: FC<Props> = ({activities}) => {
  const columns: ColumnType[] = [
    {
      header: "NAME",
      render: (row: IActivity) => (
        <div className={styles["name-wrapper"]}>
          <img className={styles["avatar"]} src={row.imgUrl} alt="" />
          <div className={styles["name"]}>{row.tokenId}</div>
        </div>
      ),
      width: 180,
      maxWidth: 250,
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
    },
    {
      header: "BUYER",
      render: (row: IActivity) => row.buyer,
    },
    {
      header: "CREATED AT",
      render: (row: IActivity) => dayjs(row.createdAt).fromNow(),
    },
  ];

  return (
    <div className={styles["activity-view"]}>
      <PaginationDataTable rows={sortBy(activities, (a) => -new Date(a.createdAt).getTime())} columns={columns} />
    </div>
  );
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
