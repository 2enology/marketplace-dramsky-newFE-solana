import React, {FC, useState} from "react";
import styles from "./ItemOffers.module.scss";
import {NFTCard} from "../../../components/DataTypes";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../common/constant";
import {api} from "../../../apis/api";
import {ColumnType} from "../../../components/DataTable/DataTable";
import {OfferType} from "../../../apis/offer-api";
import {ProductPrice} from "../../../components/ProductPrice/ProductPrice";
import dayjs from "dayjs";
import {Button} from "../../../components/Button/Button";
import {PaginationDataTable} from "../../../components/DataTable/PaginationDataTable";
import relativeTime from "dayjs/plugin/relativeTime";
import {sortBy} from "lodash";
import {useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import {useModal} from "../../../hooks/use-modal";
import {queryClient} from "../../../pages/_app";
import {useRouter} from "next/router";
import {toast} from "../../../components/Toast/Toast";
import {acceptOffer, cancelOffer} from "../../../contexts/scripts";
import {AcceptOfferModal} from "../ItemDetails/AcceptOfferModal/AcceptOfferModal";
import {useWindowSize} from "../../../hooks/use-window-size";
dayjs.extend(relativeTime);

type Props = {
  nft: any;
};

export const ItemOffers: FC<Props> = ({nft}) => {
  const anchorWallet = useAnchorWallet();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.offer.getOffersByMintAddr, nft.mintAddr],
    queryFn: async () => {
      const [resp] = await api.offer.getOffersByMintAddr(nft.mintAddr);
      return resp;
    },
  });

  const {showConfirmModal, modalService} = useModal();
  const {isMobile} = useWindowSize();

  const {publicKey} = useWallet();

  const columns: ColumnType[] = [
    {
      header: "BUYER",
      width: 220,
      maxWidth: 220,
      render: (row: OfferType) => row.buyer,
    },
    {
      header: "OFFER AMOUNT",
      width: 150,
      render: (row: OfferType) => (
        <ProductPrice
          product={{
            solPrice: nft.solPrice > 0 ? row.offerPrice : 0,
            tokenPrice: nft.tokenPrice > 0 ? row.offerPrice : 0,
          }}
        />
      ),
    },
    {
      header: "CREATED AT",
      render: (row: OfferType) => dayjs(row.createdAt).fromNow(),
    },
    {
      header: "EXPIRE IN",
      render: (row: OfferType) => {
        return new Date(row.expiresAt).getTime() - Date.now() < 0 ? (
          <span style={{color: "#7F7D7A"}}>Expired</span>
        ) : (
          dayjs(row.expiresAt).format("DD/MM/YYYY HH:mm")
        );
      },
    },
    {
      header: "",
      width: 100,
      maxWidth: 100,
      render: (row: OfferType) => {
        if (nft.seller == publicKey?.toBase58()) {
          if (new Date(row.expiresAt).getTime() - Date.now() < 0) return null;

          return (
            <Button
              btnType="golden-secondary"
              size="small"
              onClick={async () => {
                const modal = modalService.openModal({
                  component: (
                    <AcceptOfferModal
                      onClose={() => {
                        modal.close();
                      }}
                      offer={row}
                    />
                  ),
                  width: isMobile ? "100%" : 600,
                  className: isMobile ? "right-slider-animation" : undefined,
                });
              }}
              className={styles["full-width"]}
            >
              Sell for {row.offerPrice} {nft.solPrice > 0 ? "SOL" : "USDC"}
            </Button>
          );
        }

        if (row.buyer == publicKey?.toBase58()) {
          return (
            <Button
              btnType="secondary"
              size="small"
              onClick={async () => {
                const items = data?.filter((item) => item.buyer === publicKey?.toBase58())[0];
                console.log("nft", nft);
                console.log("items", items);
                const resp = await showConfirmModal({
                  title: "Cancel your offer?",
                  description: "Are you sure you want to cancel your offer?",
                });

                if (resp) {
                  if (anchorWallet) {
                    const loading = modalService.showLoading({});

                    try {
                      const data = await cancelOffer(anchorWallet, items);
                      const [_, error] = await api.offer.cancelOffer(data);
                      if (!error) {
                        await queryClient.refetchQueries([QUERY_KEYS.offer.getOffersByMintAddr, nft.mintAddr]);
                        loading.close();
                        toast.show({
                          type: "alert",
                          text: "Cancel successfully!",
                        });
                      } else {
                        loading.close();
                      }
                    } catch (err) {
                      loading.close();
                      toast.show({
                        type: "alert",
                        text: "Cannot cancel your offer. Please try again",
                      });
                    }
                  }
                }
              }}
              className={styles["full-width"]}
            >
              Cancel
            </Button>
          );
        }

        return null;
      },
    },
  ];

  return <PaginationDataTable rows={sortBy(data || [], (d) => -d.offerPrice)} columns={columns} />;
};
