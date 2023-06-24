import React, {FC, useState} from "react";
import cn from "classnames";
import styles from "./HeaderInputSearch.module.scss";
import {Input} from "../../../../components/Input/Input";
import {HistoryIcon, SearchIcon} from "../../../../components/Icons/Icons";

type Props = {
  className?: string;
};

export const HeaderInputSearch: FC<Props> = ({className}) => {
  const [keyword, setKeyword] = useState("");
  const [focusing, setFocus] = useState(false);

  return (
    <div className={cn(className, styles["header-input-search"])}>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search collections..."
        allowClear
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      />

      <div className={cn(styles["suggestions"], focusing && keyword.length > 0 && styles["show"])}>
        <div className={styles["search-item"]}>
          <HistoryIcon />
          Penfolds 2022 Magill Cellar 3 Shiraz
        </div>

        <div className={styles["search-item"]}>
          <SearchIcon />
          Penfolds <span className={styles["in-catalog"]}>in Brands</span>
        </div>

        <div className={styles["search-item"]}>
          <SearchIcon />
          Penfolds <span className={styles["in-catalog"]}>in Product release</span>
        </div>

        <div className={styles["search-item"]}>
          <SearchIcon />
          Penfolds 2022 Magill Cellar 3 Shiraz
        </div>
      </div>
    </div>
  );
};
