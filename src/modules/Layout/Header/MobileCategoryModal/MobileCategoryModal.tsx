import React, {FC, useState} from "react";
import styles from "./MobileCategoryModal.module.scss";
import {ChevDownIcon, CloseXIcon} from "../../../../components/Icons/Icons";
import cn from "classnames";
import {BOTTLES, CASKS} from "../HeaderBrands/brands";
import {HeaderButtons} from "../Buttons/HeaderButtons";
import Link from "next/link";

type Props = {
  onClose: () => void;
};

export const MobileCategoryModal: FC<Props> = ({onClose}) => {
  return (
    <div className={styles["mobile-category-modal"]}>
      <div className={styles["modal-header"]}>
        <button className={styles["close-btn"]} onClick={onClose}>
          <CloseXIcon />
        </button>
      </div>

      <div className={styles["modal-body"]}>
        <CategorySection title="Bottles" list={BOTTLES} onClose={onClose} />
        <CategorySection title="Casks" list={CASKS} onClose={onClose} />
      </div>

      <div className={styles["modal-footer"]}>
        <HeaderButtons isMobile />
      </div>
    </div>
  );
};

const CategorySection: FC<Props & {title: string; list: {label: string; url: string}[]}> = ({onClose, title, list}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles["cate"]}>
      <div className={cn(styles["cat-title"], open && styles["open"])} onClick={() => setOpen(!open)}>
        <span>{title}</span> <ChevDownIcon />
      </div>

      {open && (
        <div className={styles["cat-list"]}>
          {list.map((item, index) => (
            <div className={styles["cat-item"]} key={index}>
              <Link href={item.url}>{item.label}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
