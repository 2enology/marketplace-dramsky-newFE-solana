import React, {FC} from "react";
import styles from "./FeaturedCollections.module.scss";
import {ProductCard} from "../../../components/ProductCard/ProductCard";
import {MOCK_PRODUCTS} from "../../../components/ProductListView/ProductListView";
import {NFTCardType} from "../../../components/DataTypes";

type Props = {};

export const FeaturedCollections: FC<Props> = ({}) => {
  return (
    <div className={styles["featured-collections"]}>
      <h1 className={styles["section-title"]}>Featured Collections</h1>

      <div className={styles["collections-wrapper"]}>
        {MOCK_PRODUCTS.map((p: any, index) => (
          <ProductCard product={p} key={index} toggleSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};
