import React, {FC, useState} from "react";
import styles from "./SellerCollectionList.module.scss";
import {useWindowSize} from "../../../hooks/use-window-size";
import {Tab, TabItem} from "../../../components/Tab/Tab";
import {SellerStats} from "../LeftUserDetails/LeftUserDetails";
import {UnListedItems} from "./UnListedItems/UnListedItems";
import {SellerListedItems} from "./ListedItems/SellerListedItems";
import {SellerOffersMade} from "./OffersMade/SellerOffersMade";
import {SellerOfferReceived} from "./OfferReceived/SellerOfferReceived";
import {BottlesRedeemed} from "./BottlesRedeemed/BottlesRedeemed";
import {MyActivity} from "./MyActivity/MyActivity";
import {useRouter} from "next/router";

type Props = {
  collectionState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  defaultTab: SellerProfileTabID;
};

export type SellerProfileTabID =
  | "unlisted"
  | "listed"
  | "offers-made"
  | "offers-received"
  | "bottles-redeemed"
  | "my-activity";

export const SellerCollectionList: FC<Props> = ({collectionState, defaultTab}) => {
  const {width} = useWindowSize();
  const router = useRouter();

  const [selected, setSelected] = useState<SellerProfileTabID>(defaultTab);
  const [_, setCollectionState] = collectionState;

  const tabs: TabItem[] = [
    {
      label: "Unlisted",
      id: "unlisted",
    },
    {
      label: "Listed",
      id: "listed",
    },
    {
      label: "Offers made",
      id: "offers-made",
    },
    {
      label: "Offers received",
      id: "offers-received",
    },
    {
      label: "Bottles redeemed",
      id: "bottles-redeemed",
    },
    {
      label: "My activity",
      id: "my-activity",
    },
  ];

  const views: {[key in SellerProfileTabID]: any} = {
    unlisted: UnListedItems,
    listed: SellerListedItems,
    "offers-made": SellerOffersMade,
    "offers-received": SellerOfferReceived,
    "bottles-redeemed": BottlesRedeemed,
    "my-activity": MyActivity,
  };

  const View = views[selected];

  return (
    <div className={styles["seller-collection-list"]}>
      <div className={styles["tab-wrapper"]}>
        <Tab
          tabs={tabs}
          selectedValue={selected}
          onChange={(v) => {
            setSelected(v as SellerProfileTabID);
            setCollectionState(null);
            router.push(router.route.replace("[tab]", v), undefined, {shallow: true});
          }}
        />
      </div>

      {width < 1024 && <SellerStats />}

      <View collectionState={collectionState} />
    </div>
  );
};
