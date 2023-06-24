import React, {FC} from "react";
import styles from "./ProductPrice.module.scss";
import {SolanaIcon, USDTIcon} from "../Icons/Icons";
import cn from "classnames";
import {NFTCard} from "../DataTypes";

type Props = {
  className?: string;
  product: {
    tokenPrice: number;
    solPrice: number;
  };
};

export const ProductPrice: FC<Props> = ({product, className}) => {
  return (
    <div className={cn(styles["product-price"], className)}>
      {product.tokenPrice > 0 ? <USDTIcon /> : <SolanaIcon />} &nbsp;
      {(product.tokenPrice > 0 ? product.tokenPrice : product.solPrice).toFixed(2)}
    </div>
  );
};
