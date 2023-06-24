/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import styles from "./ProductCard.module.scss";
import {SolanaIcon} from "../Icons/Icons";
import {formatNumber} from "../../common/common-util";
import cn from "classnames";
import {Checkbox} from "../Checkbox/Checkbox";
import {useRouter} from "next/router";
import {useWindowSize} from "../../hooks/use-window-size";
import {NFTCard, NFTCardType} from "../DataTypes";
import {ProductPrice} from "../ProductPrice/ProductPrice";

type Props = {
  smallImage?: boolean;
  isSelected?: boolean;
  toggleSelect: (isSelected: boolean) => void;
  imageHeight?: number;
  product: NFTCard;
  unListed?: boolean;
};

export const ProductCard: FC<Props> = ({smallImage, isSelected, toggleSelect, imageHeight, product, unListed}) => {
  const router = useRouter();
  const {isMobile} = useWindowSize();

  return (
    <div
      className={cn(styles["product-card"], isSelected && styles["selected"])}
      onClick={() => {
        router.push(`/collection/${product.collectionAddr}/${product.mintAddr}`);
      }}
    >
      <div
        className={cn(styles["product-image"], smallImage && styles["small"])}
        style={{
          height: !isMobile ? imageHeight : "",
        }}
      >
        <img src={product?.imgUrl} alt="" />
      </div>
      <div className={styles["product-details"]}>
        <div className={styles["p-title"]}>{product?.tokenId}</div>

        <div className={styles["p-category"]}>#001</div>

        {!unListed ? <ProductPrice product={product} /> : <div className={styles["unlisted"]}>Unlisted</div>}
      </div>

      <div className={cn(styles["select-overlay"], isSelected && styles["selected"])} />

      <Checkbox value={!!isSelected} onChange={(v) => toggleSelect(v)} className={styles["checkbox"]} />
    </div>
  );
};
