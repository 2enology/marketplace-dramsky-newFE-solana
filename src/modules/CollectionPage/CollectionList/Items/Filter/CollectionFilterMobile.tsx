import React, {FC, useState} from "react";
import styles from "./CollectionFilterMobile.module.scss";
import {CloseXIcon, SolanaIcon} from "../../../../../components/Icons/Icons";
import {Button} from "../../../../../components/Button/Button";
import {Collapsible} from "../../../../../components/Collapsible/Collapsible";
import {SORTS_ARRAY} from "../CollectionItemsView";
import {Checkbox} from "../../../../../components/Checkbox/Checkbox";
import cn from "classnames";
import {Input} from "../../../../../components/Input/Input";

type Props = {
  onClose: () => void;
};

export const CollectionFilterMobile: FC<Props> = ({onClose}) => {
  const [sort, setSort] = useState(SORTS_ARRAY[0]);
  const [range, setRange] = useState({from: "", to: ""});

  return (
    <div className={styles["collection-filter-mobile"]}>
      <div className={styles["modal-header"]}>
        <button className={styles["close-btn"]} onClick={onClose}>
          <CloseXIcon />
        </button>
        Filters
      </div>

      <div className={styles["modal-body"]}>
        <Collapsible title="Sort by" initOpen={true}>
          {SORTS_ARRAY.map((sortItem, index) => (
            <div className={styles["sort-item"]} key={index} onClick={() => setSort(sortItem)}>
              {sortItem}{" "}
              <div className={styles["checkbox-wrapper"]}>
                <Checkbox value={sortItem == sort} onChange={() => {}} />
              </div>
            </div>
          ))}
        </Collapsible>

        <Collapsible title="Price Range" initOpen={true}>
          <div className={styles["price-range-wrapper"]}>
            <div className={styles["item"]}>
              <div className={styles["label"]}>Minimum</div>

              <Input
                value={range.from}
                onChange={(e) => setRange({...range, from: e.target.value})}
                rightIcon={<SolanaIcon />}
                type="number"
                placeholder="Price"
              />
            </div>

            <div className={styles["item"]}>
              <div className={styles["label"]}>Maximum</div>

              <Input
                value={range.to}
                onChange={(e) => setRange({...range, to: e.target.value})}
                rightIcon={<SolanaIcon />}
                type="number"
                placeholder="Price"
              />
            </div>
          </div>
        </Collapsible>
      </div>

      <div className={styles["modal-footer"]}>
        <a className={styles["reset"]}>Reset all</a>

        <Button btnType="primary" onClick={() => {}}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};
