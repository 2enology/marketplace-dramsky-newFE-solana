import React, {FC} from "react";
import styles from "./Tab.module.scss";
import cn from "classnames";

export type TabItem = {
  label: string;
  id: string;
};

type Props = {
  tabs: TabItem[];
  selectedValue: string;
  onChange: (v: string) => void;
};

export const Tab: FC<Props> = ({tabs, selectedValue, onChange}) => {
  return (
    <div className={styles["tab-wrapper"]}>
      {tabs.map((tab) => (
        <div
          className={cn(styles["tab"], selectedValue == tab.id && styles["selected"])}
          key={tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};
