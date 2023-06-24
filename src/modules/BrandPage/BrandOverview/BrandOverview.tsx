import React, {FC} from "react";
import styles from "./BrandOverview.module.scss";
import {ArrowBack, ArrowForward, OpenInNew} from "../../../components/Icons/Icons";
import {Button} from "../../../components/Button/Button";
import cn from "classnames";
import {useRouter} from "next/router";

type Props = {};

export const BrandOverview: FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <div className="container">
      <div className={styles["brand-overview"]}>
        <div className={styles["brand-wrapper"]}>
          <div className={styles["image-container"]}>
            <img src="/img/brands/whiskey.png" alt="brand name" />

            <div className={styles["overlay"]} />

            <div className={styles["image-text"]}>
              <div className={styles["special-featured"]}>SPECIAL FEATURED</div>

              <div className={styles["p-title"]}>Craigellachie Single Malt 2009</div>

              <div className={styles["p-brand"]}>Dramsky</div>
            </div>
          </div>

          <div className={styles["brand-details"]}>
            <h1 className={cn(styles["brand-name"], "golden-text")}>
              <span>Dramsky</span>
            </h1>

            <h3 className={styles["brand-desc"]}>Web3’s Favourite Whisky Brand</h3>

            <Button
              className={styles["view-collection"]}
              btnType="primary"
              onClick={() => {
                router.push(`/collection/test`);
              }}
            >
              View Collection <ArrowForward />
            </Button>

            <div className={styles["wallet-address"]}>
              <div className={styles["w-title"]}>Dramsky wallet address:</div>

              <div className={styles["address"]}>
                <div>0sjcmks2548sdfvxaac18423280saccmks2</div> <OpenInNew />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
