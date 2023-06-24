import React, {FC, useContext, useState} from "react";
import styles from "./ItemDetails.module.scss";
import {Tab, TabItem} from "../../../components/Tab/Tab";
import {CollectionBrandInfo} from "../../CollectionPage/CollectionStats/CollectionStats";
import {NFTCard, NFTMetaData} from "../../../components/DataTypes";
import {GetNFTDataContext} from "../../../contexts/NFTDataProvider";
import {useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import {ItemDetailsListItem} from "./ListItem/ItemDetailsListItem";
import {ItemDetailsUpdatePrice} from "./UpdatePrice/ItemDetailsUpdatePrice";
import {ItemDetailsBuyAction} from "./BuyAction/ItemDetailsBuyAction";
import {Button} from "../../../components/Button/Button";
import {QueryClient, useQuery} from "react-query";
import {QUERY_KEYS} from "../../../common/constant";
import {api} from "../../../apis/api";
import {queryClient} from "../../../pages/_app";
import {maxBy} from "lodash";
import {OfferType} from "../../../apis/offer-api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {ProductPrice} from "../../../components/ProductPrice/ProductPrice";
import {useModal} from "../../../hooks/use-modal";
import {acceptOffer} from "../../../contexts/scripts";
import {toast} from "../../../components/Toast/Toast";
import {useRouter} from "next/router";
import {AcceptOfferModal} from "./AcceptOfferModal/AcceptOfferModal";
import {useWindowSize} from "../../../hooks/use-window-size";
dayjs.extend(relativeTime);

type Props = {
  nftMetaData: NFTMetaData;
  nftDetails: NFTCard;
  isListed: boolean;
};

export const ItemDetails: FC<Props> = ({nftMetaData, nftDetails, isListed}) => {
  const router = useRouter();
  const [tab, setTab] = useState("Attributes");
  const {collections} = useContext(GetNFTDataContext);
  const {showConfirmModal, modalService} = useModal();
  const {publicKey} = useWallet();
  const {isMobile} = useWindowSize();

  const offers = queryClient.getQueryData<OfferType[]>([QUERY_KEYS.offer.getOffersByMintAddr, nftDetails.mintAddr]);
  const highestOffer = maxBy(
    (offers || []).filter((o) => new Date(o.expiresAt).getTime() > Date.now()),
    (o) => o.offerPrice
  );

  const tabs: TabItem[] = [
    {
      label: "Attributes",
      id: "Attributes",
    },
    {
      label: "NFT Details",
      id: "NFT Details",
    },
  ];

  const handleAcceptHighOfferFunc = async () => {
    const modal = modalService.openModal({
      component: (
        <AcceptOfferModal
          onClose={() => {
            modal.close();
          }}
          offer={highestOffer as OfferType}
        />
      ),
      width: isMobile ? "100%" : 600,
      className: isMobile ? "right-slider-animation" : undefined,
    });
  };

  return (
    <div className={styles["item-details-wrapper"]}>
      <div className={styles["image-section"]}>
        <img src={nftDetails.imgUrl} alt="" />
      </div>

      <div className={styles["item-details-section"]}>
        <div className={styles["author-items-wrapper"]}>
          <div className={styles["creator-details"]}>
            <div className={styles["row"]}>
              <div className={styles["label"]}>Creator:</div>

              <div className={styles["value"]}>
                <div className={styles["avatar"]} />
                <div>Dramsky</div>
              </div>
            </div>

            <div className={styles["row"]}>
              <div className={styles["label"]}>Collection:</div>

              <div className={styles["value"]}>
                <div className={styles["avatar"]} />
                <div>{collections?.find((c) => c.collectionAddr == nftDetails.collectionAddr)?.collectionAddr}</div>
              </div>
            </div>
          </div>

          <div className={styles["item-title"]}>{nftDetails.tokenId}</div>
        </div>

        <Tab tabs={tabs} selectedValue={tab} onChange={(v) => setTab(v)} />

        <CollectionBrandInfo nftMetaData={nftMetaData} />

        {publicKey && publicKey.toBase58() == nftDetails.seller ? (
          <>
            {highestOffer && (
              <div className={styles["highest-offer"]}>
                <div className={styles["label"]}>
                  <div className={styles["title"]}>Highest offer</div>

                  <div className={styles["expires"]}>
                    <span>Expires {dayjs(highestOffer.expiresAt).toNow()}</span>
                    <ProductPrice
                      product={{
                        solPrice: nftDetails.solPrice > 0 ? highestOffer.offerPrice : 0,
                        tokenPrice: nftDetails.tokenPrice > 0 ? highestOffer.offerPrice : 0,
                      }}
                    />
                  </div>
                </div>

                <Button
                  btnType="primary"
                  className={styles["accept-offer"]}
                  onClick={() => handleAcceptHighOfferFunc()}
                >
                  Accept Highest Offer
                </Button>
              </div>
            )}

            {!isListed ? (
              <ItemDetailsListItem nftDetails={nftDetails} />
            ) : (
              <ItemDetailsUpdatePrice nftDetails={nftDetails} />
            )}
          </>
        ) : (
          <ItemDetailsBuyAction nftDetails={nftDetails} />
        )}
      </div>
    </div>
  );
};
