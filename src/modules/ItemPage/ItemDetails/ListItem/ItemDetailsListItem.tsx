import React, {FC, useState} from "react";
import styles from "./ItemDetailsListItem.module.scss";
import {NFTCard} from "../../../../components/DataTypes";
import {InfoIcon} from "../../../../components/Icons/Icons";
import {PriceInput} from "../../../../components/PriceInput/PriceInput";
import {Button} from "../../../../components/Button/Button";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {useModal} from "../../../../hooks/use-modal";
import {listNftToWalletForSale} from "../../../../contexts/scripts";
import {api} from "../../../../apis/api";
import {toast} from "../../../../components/Toast/Toast";

type Props = {
  nftDetails: NFTCard;
};

export const ItemDetailsListItem: FC<Props> = ({nftDetails}) => {
  const [item, setItem] = useState(nftDetails);
  const anchorWallet = useAnchorWallet();
  const {modalService} = useModal();

  return (
    <div className={styles["item-details-list-item"]}>
      <div className={styles["box-title"]}>
        <InfoIcon /> Not Listed
      </div>

      <div className={styles["box-body"]}>
        <PriceInput
          className={styles["price-input"]}
          label="List Price"
          price={item}
          onChange={(updated) =>
            setItem({
              ...item,
              ...updated,
            })
          }
        />

        <Button
          btnType="primary"
          className={styles["list-btn"]}
          onClick={async () => {
            const loading = modalService.showLoading({
              title: "Do not close this window",
              description: "After wallet approval, your action will be finished in few seconds",
            });

            if (anchorWallet) {
              try {
                const listedItems = await listNftToWalletForSale(anchorWallet, [item]);
                if (listedItems) {
                  const [resp, error] = await api.items.listItem(listedItems.listData, listedItems.transactions);
                  if (!error) {
                    toast.show({type: "success", text: "List item successfully"});
                    loading.close();
                    window.location.reload();
                  } else {
                    loading.close();
                  }
                } else {
                  loading.close();
                }
              } catch (err) {
                toast.show({type: "alert", text: "Cannot list your items, please try again"});
                loading.close();
              }
            }
          }}
          disabled={(item.tokenPrice === 0 && item.solPrice === 0) || !anchorWallet}
        >
          List Now
        </Button>
      </div>

      <div className={styles["box-footer"]}>
        By clicking “List Item”, you agree to <span>Terms of Service</span>
      </div>
    </div>
  );
};
