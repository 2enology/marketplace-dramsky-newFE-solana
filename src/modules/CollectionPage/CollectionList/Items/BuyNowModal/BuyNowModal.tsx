/* eslint-disable @next/next/no-img-element */
import React, {FC, useState} from "react";
import styles from "./BuyNowModal.module.scss";
import {CloseXIcon, SolanaIcon} from "../../../../../components/Icons/Icons";
import {Button} from "../../../../../components/Button/Button";
import {formatNumber} from "../../../../../common/common-util";
import {Input} from "../../../../../components/Input/Input";
import {StatusBox} from "../../../../../components/StatusBox/StatusBox";
import {FeesBoxAlert} from "../../../../../components/FeesBoxAlert/FeesBoxAlert";

type Props = {
  selectedProducts: any[];
  onDismiss: () => void;
  initStep: 1 | 2;
};

export const BuyNowModal: FC<Props> = ({selectedProducts, onDismiss, initStep}) => {
  const [step, setStep] = useState(initStep);

  const [products, setProducts] = useState(selectedProducts);

  return (
    <div className={styles["buy-now-modal"]}>
      <div className={styles["modal-header"]}>
        <div className={styles["m-title"]}>
          {step == 1 ? "My selection" : "Buy Items"} <span>({products.length})</span>
        </div>
        <div className={styles["close-btn"]} onClick={onDismiss}>
          <CloseXIcon />
        </div>
      </div>

      <div className={styles["modal-body"]}>
        {step == 2 && (
          <>
            <FeesBoxAlert />

            <StatusBox
              className={styles["status-box"]}
              statusType="error"
              text="insufficient fund on one of your currency. Please ensure your wallet have enough credit to proceed"
            />
          </>
        )}

        {products.map((product) => (
          <div className={styles["product-card"]} key={product}>
            <img src="/img/item-mock.png" className={styles["product-image"]} alt="" />
            <div className={styles["product-details"]}>
              <div className={styles["p-title"]}>
                <div className={styles["title"]}>Checked label X asdklasl djsakldj askldj aklsjd</div>

                <div className={styles["id"]}>#001</div>
              </div>

              <div className={styles["p-price"]}>
                <SolanaIcon /> {formatNumber(1000)}
              </div>
            </div>

            <div className={styles["remove-action"]} onClick={() => setProducts(products.filter((p) => p != product))}>
              <CloseXIcon />
            </div>
          </div>
        ))}
      </div>

      <div className={styles["modal-footer"]}>
        <Button btnType="secondary" onClick={onDismiss}>
          Cancel
        </Button>

        <Button btnType="primary" onClick={() => setStep(2)} disabled={products.length == 0}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};
