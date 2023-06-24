import React, {FC, useRef, useState} from "react";
import styles from "./CollectionPage.module.scss";
import {BackHeaderBar} from "../../components/BackHeaderBar/BackHeaderBar";
import {CollectionDetails} from "./CollectionDetails/CollectionDetails";
import {CollectionStats} from "./CollectionStats/CollectionStats";
import {CollectionList, TabID} from "./CollectionList/CollectionList";

type Props = {};

export const CollectionPage: FC<Props> = ({}) => {
  return (
    <div className={styles["product-page"]}>
      <BackHeaderBar desktopTitle="Back" mobileTitle="Masahiro Distillery" onBack={() => {}} />
      <div className="container">
        <CollectionDetails />
        {/*<CollectionStats />*/}
      </div>

      <div className="container">
        <CollectionList />
      </div>
    </div>
  );
};
