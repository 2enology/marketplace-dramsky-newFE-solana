import React, {FC} from "react";
import styles from "./Checkbox.module.scss";
import {CheckedIcon, MinusIcon} from "../Icons/Icons";
import cn from "classnames";

type Props = {
  value: boolean | "indeterminate";
  onChange: (v: boolean) => void;
  className?: string;
};

export const Checkbox: FC<Props> = ({value, onChange, className}) => {
  return (
    <div
      className={cn(styles["checkbox"], value && styles["checked"], className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(!value);
      }}
    >
      {value == "indeterminate" ? <MinusIcon /> : <CheckedIcon />}
    </div>
  );
};
