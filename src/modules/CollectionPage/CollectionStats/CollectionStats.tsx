import React, {FC} from "react";
import styles from "./CollectionStats.module.scss";
import {SolanaIcon} from "../../../components/Icons/Icons";
import cn from "classnames";
import {NFTMetaData} from "../../../components/DataTypes";

type Props = {
  nftMetaData: NFTMetaData;
};

export const CollectionStats: FC<Props> = ({nftMetaData}) => {
  const COLLECTION_VOL_INFO = [
    [
      {
        label: "Floor",
        value: 10.89,
        unit: <SolanaIcon />,
      },
      {
        label: "Avg. Sale Monthly",
        value: 258.55,
        unit: <SolanaIcon />,
      },
      {
        label: "Listed",
        value: 40,
      },
    ],
    [
      {
        label: "Total Vol",
        value: 457,
        unit: <SolanaIcon />,
      },
      {
        label: "Owners",
        value: 190,
      },
      {
        label: "Total Supply",
        value: 264,
      },
    ],
  ];

  return (
    <div className={styles["collection-stats"]}>
      <div className={styles["vol-name-section"]}>
        {COLLECTION_VOL_INFO.map((section, index) => (
          <div className={styles["vol-section"]} key={index}>
            {section.map((item, index) => (
              <div className={styles["item"]} key={index}>
                <div className={styles["item-title"]}>{item.label}</div>

                <div className={styles["item-value"]}>
                  {item.unit} {item.value}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <CollectionBrandInfo nftMetaData={nftMetaData} />
    </div>
  );
};

const getCollectionBrandInfo = (
  metaData: NFTMetaData
): {label: string; value?: string; isTitle?: boolean; className?: string}[][] => {
  return [
    [
      {
        label: "Brand",
        value: metaData.attributes.find((a) => a.trait_type == "Brand")?.value,
        isTitle: true,
      },
      {
        label: "Age",
        value: "2009",
      },
      {
        label: "Type",
        value: "Single Malt Scotch Whisky",
        className: "double-width",
      },
    ],
    [
      {
        label: "Cask type",
        value: metaData.attributes.find((a) => a.trait_type == "Cask type")?.value,
      },
      {
        label: "Size",
        value: metaData.attributes.find((a) => a.trait_type == "Size")?.value,
      },
      {
        label: "ABV",
        value: metaData.attributes.find((a) => a.trait_type == "ABV")?.value,
      },
      {
        label: "Region",
        value: metaData.attributes.find((a) => a.trait_type == "Region")?.value,
      },
    ],
  ];
};

export const CollectionBrandInfo = ({nftMetaData}: {nftMetaData: NFTMetaData}) => (
  <div className={styles["brand-name-section"]}>
    {getCollectionBrandInfo(nftMetaData).map((row, index) => (
      <div className={styles["row"]} key={index}>
        {row.map((item, index) => (
          <div className={cn(styles["box"], item.className && styles[item.className])} key={index}>
            <div className={styles["box-title"]}>{item.label}</div>

            <div className={cn(styles["value"], item.isTitle && "golden-text", item.isTitle && styles["brand-title"])}>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
