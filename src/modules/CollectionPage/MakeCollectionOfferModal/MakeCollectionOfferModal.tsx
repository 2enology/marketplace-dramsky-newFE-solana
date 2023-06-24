/* eslint-disable @next/next/no-img-element */
import React, {FC, useState} from "react";
import styles from "./MakeCollectionOfferModal.module.scss";
import {ArrowBack, CloseXIcon, SolanaIcon} from "../../../components/Icons/Icons";
import {Button} from "../../../components/Button/Button";
import cn from "classnames";
import {OfferAmountInput} from "./OfferAmountInput";
import {InputQuantity} from "../../../components/InputQuantity/InputQuantity";
import {Select} from "../../../components/Select/Select";
import {ProductPrice} from "../../../components/ProductPrice/ProductPrice";
import {Input} from "../../../components/Input/Input";

type Props = {
  onDismiss: () => void;
};

export const MakeCollectionOfferModal: FC<Props> = ({onDismiss}) => {
  const [step, setStep] = useState(0);

  const STEPS = [
    {
      title: "Make collection offer",
      secondary: (
        <Button btnType="secondary" onClick={() => {}}>
          Cancel
        </Button>
      ),
      primary: (
        <Button btnType="primary" onClick={() => setStep(1)}>
          Continue
        </Button>
      ),
      body: (
        <div className={styles["preview-step"]}>
          <div className={styles["offer-preview"]}>
            <div className={styles["offer-image"]}>
              <div className={styles["image"]} />
              Masahiro Distillery
            </div>

            <div className={styles["offer-total"]}>
              <div className={styles["row"]}>
                <div className={styles["name"]}>Highest offer</div>
                {/*<ProductPrice />*/}
              </div>

              <div className={styles["row"]}>
                <div className={styles["name"]}>Floor price</div>
                {/*<ProductPrice />*/}
              </div>

              <div className={styles["row"]}>
                <div className={styles["name"]}>Royalties</div>
                <div className={styles["value"]}>5%</div>
              </div>
            </div>
          </div>

          <div className={styles["marketplace-fee"]}>
            <div className={styles["title"]}>Marketplace fee</div>
            <div className={styles["desc"]}>Place offer amount for this item</div>

            <OfferAmountInput />

            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <InputQuantity />
              </div>

              <div className={styles["col"]}>
                <Select
                  className={styles["select"]}
                  selectValueClassName={styles["select-value"]}
                  label="Offer expiration"
                  list={["30 days"]}
                  value={"30 days"}
                  displayAs={(v) => v}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Make collection offer",
      secondary: (
        <Button
          btnType="secondary"
          onClick={() => {
            setStep(0);
          }}
        >
          <ArrowBack /> Back
        </Button>
      ),
      primary: (
        <Button btnType="primary" style={{padding: 8}} onClick={() => {}}>
          Place Collection Offer
        </Button>
      ),
      body: (
        <div className={styles["step-2-wrapper"]}>
          <div className={styles["step-title"]}>You’re about to place a collection offer for</div>

          <div className={styles["order-details"]}>
            <div className={styles["order-image"]}>
              <img src="/img/item-mock.png" alt="" />
            </div>
            <div className={styles["details"]}>
              <div className={styles["title"]}>Masahiro Distillery</div>
              {/*<ProductPrice />*/}
            </div>
          </div>

          <div className={styles["confirm-desc"]}>
            Please type <b>30.00 SOL</b> to confirm that you accept the bid at 30.00 SOL, which is 54.55% of listing
            price.
          </div>

          <Input value="" onChange={() => {}} />
        </div>
      ),
    },
  ];

  const selectedStep = STEPS[step];

  return (
    <div className={styles["make-collection-offer-modal"]}>
      <div className={styles["modal-header"]}>
        <div className={styles["modal-title"]}>{selectedStep.title}</div>

        <div className={styles["back-btn"]} onClick={onDismiss}>
          <ArrowBack />
        </div>

        <div className={styles["close-btn"]} onClick={onDismiss}>
          <CloseXIcon />
        </div>

        <div
          className={styles["progress-bar"]}
          style={{
            width: `${((step + 1) / STEPS.length) * 100}%`,
          }}
        />
      </div>

      <div className={styles["modal-body"]}>{selectedStep.body}</div>

      <div className={styles["modal-footer"]}>
        {selectedStep.secondary}

        {selectedStep.primary}
      </div>
    </div>
  );
};
