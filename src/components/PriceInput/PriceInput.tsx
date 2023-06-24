import React, {FC, useState} from "react";
import styles from "./PriceInput.module.scss";
import {Select} from "../Select/Select";
import cn from "classnames";
import {Input} from "../Input/Input";
import {SolanaIcon, USDTIcon} from "../Icons/Icons";

type Price = {
  unit: "USDT" | "SOL";
  value: number | null;
};

type Props = {
  price: InputProps;
  onChange: (v: InputProps) => void;
  showError?: boolean;
  label?: string;
  className?: string;
  allowedUnit?: "USDT" | "SOL";
};

type InputProps = {tokenPrice: number; solPrice: number};

const input = (price: InputProps): Price => ({
  unit: price.tokenPrice != 0 ? "USDT" : "SOL",
  value: price.tokenPrice != 0 ? price.tokenPrice : price.solPrice,
});

const output = ({unit, value}: Price): InputProps => {
  if (unit == "SOL") {
    return {
      solPrice: value || 0,
      tokenPrice: 0,
    };
  } else {
    return {
      tokenPrice: value || 0,
      solPrice: 0,
    };
  }
};

export const PriceInput: FC<Props> = ({price, onChange, showError, label, className, allowedUnit}) => {
  const [focus, setFocus] = useState(false);
  const icons = {
    SOL: <SolanaIcon />,
    USDT: <USDTIcon />,
  };

  const formattedPrice = input(price);

  const [selectedUnit, setSelectedUnit] = useState(formattedPrice.unit);

  const isError = showError && (formattedPrice.value === null || formattedPrice.value <= 0);

  return (
    <div className={cn(styles["input-price-wrapper"], className)}>
      {label && <div className={styles["label"]}>{label}</div>}

      <div className={styles["input-price-body"]}>
        <Select
          selectValueClassName={cn(styles["select-value"], focus && styles["focusing"], isError && styles["has-error"])}
          popupClassName={styles["popup"]}
          className={styles["select"]}
          list={allowedUnit ? [allowedUnit] : ["SOL", "USDT"]}
          value={selectedUnit}
          displayAs={(v: "USDT" | "SOL") => (
            <div className={styles["unit-wrapper"]}>
              {icons[v]} {v}
            </div>
          )}
          valueAs={(v: "USDT" | "SOL") => icons[v]}
          onChange={(v: "USDT" | "SOL") => {
            setSelectedUnit(v);
            onChange(output({...formattedPrice, unit: v}));
          }}
        />
        <Input
          value={formattedPrice.value || ""}
          type="number"
          className={styles["input"]}
          onChange={(e) => {
            onChange(output({value: e.target.value == "" ? null : parseFloat(e.target.value), unit: selectedUnit}));
          }}
          placeholder="0.00"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          error={isError}
        />
      </div>
    </div>
  );
};
