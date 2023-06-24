import React, {FC, useState} from "react";
import styles from "./MakeItemOfferModal.module.scss";
import {NFTCard} from "../../../../components/DataTypes";
import {ArrowBack, CloseXIcon} from "../../../../components/Icons/Icons";
import {ModalTemplate} from "../../../../components/Modals/ModalTemplate";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import {Button} from "../../../../components/Button/Button";
import {OfferAmountInput} from "../../../CollectionPage/MakeCollectionOfferModal/OfferAmountInput";
import {InputQuantity} from "../../../../components/InputQuantity/InputQuantity";
import {Select} from "../../../../components/Select/Select";
import {PriceInput} from "../../../../components/PriceInput/PriceInput";
import {toast} from "../../../../components/Toast/Toast";
import {useModal} from "../../../../hooks/use-modal";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {makeOffer} from "../../../../contexts/scripts";
import {api} from "../../../../apis/api";
import {queryClient} from "../../../../pages/_app";
import {QUERY_KEYS} from "../../../../common/constant";

type Props = {
  nftDetails: NFTCard;
  onClose: () => void;
};

export const MakeItemOfferModal: FC<Props> = ({onClose, nftDetails}) => {
  const anchorWallet = useAnchorWallet();
  const {modalService} = useModal();
  const [item] = useState(nftDetails);
  const [offer, setOffer] = useState({
    solPrice: 0,
    tokenPrice: 0,
    offerExpire: 1,
  });

  const floorPrice = nftDetails.solPrice == 0 ? 0 : nftDetails.solPrice / 2;

  const handleMakeOfferFunc = async () => {
    if (anchorWallet) {
      const loading = modalService.showLoading({
        title: "Do not close this window",
        description: "After wallet approval, your action will be finished in few seconds",
      });
      try {
        const makeOfferItem = await makeOffer(
          anchorWallet,
          item,
          Date.now() + offer.offerExpire * 8.64e7,
          offer.solPrice,
          offer.tokenPrice
        );
        if (makeOfferItem) {
          const [resp, error] = await api.offer.offerItem(makeOfferItem.offerData, makeOfferItem.transaction);
          if (!error) {
            toast.show({type: "success", text: "Offer successfully!"});
            await queryClient.refetchQueries([QUERY_KEYS.offer.getOffersByMintAddr, nftDetails.mintAddr]);
            loading.close();
            onClose();
          } else {
            loading.close();
          }
        }
      } catch (e) {
        console.log("error", e);
        loading.close();
        toast.show({type: "alert", text: "Cannot offer item, please try again"});
        loading.close();
      }
    }
  };

  return (
    <ModalTemplate
      className={styles["make-item-offer-modal"]}
      onDismiss={onClose}
      title="Make offer"
      primaryButton={
        <Button
          btnType="primary"
          onClick={() => handleMakeOfferFunc()}
          disabled={offer.solPrice < floorPrice && offer.tokenPrice < floorPrice}
        >
          Submit
        </Button>
      }
      secondaryButton={
        <Button btnType="secondary" onClick={onClose}>
          Cancel
        </Button>
      }
    >
      <div className={styles["offer-preview"]}>
        <div className={styles["offer-image"]}>
          <img className={styles["image"]} src={nftDetails.imgUrl} alt="" />
          {nftDetails.tokenId}
        </div>

        <div className={styles["offer-total"]}>
          <div className={styles["row"]}>
            <div className={styles["name"]}>Highest offer</div>
            <ProductPrice product={nftDetails} />
          </div>

          <div className={styles["row"]}>
            <div className={styles["name"]}>Floor price</div>
            <ProductPrice
              product={{
                solPrice: nftDetails.solPrice == 0 ? 0 : nftDetails.solPrice / 2,
                tokenPrice: nftDetails.tokenPrice == 0 ? 0 : nftDetails.tokenPrice / 2,
              }}
            />
          </div>

          <div className={styles["row"]}>
            <div className={styles["name"]}>Royalties</div>
            <div className={styles["value"]}>5%</div>
          </div>
        </div>
      </div>

      <div className={styles["marketplace-fee"]}>
        <div className={styles["title"]}>Marketplace fee</div>
        <div className={styles["desc"]}>Place offer amount for this item</div>

        <PriceInput
          allowedUnit={nftDetails.solPrice > 0 ? "SOL" : "USDT"}
          price={offer}
          onChange={(updated) =>
            setOffer({
              ...offer,
              ...updated,
            })
          }
          label="Offer amount*"
        />

        <div className={styles["select-wrapper"]}>
          <Select
            className={styles["select"]}
            selectValueClassName={styles["select-value"]}
            label="Offer expiration"
            list={[1, 3, 7, 30]}
            value={offer.offerExpire}
            displayAs={(v) => {
              if (v == 1) return `${v} day`;
              if (v == 30) return `1 month`;
              return `${v} days`;
            }}
            onChange={(v) =>
              setOffer({
                ...offer,
                offerExpire: v,
              })
            }
          />
        </div>
      </div>
    </ModalTemplate>
  );
};
