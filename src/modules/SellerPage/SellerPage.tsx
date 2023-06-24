import React, {FC, useState} from "react";
import styles from "./SellerPage.module.scss";
import {ArrowBack, EditIcon, EditProfileIcon} from "../../components/Icons/Icons";
import {LeftUserDetails} from "./LeftUserDetails/LeftUserDetails";
import {SellerCollectionList, SellerProfileTabID} from "./CollectionList/SellerCollectionList";
import cn from "classnames";
import {useWindowSize} from "../../hooks/use-window-size";

type Props = {
  defaultTab: SellerProfileTabID;
};

export const SellerPage: FC<Props> = ({defaultTab}) => {
  const {width} = useWindowSize();
  const collectionSelectState = useState<string | null>(null);

  return (
    <div className={styles["seller-page"]}>
      <div className={styles["banner"]}>
        <img src="/img/catalog/catalogBanner.png" alt="" />

        <div className={styles["edit-profile"]}>
          Edit profile
          <EditIcon />
        </div>

        <div className={styles["mobile-action"]}>
          <div className={styles["arrow-back"]}>
            <ArrowBack />
          </div>

          <div className={styles["edit-icon"]}>
            <EditProfileIcon />
          </div>

          <div className={styles["seller-info"]}>
            <img src="/img/seller-avatar.png" className={styles["avatar"]} alt="" />

            <h1 className={styles["seller-name"]}>Sellername</h1>
          </div>
        </div>
      </div>

      <div className={cn("container", styles["user-wrapper"])}>
        {width >= 1024 && (
          <div className={styles["left-section"]}>
            <LeftUserDetails collectionState={collectionSelectState} />
          </div>
        )}

        <div className={styles["right-section"]}>
          <SellerCollectionList collectionState={collectionSelectState} defaultTab={defaultTab} />
        </div>
      </div>
    </div>
  );
};
