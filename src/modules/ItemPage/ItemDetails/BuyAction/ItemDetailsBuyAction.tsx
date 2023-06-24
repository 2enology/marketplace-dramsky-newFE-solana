import React, {FC} from "react";
import styles from "./ItemDetailsBuyAction.module.scss";
import {NFTCard} from "../../../../components/DataTypes";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import {Button} from "../../../../components/Button/Button";
import {useModal} from "../../../../hooks/use-modal";
import {MakeItemOfferModal} from "./MakeItemOfferModal";
import {useWindowSize} from "../../../../hooks/use-window-size";
import {useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import {queryClient} from "../../../../pages/_app";
import {OfferType} from "../../../../apis/offer-api";
import {QUERY_KEYS} from "../../../../common/constant";
import {toast} from "../../../../components/Toast/Toast";
import {api} from "../../../../apis/api";
import {purchase} from "../../../../contexts/scripts";

type Props = {
  nftDetails: NFTCard;
};

export const ItemDetailsBuyAction: FC<Props> = ({nftDetails}) => {
  const anchorWallet = useAnchorWallet();
  const {modalService} = useModal();
  const {isMobile} = useWindowSize();
  const {setVisible} = useWalletModal();
  const {publicKey} = useWallet();
  const offers = queryClient.getQueryData<OfferType[]>([QUERY_KEYS.offer.getOffersByMintAddr, nftDetails.mintAddr]);
  const myOffer = (offers || []).find((o) => o.buyer == publicKey?.toBase58());

  const handlePurchaseFunc = async () => {
    console.log("nftData", nftDetails);
    if (anchorWallet) {
      const loading = modalService.showLoading({
        title: "Do not close this window",
        description: "After wallet approval, your action will be finished in few seconds",
      });

      try {
        const purchasedNft = await purchase(anchorWallet, [nftDetails]);
        if (purchasedNft) {
          const [resp, error] = await api.items.purchaseItems(purchasedNft);
          if (!error) {
            loading.close();
            toast.show({
              type: "success",
              text: "purchase items successfully",
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

  if (myOffer) {
    return (
      <div className={styles["buy-action"]}>
        <div className={styles["action-title"]}>
          <div className={styles["label"]}>My Offer</div>

          <div className={styles["current-price"]}>
            <ProductPrice
              product={{
                solPrice: myOffer.solPrice > 0 ? myOffer.offerPrice : 0,
                tokenPrice: myOffer.tokenPrice > 0 ? myOffer.offerPrice : 0,
              }}
            />
          </div>
        </div>

        <Button btnType="secondary" onClick={() => {}} className={styles["full-width"]}>
          CANCEL MY OFFER
        </Button>
      </div>
    );
  }

  return (
    <div className={styles["buy-action"]}>
      <div className={styles["action-title"]}>
        <div className={styles["label"]}>Listing Price</div>

        <div className={styles["current-price"]}>
          <ProductPrice product={nftDetails} />
        </div>
      </div>

      <div className={styles["actions"]}>
        <Button btnType="golden-secondary" onClick={() => handlePurchaseFunc()}>
          Buy now
        </Button>

        <Button
          btnType="primary"
          onClick={() => {
            if (publicKey) {
              const modal = modalService.openModal({
                component: <MakeItemOfferModal nftDetails={nftDetails} onClose={() => modal.close()} />,
                width: isMobile ? "100%" : 608,
                className: isMobile ? "right-slider-animation" : undefined,
              });
            } else {
              setVisible(true);
            }
          }}
        >
          Make offer
        </Button>
      </div>
    </div>
  );
};
