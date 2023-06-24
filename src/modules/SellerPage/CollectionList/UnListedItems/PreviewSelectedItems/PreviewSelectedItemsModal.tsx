import React, {FC, useState} from "react";
import styles from "./PreviewSelectedItemsModal.module.scss";
import {CloseXIcon} from "../../../../../components/Icons/Icons";
import {Button} from "../../../../../components/Button/Button";
import {NFTCard} from "../../../../../components/DataTypes";
import {PreviewProductCard} from "../../../../../components/PreviewProductCard/PreviewProductCard";
import {useMoreActionPopup} from "../../../../../hooks/use-more-action-popup";
import {FloatingActionType} from "../../../../../components/FloatingSelectActions/FloatingSelectActions";

type Props = {
  products: NFTCard[];
  onDismiss: () => void;
  actions: FloatingActionType[];
  customSubmitBtn?: {
    label: string;
    onClick: () => Promise<boolean>;
  };
};

export const PreviewSelectedItemsModal: FC<Props> = ({products, onDismiss, actions, customSubmitBtn}) => {
  const moreActionPopup = useMoreActionPopup();
  const [tempProducts, setTempProducts] = useState<NFTCard[]>(products);

  return (
    <div className={styles["preview-selected-items-modal"]}>
      <div className={styles["modal-header"]}>
        <div className={styles["m-title"]}>
          Selected Items <span>({tempProducts.length})</span>
        </div>
        <div className={styles["close-btn"]} onClick={onDismiss}>
          <CloseXIcon />
        </div>
      </div>

      <div className={styles["modal-body"]}>
        {tempProducts.map((product) => (
          <PreviewProductCard
            product={product}
            key={product.tokenId}
            onRemove={() => {
              setTempProducts(tempProducts.filter((p) => p.tokenId != product.tokenId));
            }}
          />
        ))}
      </div>

      <div className={styles["modal-footer"]}>
        <Button btnType="secondary" onClick={onDismiss}>
          Cancel
        </Button>

        {customSubmitBtn ? (
          <Button
            disabled={tempProducts.length == 0}
            btnType="primary"
            onClick={async () => {
              const resp = await customSubmitBtn.onClick();
              if (resp) {
                onDismiss();
              }
            }}
          >
            {customSubmitBtn.label}
          </Button>
        ) : (
          <Button
            btnType="primary"
            onClick={() => {
              moreActionPopup.show({actions, heading: `More actions (${products.length} items)`});
            }}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};
