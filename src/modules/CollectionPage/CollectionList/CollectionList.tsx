import React, {FC, useState} from "react";
import styles from "./CollectionList.module.scss";
import {Tab, TabItem} from "../../../components/Tab/Tab";
import {CollectionItemsView} from "./Items/CollectionItemsView";
import {CollectionOffersView} from "./Offers/CollectionOffersView";
import {ActivityTable} from "../../../components/ActivityTable/ActivityTable";

type Props = {};

export type TabID = "items" | "activity" | "collection_offers";

export const CollectionList: FC<Props> = ({}) => {
  const [selected, setSelectedTab] = useState<TabID>("items");

  const tabs: TabItem[] = [
    {
      label: "Items",
      id: "items",
    },
    {
      label: "Activity",
      id: "activity",
    },
    {
      label: "Collection Offers",
      id: "collection_offers",
    },
  ];

  const views: {[key in TabID]: any} = {
    items: CollectionItemsView,
    collection_offers: CollectionOffersView,
    activity: ActivityTable,
  };

  const View = views[selected];

  return (
    <div className={styles["collection-list"]}>
      <Tab tabs={tabs} selectedValue={selected} onChange={(v) => setSelectedTab(v as TabID)} />

      <div className={styles["view"]}>
        <View />
      </div>
    </div>
  );
};
