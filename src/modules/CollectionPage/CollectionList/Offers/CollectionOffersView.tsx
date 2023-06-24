import React, {FC} from "react";
import styles from "./CollectionOffersView.module.scss";
import {ColumnType, DataTable} from "../../../../components/DataTable/DataTable";
import {SolanaIcon} from "../../../../components/Icons/Icons";
import {Button} from "../../../../components/Button/Button";

type Props = {};

export const CollectionOffersView: FC<Props> = ({}) => {
  const columns: ColumnType[] = [
    {
      header: "BUYER",
      width: 190,
      render: () => "8JyD5zBG8JyD5zBG...Kym",
    },
    {
      header: "OFFER AMOUNT",
      render: () => (
        <div className={styles["price"]}>
          <SolanaIcon /> 30.00
        </div>
      ),
    },
    {
      header: "REQUESTED ATTRIBUTES",
      render: () => "ABV: 40%",
    },
    {
      header: "CREATED AT",
      render: () => "9 months ago",
    },
    {
      header: "ELIGIBILITY",
      render: (data, index) =>
        index % 2 == 0 ? (
          <div className={styles["eligible"]}>
            <div className={styles["dot"]} />1 eligible NFTs
          </div>
        ) : (
          <div className={styles["not-eligible"]}>Not eligible</div>
        ),
    },
    {
      header: "",
      render: (_, index) =>
        index % 2 == 0 && (
          <Button btnType="golden-secondary" className={styles["sell-btn"]} onClick={() => {}}>
            Sell for 30.00 SOL
          </Button>
        ),
      width: 200,
    },
  ];

  return (
    <div className={styles["collection-offers-view"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>2 offers</div>

        <Button btnType="primary" onClick={() => {}}>
          Make collection offer
        </Button>
      </div>

      <DataTable rows={[1, 2, 3, 4, 5, 6, 7, 8]} columns={columns} />
    </div>
  );
};
