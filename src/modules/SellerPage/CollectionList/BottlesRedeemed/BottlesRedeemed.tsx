import React, {FC} from "react";
import styles from "./BottlesRedeemed.module.scss";
import {ColumnType, DataTable} from "../../../../components/DataTable/DataTable";
import {CheckSuccessFiledIcon} from "../../../../components/Icons/Icons";

type Props = {};

export const BottlesRedeemed: FC<Props> = ({}) => {
  const columns: ColumnType[] = [
    {
      header: "COLLECTION",
      maxWidth: 220,
      width: 150,
      render: () => (
        <div className={styles["collection"]}>
          <img src="/img/item-mock.png" className={styles["collection-avatar"]} alt="" />
          <div className={styles["name"]}>Baron Desmond</div>
        </div>
      ),
    },
    {
      header: "NFT ID",
      render: () => "#1002",
    },
    {
      header: "STATUS",
      render: () => (
        <div className={styles["status-badge"]}>
          <CheckSuccessFiledIcon /> Delivered
        </div>
      ),
    },
    {
      header: "DATE",
      render: () => (
        <div>
          15/03/2023,
          <div>00:14 AM</div>
        </div>
      ),
    },
    {
      header: "TRANSACTION",
      render: () => "3wt5y...8aup",
    },
    {
      header: "MINT ADDRESS",
      render: () => "3wt5y...8aup",
    },
  ];

  return <DataTable rows={[1, 2, 3, 4]} columns={columns} />;
};
