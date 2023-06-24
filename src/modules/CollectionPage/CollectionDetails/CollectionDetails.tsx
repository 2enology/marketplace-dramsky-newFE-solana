/* eslint-disable @next/next/no-img-element */
import React, {FC, useState} from "react";
import styles from "./CollectionDetails.module.scss";
import cn from "classnames";
import {Tab, TabItem} from "../../../components/Tab/Tab";

type Props = {};

export const CollectionDetails: FC<Props> = ({}) => {
  const tabs: TabItem[] = [
    {
      label: "About",
      id: "about",
    },
    {
      label: "Tasting Notes",
      id: "tasting_notes",
    },
    {
      label: "NFT Details",
      id: "nft_details",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("about");

  return (
    <div className={styles["collection-details-wrapper"]}>
      <div className={styles["image-content"]}>
        <img src="/img/brands/whiskey.png" alt="" />
      </div>

      <div className={styles["collection-details"]}>
        <h1 className={cn(styles["c-title"], "golden-text")}>
          <span>Craigellachie Single Malt 2009</span>
        </h1>

        <StatusBadge />

        <Tab tabs={tabs} selectedValue={selectedTab} onChange={(v) => setSelectedTab(v)} />

        <TastingNotes />
      </div>
    </div>
  );
};

const TastingNotes = () => (
  <div className={styles["tasting-notes"]}>
    <div className={styles["desc"]}>
      <p>
        This versatile whisky boasts hints of honey and fruity flavours, alongside a distinctive meaty character that
        combines together harmoniously with a hint of smoke.
      </p>

      <p>
        Indulge in the aromas of toasted marshmallows and fire-roasted pineapples with bits of smoky bacon. A medium
        long finish, with some oak, pepper and fruity sweetness.
      </p>
    </div>

    <div className={styles["box"]}>
      While we strive to provide notes that are commonly found in a 13 year Craigellachie, this is subject to change
      based on the whisky bottled from our cask and on individual preferences.
    </div>
  </div>
);

export const StatusBadge = () => (
  <div className={styles["status-badge"]}>
    <div className={styles["dot"]} />
    Available to redeem
  </div>
);
