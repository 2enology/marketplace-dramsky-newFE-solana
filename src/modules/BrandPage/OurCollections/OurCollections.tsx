/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import styles from "./OurCollections.module.scss";
import {formatNumber} from "../../../common/common-util";
import cn from "classnames";

type Props = {};

export const OurCollections: FC<Props> = ({}) => {
  return (
    <div className="container">
      <div className={styles["our-collections-wrapper"]}>
        <h2 className={styles["our-collections"]}>All Collections</h2>

        <div className={styles["collections-list"]}>
          {[1, 2, 3].map((v) => (
            <div className={styles["collection"]} key={v}>
              <img className={styles["c-banner"]} src="img/brands/collection-banner.png" alt="" />

              <div className={styles["c-avatar"]}>
                <img src="img/brands/collection-avatar.png" alt="" />
              </div>

              <div className={styles["c-details"]}>
                <div className={styles["c-name"]}>Dramsky Whisky 88</div>

                <div className={styles["c-stats"]}>
                  <div className={styles["stat-box"]}>
                    <div className={styles["s-name"]}>No of items</div>

                    <div className={cn(styles["s-value"], "golden-text")}>
                      <span>{formatNumber(1200)}</span>
                    </div>
                  </div>

                  <div className={styles["stat-box"]}>
                    <div className={styles["s-name"]}>Total volume</div>

                    <div className={cn(styles["s-value"], "golden-text")}>
                      <span>2.89K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
