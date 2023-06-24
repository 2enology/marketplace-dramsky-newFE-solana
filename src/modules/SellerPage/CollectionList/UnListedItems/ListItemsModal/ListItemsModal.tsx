import React, {FC, useContext, useState} from "react";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import styles from "./ListItemsModal.module.scss";
import {NFTCard, NFTCardType} from "../../../../../components/DataTypes";
import {Button} from "../../../../../components/Button/Button";
import {ModalTemplate} from "../../../../../components/Modals/ModalTemplate";
import {useWindowSize} from "../../../../../hooks/use-window-size";
import {FeesBoxAlert} from "../../../../../components/FeesBoxAlert/FeesBoxAlert";
import {PreviewProductCard} from "../../../../../components/PreviewProductCard/PreviewProductCard";
import {listNftToWalletForSale} from "../../../../../contexts/scripts";
import {api} from "../../../../../apis/api";
import {toast} from "../../../../../components/Toast/Toast";
import {useModal} from "../../../../../hooks/use-modal";
import {GetNFTDataContext} from "../../../../../contexts/NFTDataProvider";
import {queryClient} from "../../../../../pages/_app";
import {QUERY_KEYS} from "../../../../../common/constant";

type Props = {
  selectedItems: NFTCard[];
  onClose: () => void;
  onDismiss: () => void;
};

export const ListItemsModal: FC<Props> = ({onClose, selectedItems, onDismiss}) => {
  const [items, setItems] = useState(selectedItems);
  const {isMobile} = useWindowSize();
  const anchorWallet = useAnchorWallet();
  const {modalService} = useModal();
  const {reFetchOwnNFTs} = useContext(GetNFTDataContext);
  const [showError, setShowError] = useState(false);

  const handleListFunc = async () => {
    if (items.filter((data) => data.solPrice === 0 && data.tokenPrice === 0).length === 0) {
      if (anchorWallet) {
        const loading = modalService.showLoading({
          title: "Do not close this window",
          description: "After wallet approval, your action will be finished in few seconds",
        });

        try {
          const listedItems = await listNftToWalletForSale(anchorWallet, items);
          if (listedItems) {
            const [resp, error] = await api.items.listItem(listedItems.listData, listedItems.transactions);
            if (!error) {
              await Promise.all([
                queryClient.invalidateQueries({queryKey: [QUERY_KEYS.items.getListedItems]}),
                reFetchOwnNFTs(),
              ]);
              toast.show({type: "success", text: "List item successfully"});
              loading.close();
              onClose();
            } else {
              loading.close();
            }
          }
        } catch (e) {
          toast.show({type: "alert", text: "Cannot list your items, please try again"});
          loading.close();
        }
      }
    } else {
      toast.show({type: "alert", text: "Please input the price"});
    }
  };

  const isValid = () => {
    for (let item of items) {
      if (item.solPrice <= 0 && item.tokenPrice <= 0) return false;
    }

    return true;
  };

  return (
    <ModalTemplate
      fullHeight
      className={styles["list-items-modal"]}
      title={`List item (${items.length})`}
      onDismiss={() => onClose()}
      customFooter={<div className={styles["modal-footer"]}>11111</div>}
      primaryButton={
        <Button
          disabled={items.length == 0}
          btnType="primary"
          onClick={() => {
            setShowError(true);
            if (isValid()) {
              handleListFunc();
            }
          }}
        >
          List Item
        </Button>
      }
      secondaryButton={
        !isMobile ? (
          <Button btnType="secondary" onClick={() => onDismiss()}>
            Cancel
          </Button>
        ) : undefined
      }
    >
      <FeesBoxAlert />

      <div className={styles["items-wrapper"]}>
        {items.map((item) => (
          <PreviewProductCard
            showError={showError}
            product={item}
            onRemove={() => setItems(items.filter((i) => i.tokenId != item.tokenId))}
            onUpdate={(product) =>
              setItems(
                items.map((i) => {
                  if (i.tokenId == item.tokenId) {
                    return product;
                  }

                  return i;
                })
              )
            }
            canUpdatePrice
            key={item.tokenId}
          />
        ))}
      </div>
    </ModalTemplate>
  );
};
