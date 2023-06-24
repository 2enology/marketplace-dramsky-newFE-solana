import React, {FC} from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

export type ButtonType = "primary" | "secondary" | "golden-secondary" | "dark";

type Props = {
  btnType: ButtonType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  style?: any;
  size?: "small" | "medium";
};

export const Button: FC<Props> = ({btnType, children, onClick, disabled, className, style, size = "medium"}) => {
  return (
    <button
      className={cn(styles["button"], styles[btnType], className, styles[size])}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
