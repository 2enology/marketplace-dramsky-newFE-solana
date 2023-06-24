import React, {FC} from "react";
import styles from "./HomeBannerSection.module.scss";
import {Button} from "../../../components/Button/Button";

type Props = {};

export const HomeBannerSection: FC<Props> = ({}) => {
  return (
    <div className={styles["home-banner-section"]}>
      <h1 className={styles["banner-heading"]}>
        <span>“A one stop pit for all your whisky investment needs”</span>
      </h1>

      <div className={styles["banner-desc"]}>
        Buy, sell and trade on Solana’s first liquor marketplace. The key to your future with Dramsky lies within our
        cask NFTs.
      </div>

      <div className={styles["action-buttons"]}>
        <Button btnType="golden-secondary" onClick={() => {}}>
          Sell my NFTs
        </Button>

        <Button btnType="primary" onClick={() => {}}>
          Explore NFTs
        </Button>
      </div>
    </div>
  );
};
