import React, {FC, useState} from "react";
import {NFTCard} from "../../../../components/DataTypes";
import {delistNft, updatePrice} from "../../../../contexts/scripts";
import {api} from "../../../../apis/api";
import {toast} from "../../../../components/Toast/Toast";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {useModal} from "../../../../hooks/use-modal";
import styles from "./ItemDetailsUpdatePrice.module.scss";
import {Input} from "../../../../components/Input/Input";
import {Button} from "../../../../components/Button/Button";
import {MoreActionButton} from "../../../../components/MoreActionButton/MoreActionButton";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import {PriceInput} from "../../../../components/PriceInput/PriceInput";
import {useWindowSize} from "../../../../hooks/use-window-size";

type Props = {
  nftDetails: NFTCard;
};

export const ItemDetailsUpdatePrice: FC<Props> = ({nftDetails}) => {
  const anchorWallet = useAnchorWallet();
  const [item, setItem] = useState(nftDetails);
  const {modalService} = useModal();
  const {isMobile} = useWindowSize();

  const handleUpdatePrice = async () => {
    if (anchorWallet) {
      const loading = modalService.showLoading({
        title: "Do not close this window",
        description: "After wallet approval, your action will be finished in few seconds",
      });

      try {
        const updateItem = await updatePrice(anchorWallet, item);
        if (updateItem) {
          const [resp, error] = await api.items.updateItems(updateItem);
          if (!error) {
            toast.show({type: "success", text: "Updated the price successfully"});
            loading.close();
            window.location.reload();
          } else {
            loading.close();
          }
        }
      } catch (e) {
        console.log("error", e);
        toast.show({type: "alert", text: "Cannot update your item, please try again"});
        loading.close();
      }
    }
  };

  const cancelItem = async () => {
    if (anchorWallet) {
      const loading = modalService.showLoading({
        title: "Do not close this window",
        description: "After wallet approval, your action will be finished in few seconds",
      });

      try {
        const deListedNft = await delistNft(anchorWallet, [nftDetails]);
        if (deListedNft) {
          const [resp, error] = await api.items.deListItems(deListedNft);
          if (!error) {
            loading.close();
            toast.show({
              type: "success",
              text: "Cancel items successfully",
            });
            window.location.reload();
          }
        }
      } catch (err) {
        console.log(err);
        loading.close();
        toast.show({
          type: "alert",
          text: "There was problem with your action. Please try again.",
        });
      }
    }
  };

  return (
    <div className={styles["listing-price"]}>
      <div className={styles["label"]}>
        Listing price
        <div className={styles["current-price"]}>
          <ProductPrice product={nftDetails} />
        </div>
      </div>

      <div className={styles["price-wrapper"]}>
        <div className={styles["input"]}>
          <PriceInput
            label="New price"
            price={item}
            onChange={(updated) =>
              setItem({
                ...item,
                ...updated,
              })
            }
          />
        </div>

        <div className={styles["button-wrapper"]}>
          <Button
            btnType="golden-secondary"
            onClick={() => handleUpdatePrice()}
            disabled={!anchorWallet || (item.tokenPrice === 0 && item.solPrice === 0)}
          >
            Update pricing
          </Button>

          {isMobile ? (
            <MoreActionButton
              actions={[
                {
                  title: "Cancel listing",
                  onClick: cancelItem,
                },
              ]}
            />
          ) : (
            <Button btnType="secondary" onClick={cancelItem}>
              Cancel listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
