import React, {FC, useState} from "react";
import styles from "./Input.module.scss";
import {CloseXIcon, HistoryIcon, SearchIcon} from "../Icons/Icons";
import cn from "classnames";

export type InputProp = {
  value: string | number;
  onChange: (e: any) => void;
  placeholder?: string;
  allowClear?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: "text" | "number";
  rightIcon?: JSX.Element;
  className?: string;
  disabled?: boolean;
  label?: string;
  error?: any;
};

export const Input: FC<InputProp> = ({
  value = "",
  onChange,
  placeholder,
  allowClear,
  onFocus,
  onBlur,
  type,
  rightIcon,
  className,
  disabled,
  label,
  error,
}) => {
  const [focusing, setFocus] = useState(false);

  return (
    <>
      {label && <div className={styles["label"]}>{label}</div>}

      <div
        className={cn(
          styles["input-wrapper"],
          ((allowClear && value.toString().length > 0) || rightIcon) && styles["has-clear-btn"],
          className,
          error && styles["has-error"]
        )}
      >
        <input
          className={cn(styles["input"])}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          onFocus={() => {
            setFocus(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocus(false);
            onBlur?.();
          }}
          disabled={disabled}
        />

        {rightIcon && <div className={styles["right-icon"]}>{rightIcon}</div>}

        <button
          className={cn(styles["clear-btn"], allowClear && value.toString().length > 0 && focusing && styles["show"])}
          style={{
            pointerEvents: !(allowClear && value.toString().length > 0) ? "none" : "initial",
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onChange({target: {value: ""}});
          }}
        >
          <CloseXIcon />
        </button>
      </div>
    </>
  );
};
