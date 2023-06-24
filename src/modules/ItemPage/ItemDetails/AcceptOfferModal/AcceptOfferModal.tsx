import React, {FC, useState} from "react";
import styles from "./AcceptOfferModal.module.scss";
import {ModalTemplate} from "../../../../components/Modals/ModalTemplate";
import {Button} from "../../../../components/Button/Button";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import {Input} from "../../../../components/Input/Input";
import {OfferType} from "../../../../apis/offer-api";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../../common/constant";
import {api} from "../../../../apis/api";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {acceptOffer} from "../../../../contexts/scripts";
import {toast} from "../../../../components/Toast/Toast";
import {useModal} from "../../../../hooks/use-modal";
import {useRouter} from "next/router";

type Props = {
  onClose: () => void;
  offer: OfferType;
};

export const AcceptOfferModal: FC<Props> = ({onClose, offer}) => {
  const unit = offer.solPrice > 0 ? "SOL" : "USDC";
  const offerPrice = offer.solPrice > 0 ? offer.solPrice : offer.tokenPrice;
  const [state, setState] = useState("");
  const anchorWallet = useAnchorWallet();
  const {modalService} = useModal();
  const router = useRouter();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.items.getItemDetails, offer.mintAddr],
    queryFn: async () => {
      const [resp] = await api.items.getItemDetails(offer.mintAddr);
      return resp;
    },
  });

  return (
    <ModalTemplate
      title="Accept offer"
      onDismiss={() => onClose()}
      primaryButton={
        <Button
          btnType="primary"
          disabled={state != offer.offerPrice.toFixed(2).toString()}
          onClick={async () => {
            const loading = modalService.showLoading({});

            if (anchorWallet) {
              try {
                const data = await acceptOffer(anchorWallet, offer);
                if (data) {
                  const [_, error] = await api.offer.acceptOffer(data);
                  if (!error) {
                    toast.show({type: "success", text: "Offer accepted!"});
                    router.push(`/myprofile/my-activity`);
                    loading.close();
                  } else {
                    loading.close();
                  }
                }

                onClose();
              } catch (err) {
                toast.show({type: "alert", text: "There was something wrong with your action. Please try again."});
              }
            }
          }}
        >
          Accept Offer
        </Button>
      }
      secondaryButton={
        <Button btnType="secondary" onClick={() => {}}>
          Cancel
        </Button>
      }
    >
      <div className={styles["accept-offer-body"]}>
        <div className={styles["step-title"]}>You’re about to accept an offer for</div>

        <div className={styles["order-details"]}>
          <div className={styles["order-image"]}>
            <img src={offer.imgUrl} alt="" />
          </div>
          <div className={styles["details"]}>
            <div className={styles["title"]}>{data?.tokenId}</div>
            <ProductPrice product={offer} />
          </div>
        </div>

        <div className={styles["confirm-desc"]}>
          Please type <b>{offer.offerPrice.toFixed(2)}</b>
          &nbsp;to confirm that you accept the bid at {offer.offerPrice.toFixed(2)} {unit}, which is &nbsp;
          {((offer.offerPrice / offerPrice) * 100).toFixed(2)}% of listing price.
        </div>

        <Input value={state} onChange={(e) => setState(e.target.value)} />
      </div>
    </ModalTemplate>
  );
};
