import React, {FC} from "react";
import styles from "./ProductListView.module.scss";
import {ProductCard} from "../ProductCard/ProductCard";
import cn from "classnames";
import {NFTCard, NFTCardType} from "../DataTypes";

export type ProductViewType = "grid" | "more_grid_item";

type Props = {
  viewType: ProductViewType;
  selectedProducts: any[];
  onUpdate: (products: any[]) => void;
  imageHeight?: number;
  products?: NFTCardType[] | null;
  unListed?: boolean;
};

export const ProductListView: FC<Props> = ({viewType, selectedProducts, onUpdate, imageHeight, products, unListed}) => {
  if (products === null) {
    return (
      <div className={cn(styles["product-list-view"], styles[viewType])}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div className={styles["loading-product-card"]} key={index}>
            <div className={styles["loading-image"]} />
            <div className={styles["loading-content-wrapper"]}>
              <div className={styles["loading-title"]} />
              <div className={styles["loading-rank"]} />
              <div className={styles["loading-price"]} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(styles["product-list-view"], styles[viewType])}>
      {(products || MOCK_PRODUCTS).map((product: any) => (
        <ProductCard
          unListed={unListed}
          product={product}
          imageHeight={imageHeight}
          key={product.tokenId}
          smallImage={viewType == "more_grid_item"}
          isSelected={(selectedProducts || []).includes(product.tokenId)}
          toggleSelect={(isSelected) => {
            if (isSelected) onUpdate(selectedProducts.concat(product.tokenId));
            else onUpdate(selectedProducts.filter((p) => p != product.tokenId));
          }}
        />
      ))}
    </div>
  );
};

export const MOCK_PRODUCTS = [
  {
    tokenId: "COMPENDIUM SPIRITS HOM # 123",
    listed: false,
    collectionName: "BUkBCric9JJwaquvrZfKGG9NTHgGKbWmigU5kaC7dF42",
    collectionAddress: "BUkBCric9JJwaquvrZfKGG9NTHgGKbWmigU5kaC7dF42",
    imgUrl: "https://arweave.net/rfl8UkQ00RklB_QzjbAKC-vCUQIOhT2GqD0G86kYVik?ext=png",
    mintAddr: "3ZXP7x2xsD97qqE2h2k5Es1TiTZYesfrXh2Swu3Z8dUV",
    metaDataUrl: "https://arweave.net/eKTdmzP63Rh4AT0OGDaO1lOWJZWrQJfyVD6dzpeyWxU",
    solPrice: 0,
    tokenPrice: 0,
  },
  {
    tokenId: "COMPENDIUM SPIRITS HOM # 223",
    listed: false,
    collectionName: "CdAfRMFZMmHSoPSRYxfnAbQej9Y8ZEk4mZFEiNmTvyum",
    collectionAddress: "CdAfRMFZMmHSoPSRYxfnAbQej9Y8ZEk4mZFEiNmTvyum",
    imgUrl: "https://arweave.net/1Ef5VdNs4w3QOUOLwyQ0-_LDbrlioU5gGhozVL7hb1M?ext=png",
    mintAddr: "3FqJm7V9kqdZ6zdv42bYkr3Dea4F59sUQQcFmSxW768N",
    metaDataUrl: "https://arweave.net/pKdXXfYRync6bVV5E9RRtr7uojTMxyAE87bP9bt4rIc",
    solPrice: 0,
    tokenPrice: 0,
  },
  {
    tokenId: "COMPENDIUM SPIRITS HOM # 325",
    listed: false,
    collectionName: "GDwwpScBdcVsfk4nVsRshmsXnrmZw3wvmcmQKX2KYZ5M",
    collectionAddress: "GDwwpScBdcVsfk4nVsRshmsXnrmZw3wvmcmQKX2KYZ5M",
    imgUrl: "https://arweave.net/Kjf3Ru4SpeD9_-NzaPmCGqS4xtlY59Av5J3K50H2orI?ext=png",
    mintAddr: "23RqURUoWNMYJ9fgvdmBJv6LSfmFFJnrJx5NFgJdHhVg",
    metaDataUrl: "https://arweave.net/xn0zvBYkAVonAUTIAnLKD9hy1et_aliMVDT5aYpy3DY",
    solPrice: 0,
    tokenPrice: 0,
  },
];
