import React, {FC} from "react";
import styles from "./MonthlyTopCollections.module.scss";
import {ColumnType, DataTable} from "../../../components/DataTable/DataTable";
import cn from "classnames";
import {Button} from "../../../components/Button/Button";
import {formatNumber} from "../../../common/common-util";

type Props = {};

const MOCK_DATA = [
  {
    collection: "Masahiro Pure Malt Whisky",
    brand: "MASAHIRO",
    floor: 0.045,
    monthlyVol: 750,
    totalVol: 3750,
    owners: 2880,
    items: 10890,
  },
  {
    collection: "Craigellachie Single Malt 2009",
    brand: "Dramsky",
    floor: 0.045,
    monthlyVol: 750,
    totalVol: 3750,
    owners: 2880,
    items: 10890,
  },
  {
    collection: "Sing Sing Whisky 18 Years Single Malt",
    brand: "Sing Sing",
    floor: 0.045,
    monthlyVol: 750,
    totalVol: 3750,
    owners: 2880,
    items: 10890,
  },
  {
    collection: "Macallan 25 Years Single Malt Sherry Cask 2022 Releaa asd aisd a",
    brand: "Macallan",
    floor: 0.045,
    monthlyVol: 750,
    totalVol: 3750,
    owners: 2880,
    items: 10890,
  },
  {
    collection: "Bunnahabhain 1978 40 Years Old 30th Anniversary Signakai uw rpa apsd pa",
    brand: "Bunnahabhain",
    floor: 0.045,
    monthlyVol: 750,
    totalVol: 3750,
    owners: 2880,
    items: 10890,
  },
];

export const MonthlyTopCollections: FC<Props> = ({}) => {
  const columns: ColumnType[] = [
    {
      header: "",
      render: (data, index) => <div className={cn(styles["order"], styles[`rank-${index + 1}`])}>{index + 1}</div>,
      width: 56,
    },
    {
      header: "COLLECTION",
      render: (data) => (
        <div
          className={styles["collection"]}
          style={{
            maxWidth: 300,
          }}
        >
          <div className={styles["image"]} />
          <div className={styles["name"]}>
            <div className={styles["text-display"]}>{data.collection}</div>
          </div>
        </div>
      ),
      width: 300,
    },
    {
      header: "BRAND",
      render: (data) => <div className={styles["brand"]}>{data.brand}</div>,
      width: 100,
    },
    {
      header: "FLOOR",
      render: (data) => (
        <div className={styles["number-wrapper"]}>
          <div className={styles["number"]}>{formatNumber(data.floor)}</div>
          <div className={cn(styles["compare"], styles["down"])}>-18.18%</div>
        </div>
      ),
      width: 100,
    },
    {
      header: "MONTHLY VOL",
      render: (data) => (
        <div className={styles["number-wrapper"]}>
          <div className={styles["number"]}>{formatNumber(data.monthlyVol)}</div>
          <div className={cn(styles["compare"], styles["up"])}>+100.00%</div>
        </div>
      ),
      width: 100,
    },
    {
      header: "TOTAL VOL",
      render: (data) => formatNumber(data.totalVol),
      width: 100,
    },
    {
      header: "OWNERS",
      render: (data) => formatNumber(data.owners),
      width: 100,
    },
    {
      header: "ITEMS",
      render: (data) => formatNumber(data.items),
      width: 100,
    },
  ];

  return (
    <div className={styles["monthly-top-collections"]}>
      <h1 className={styles["section-title"]}>Monthly Top Collections</h1>
      <div className={styles["desc"]}>Top whisky collections on Dramsky</div>

      <div className={styles["table-container"]}>
        <div className={styles["green-circle"]} />
        <div className={styles["golden-circle"]} />
        <DataTable rows={MOCK_DATA} columns={columns} />
      </div>

      <div className={styles["browse-more"]}>
        <Button btnType="golden-secondary" onClick={() => {}}>
          Browse all collections
        </Button>
      </div>
    </div>
  );
};
