import React, {FC, useState} from "react";
import styles from "./Collapsible.module.scss";
import {ChevDownIcon} from "../Icons/Icons";
import cn from "classnames";

type Props = {
  title: string;
  initOpen?: boolean;
};

export const Collapsible: FC<Props> = ({children, title, initOpen}) => {
  const [open, setOpen] = useState(initOpen || false);

  return (
    <div className={styles["collapsible"]}>
      <div className={cn(styles["header"], open && styles["open"])} onClick={() => setOpen(!open)}>
        {title} <ChevDownIcon />
      </div>

      {open && children}
    </div>
  );
};
