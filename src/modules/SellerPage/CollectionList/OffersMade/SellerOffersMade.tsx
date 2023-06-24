import React, {FC} from "react";
import styles from "./SellerOffersMade.module.scss";
import {ColumnType, DataTable} from "../../../../components/DataTable/DataTable";
import {
  CancelOfferIcon,
  CheckSuccessFiledIcon,
  ErrorFiledIcon,
  HelpIcon,
  ThumbDownIcon,
} from "../../../../components/Icons/Icons";
import {Tooltip} from "../../../../components/Tooltip/Tooltip";
import {useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../../common/constant";
import {api} from "../../../../apis/api";
import {OfferType} from "../../../../apis/offer-api";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import dayjs from "dayjs";
import {cancelOffer} from "../../../../contexts/scripts";
import {queryClient} from "../../../../pages/_app";
import {toast} from "../../../../components/Toast/Toast";
import {useModal} from "../../../../hooks/use-modal";
import {NFTCard} from "../../../../components/DataTypes";

type Props = {};

export const SellerOffersMade: FC<Props> = ({}) => {
  const {publicKey} = useWallet();
  const {modalService, showConfirmModal} = useModal();
  const anchorWallet = useAnchorWallet();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.offer.getOffersMade, publicKey?.toBase58()],
    enabled: !!publicKey,
    queryFn: async () => {
      const [resp] = await api.offer.getOffersMade(publicKey?.toBase58() || "");
      return resp;
    },
  });

  const columns: ColumnType[] = [
    {
      header: "NAME",
      render: (row: OfferType) => (
        <div className={styles["username-row"]}>
          <img src={row.imgUrl} className={styles["avatar"]} alt="" />
          <div className={styles["name"]}>{row.tokenId}</div>
        </div>
      ),
      width: 150,
      maxWidth: 250,
    },
    {
      header: "STATUS",
      render: (row: OfferType) => {
        if (row.expiresAt > Date.now()) {
          return (
            <div className={styles["offer-status"]}>
              <div className={styles["status-icon"]}>
                <ErrorFiledIcon />
              </div>
              Offer expired
              <Tooltip
                width={231}
                text="Your offer has expired and can’t accepted by the NFT owner anymore"
                className={styles["help-icon"]}
              >
                <HelpIcon />
              </Tooltip>
            </div>
          );
        }
        return (
          <div className={styles["offer-status"]}>
            <div className={styles["status-icon"]}>
              <CheckSuccessFiledIcon />
            </div>
            Live
          </div>
        );
      },
      width: 120,
    },
    {
      header: "OFFER PRICE",
      render: (row: OfferType) => (
        <ProductPrice
          product={{
            tokenPrice: row.tokenPrice ? row.offerPrice : 0,
            solPrice: row.solPrice ? row.offerPrice : 0,
          }}
        />
      ),
    },
    {
      header: "BUY NOW PRICE",
      render: (row: OfferType) => <ProductPrice product={row} />,
    },
    // {
    //   header: "ROYALTIES",
    //   render: () => "0%",
    // },
    {
      header: "EXPIRES AT",
      render: (row: OfferType) => (
        <div>
          {dayjs(row.expiresAt).format("DD/MM/YYYY")},
          <br />
          {dayjs(row.expiresAt).format("HH:mm")}
        </div>
      ),
    },
    {
      header: "",
      render: (row: NFTCard) => (
        <Tooltip text="Cancel Offer" width={100}>
          <button
            className={styles["resin-btn"]}
            onClick={async () => {
              const resp = await showConfirmModal({
                title: "Cancel your offer?",
                description: "Are you sure you want to cancel your offer?",
              });

              if (resp) {
                if (anchorWallet) {
                  const loading = modalService.showLoading({});

                  try {
                    const data = await cancelOffer(anchorWallet, row);
                    const [_, error] = await api.offer.cancelOffer(data);
                    if (!error) {
                      await queryClient.refetchQueries([QUERY_KEYS.offer.getOffersByMintAddr, row.mintAddr]);
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
          >
            <CancelOfferIcon />
          </button>
        </Tooltip>
      ),
      width: 70,
    },
  ];

  return (
    <div className={styles["seller-offers-made"]}>
      <DataTable rows={data || []} columns={columns} />
    </div>
  );
};
