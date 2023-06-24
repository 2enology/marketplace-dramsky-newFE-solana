import React, {FC, useState} from "react";
import styles from "./InputQuantity.module.scss";
import cn from "classnames";
import {MinusIcon, PlusIcon} from "../Icons/Icons";
import {Input} from "../Input/Input";

type Props = {};

export const InputQuantity: FC<Props> = ({}) => {
  const [value, setValue] = useState("");

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["label"]}>Quantity</div>

      <div className={styles["input-quantity"]}>
        <div
          className={cn(styles["minus"], styles["button"])}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MinusIcon />
        </div>

        <div
          className={cn(styles["plus"], styles["button"])}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <PlusIcon />
        </div>

        <Input value={value} onChange={(e) => setValue(e.target.value)} type="number" />
      </div>
    </div>
  );
};
