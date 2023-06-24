import React, {FC, useState} from "react";
import styles from "./HeaderBrands.module.scss";
import cn from "classnames";
import {BOTTLES, CASKS} from "./brands";
import Link from "next/link";
import {useDebounce} from "../../../../hooks/use-debounce";

type Props = {
  className?: string;
};

export const HeaderBrands: FC<Props> = ({className}) => {
  const [showBrands, setShow] = useState(false);

  const show = useDebounce(showBrands, 100);

  return (
    <>
      <div className={cn(styles["header-brands"], className)}>
        <div
          className={cn(styles["nav-text"], (showBrands || show) && styles["highlighted"])}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          Brands
        </div>
      </div>

      <div
        className={cn(styles["categories-wrapper"], show && styles["show"])}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className={styles["category-box"]}>
          <div className={styles["section"]}>
            <div className={cn(styles["section-title"], "golden-text")}>
              <span>Bottles</span>
            </div>

            <div className={styles["section-list"]}>
              {BOTTLES.map((bottle, index) => (
                <div className={styles["item"]} key={index}>
                  <Link href={bottle.url}>{bottle.label}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className={styles["section"]}>
            <div className={cn(styles["section-title"], "golden-text")}>
              <span>Casks</span>
            </div>

            <div className={styles["section-list"]}>
              {CASKS.map((cask, index) => (
                <div className={styles["item"]} key={index}>
                  <Link href={cask.url}>{cask.label}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
