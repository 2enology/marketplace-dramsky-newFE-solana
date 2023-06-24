import React, {FC, useState} from "react";
import styles from "./OfferAmountInput.module.scss";
import {Select} from "../../../components/Select/Select";
import {Input} from "../../../components/Input/Input";
import cn from "classnames";

type Props = {};

export const OfferAmountInput: FC<Props> = ({}) => {
  const [amount, setAmount] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles["offer-amount-input"]}>
      <div className={styles["label"]}>Offer amount *</div>

      <div className={styles["input-wrapper"]}>
        <Select
          selectValueClassName={cn(styles["select-value"], focus && styles["focusing"])}
          popupClassName={styles["popup"]}
          className={styles["select"]}
          list={["USDT"]}
          value="USDT"
          displayAs={(v) => v}
          onChange={() => {}}
        />
        <Input
          value={amount}
          type="number"
          className={styles["input"]}
          onChange={(e) => setAmount(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
    </div>
  );
};
