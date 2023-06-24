import React, {FC, useContext, useState} from "react";
import styles from "./SellerListedItems.module.scss";
import {ProductListView, ProductViewType} from "../../../../components/ProductListView/ProductListView";
import {CollectionItemsFilter} from "../UnListedItems/UnListedItems";
import {GetNFTDataContext} from "../../../../contexts/NFTDataProvider";
import {
  FloatingActionType,
  FloatingSelectActions,
} from "../../../../components/FloatingSelectActions/FloatingSelectActions";
import {waitTimeout} from "../../../../common/common-util";
import {useWindowSize} from "../../../../hooks/use-window-size";
import {PreviewSelectedItemsModal} from "../UnListedItems/PreviewSelectedItems/PreviewSelectedItemsModal";
import {useModal} from "../../../../hooks/use-modal";
import {delistNft} from "../../../../contexts/scripts";
import {useAnchorWallet, useWallet, WalletContextState} from "@solana/wallet-adapter-react";
import {api} from "../../../../apis/api";
import {toast} from "../../../../components/Toast/Toast";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../../common/constant";

type Props = {
  collectionState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export const getWalletID = (wallet: WalletContextState): string => wallet.publicKey?.toBase58() || "";

export const SellerListedItems: FC<Props> = ({collectionState}) => {
  const viewState = useState<ProductViewType>("grid");
  const [view] = viewState;
  const keywordState = useState("");
  const wallet = useWallet();

  const {data: listedNFTs, refetch} = useQuery({
    queryKey: [QUERY_KEYS.items.getListedItems, getWalletID(wallet)],
    staleTime: Infinity,
    enabled: !!wallet.publicKey,
    queryFn: async () => {
      const [resp] = await api.items.getListedItems(getWalletID(wallet));
      if (resp) {
        return resp.map((item) => ({
          ...item,
          listed: true,
          collectionName: "",
        }));
      }

      return [];
    },
  });

  const {reFetchOwnNFTs} = useContext(GetNFTDataContext);
  const [selectedCollection] = collectionState;
  const {isMobile: isMobileWindow} = useWindowSize();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const selectedItemsDetails = (listedNFTs || []).filter((item) => selectedProducts.includes(item.tokenId));
  const {modalService} = useModal();
  const anchorWallet = useAnchorWallet();

  const actions: FloatingActionType[] = [
    {
      label: "Send items",
      onClick: () => {
        console.log("SEND ITEMS");
      },
      btnType: "dark",
    },
    {
      label: "Redeem items",
      onClick: () => {
        console.log("Redeem items");
      },
      btnType: "golden-secondary",
    },
    {
      label: "Unlist Items",
      onClick: async () => {
        if (isMobileWindow) {
          await waitTimeout(400);
        }

        const unListItem = async () => {
          if (anchorWallet) {
            const loading = modalService.showLoading({
              title: "Do not close this window",
              description: "After wallet approval, your action will be finished in few seconds",
            });

            try {
              const deListedNft = await delistNft(anchorWallet, selectedItemsDetails);
              if (deListedNft) {
                const [resp, error] = await api.items.deListItems(deListedNft);
                if (!error) {
                  await Promise.all([refetch(), reFetchOwnNFTs()]);
                  loading.close();
                  toast.show({
                    type: "success",
                    text: "Un listed items successfully",
                  });
                  setSelectedProducts([]);
                  return true;
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

          return false;
        };

        const modal = modalService.openModal({
          component: (
            <PreviewSelectedItemsModal
              products={selectedItemsDetails}
              onDismiss={() => {
                modal.close();
              }}
              actions={[]}
              customSubmitBtn={{
                label: "Unlist Items",
                onClick: async () => unListItem(),
              }}
            />
          ),
          className: "right-slider-animation",
          width: isMobileWindow ? "100%" : 460,
        });
      },
      btnType: "primary",
    },
  ];

  return (
    <div className={styles["seller-listed-items"]}>
      <CollectionItemsFilter
        viewState={viewState}
        keywordState={keywordState}
        selectedCollection={collectionState[0]}
      />

      <ProductListView
        products={
          !listedNFTs
            ? null
            : listedNFTs.filter(
                (item) =>
                  (selectedCollection ? item.collectionAddr == selectedCollection : true) &&
                  item.tokenId.toLowerCase().includes(keywordState[0].toLowerCase())
              )
        }
        imageHeight={180}
        viewType={view}
        selectedProducts={selectedProducts}
        onUpdate={(products) => setSelectedProducts(products)}
      />

      {selectedProducts.length > 0 && (
        <FloatingSelectActions
          selected={selectedProducts}
          list={(listedNFTs || []).map((item) => item.tokenId)}
          onPreview={() => {
            const modal = modalService.openModal({
              component: (
                <PreviewSelectedItemsModal
                  products={selectedItemsDetails}
                  onDismiss={() => modal.close()}
                  actions={actions}
                />
              ),
              className: "right-slider-animation",
              width: isMobileWindow ? "100%" : 460,
            });
          }}
          actions={actions}
          onUpdate={(items) => setSelectedProducts(items)}
        />
      )}
    </div>
  );
};
