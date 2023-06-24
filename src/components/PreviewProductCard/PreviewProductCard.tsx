/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import styles from "./PreviewProductCard.module.scss";
import {CloseXIcon} from "../Icons/Icons";
import {NFTCard} from "../DataTypes";
import {ProductPrice} from "../ProductPrice/ProductPrice";
import {PriceInput} from "../PriceInput/PriceInput";

type Props = {
  product: NFTCard;
  onUpdate?: (product: NFTCard) => void;
  onRemove: () => void;
  canUpdatePrice?: boolean;
  showError?: boolean;
};

export const PreviewProductCard: FC<Props> = ({product, onRemove, canUpdatePrice, onUpdate, showError}) => {
  return (
    <div className={styles["product-card"]}>
      <img src={product.imgUrl} className={styles["product-image"]} alt="" />
      <div className={styles["product-details"]}>
        <div className={styles["p-title"]}>
          <div className={styles["title"]}>{product.tokenId}</div>

          <div className={styles["id"]}>#001</div>
        </div>

        {canUpdatePrice ? (
          <PriceInput
            showError={showError}
            price={product}
            onChange={(updated) =>
              onUpdate?.({
                ...product,
                ...updated,
              })
            }
          />
        ) : (
          <ProductPrice className={styles["p-price"]} product={product} />
        )}
      </div>

      <div className={styles["remove-action"]} onClick={onRemove}>
        <CloseXIcon />
      </div>
    </div>
  );
};
