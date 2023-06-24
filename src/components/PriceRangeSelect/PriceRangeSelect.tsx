import React, {FC, useRef, useState} from "react";
import styles from "./PriceRangeSelect.module.scss";
import {ChevDownIcon} from "../Icons/Icons";
import {Input} from "../Input/Input";
import cn from "classnames";
import {useOnClickOutside} from "../../hooks/use-onclick-outside";

type Props = {
  range: {from: number | ""; to: number | ""};
  onChange: (filter: {from: number | ""; to: number | ""}) => void;
  unit?: JSX.Element;
  className?: string;
};

export const PriceRangeSelect: FC<Props> = ({range, onChange, unit, className}) => {
  const [openPopup, toggleOpenPopup] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleOpenPopup(false));

  return (
    <div className={cn(styles["price-range-select"], className)} ref={ref}>
      <div className={cn(styles["select"], openPopup && styles["open"])} onClick={() => toggleOpenPopup(true)}>
        Price Range <ChevDownIcon />
      </div>

      <div className={cn(styles["popup"], openPopup && styles["open"])}>
        <div className={styles["item"]}>
          <div className={styles["label"]}>Minimum</div>

          <Input
            value={range.from}
            onChange={(e) => onChange({...range, from: e.target.value})}
            rightIcon={unit}
            type="number"
            placeholder="Price"
          />
        </div>

        <div className={styles["item"]}>
          <div className={styles["label"]}>Maximum</div>

          <Input
            value={range.to}
            onChange={(e) => onChange({...range, to: e.target.value})}
            rightIcon={unit}
            type="number"
            placeholder="Price"
          />
        </div>
      </div>
    </div>
  );
};
