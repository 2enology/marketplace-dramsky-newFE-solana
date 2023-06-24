import React, {FC} from "react";
import styles from "./CollectionFloatBar.module.scss";
import {SolanaIcon} from "../../../../../components/Icons/Icons";
import {formatNumber} from "../../../../../common/common-util";
import {StatusBadge} from "../../../CollectionDetails/CollectionDetails";
import {Button} from "../../../../../components/Button/Button";

type Props = {
  onStartBuyNow: () => void;
};

export const CollectionFloatBar: FC<Props> = ({onStartBuyNow}) => {
  return (
    <div className={styles["collection-float-bar"]}>
      <div className="container">
        <div className={styles["float-bar-wrapper"]}>
          <div className={styles["left-section"]}>
            <div className={styles["row"]}>
              <div className={styles["name"]}>Supply:</div>

              <div className={styles["value"]}>456</div>
            </div>

            <div className={styles["row"]}>
              <div className={styles["name"]}>Bottles Redeemed:</div>

              <div className={styles["value"]}>72</div>
            </div>

            <div className={styles["row"]}>
              <div className={styles["name"]}>Lowest bid:</div>

              <div className={styles["value"]}>
                <SolanaIcon /> {formatNumber(1000)}
              </div>
            </div>
          </div>

          <div className={styles["right-section"]}>
            <StatusBadge />

            <Button btnType="primary" onClick={onStartBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
