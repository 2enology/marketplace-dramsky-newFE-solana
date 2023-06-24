import React, {FC} from "react";
import styles from "./SellerOfferReceived.module.scss";
import {ColumnType, DataTable} from "../../../../components/DataTable/DataTable";
import {ProductPrice} from "../../../../components/ProductPrice/ProductPrice";
import {Button} from "../../../../components/Button/Button";
import {useModal} from "../../../../hooks/use-modal";
import {useWindowSize} from "../../../../hooks/use-window-size";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../../common/constant";
import {useWallet} from "@solana/wallet-adapter-react";
import {api} from "../../../../apis/api";
import {OfferType} from "../../../../apis/offer-api";
import dayjs from "dayjs";
import {AcceptOfferModal} from "../../../ItemPage/ItemDetails/AcceptOfferModal/AcceptOfferModal";

type Props = {};

export const SellerOfferReceived: FC<Props> = ({}) => {
  const {modalService} = useModal();
  const {isMobile} = useWindowSize();
  const {publicKey} = useWallet();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.offer.getOffersReceived, publicKey?.toBase58()],
    enabled: !!publicKey,
    queryFn: async () => {
      const [resp] = await api.offer.getOffersReceived(publicKey?.toBase58() || "");
      return resp;
    },
  });

  const columns: ColumnType[] = [
    {
      header: "NAME",
      render: (row: OfferType) => (
        <div className={styles["name"]}>
          <img className={styles["offer-image"]} src={row.imgUrl} alt="" />

          <div className={styles["offer-details"]}>
            <div className={styles["name"]}>{row.tokenId}</div>
            <div className={styles["id"]}>#1002</div>
          </div>
        </div>
      ),
      width: 150,
    },
    {
      header: "PRICE",
      render: (row: OfferType) => (
        <ProductPrice
          product={{
            solPrice: row.offerPrice > 0 ? row.offerPrice : 0,
            tokenPrice: row.tokenPrice > 0 ? row.offerPrice : 0,
          }}
        />
      ),
    },
    {
      header: "EXPIRES AT",
      render: (row: OfferType) => dayjs(row.expiresAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      header: "FROM",
      render: (row: OfferType) => (
        <div className={styles["from"]}>
          <u>{row.buyer}</u>
        </div>
      ),
      maxWidth: 150,
    },
    {
      header: "",
      render: (row: OfferType) => (
        <Button
          btnType="golden-secondary"
          onClick={() => {
            const modal = modalService.openModal({
              component: <AcceptOfferModal offer={row} onClose={() => modal.close()} />,
              width: isMobile ? "100%" : 600,
              className: isMobile ? "right-slider-animation" : undefined,
            });
          }}
        >
          Accept offer
        </Button>
      ),
    },
  ];

  return (
    <div className={styles["seller-offer-received"]}>
      <DataTable rows={data || []} columns={columns} />
    </div>
  );
};
