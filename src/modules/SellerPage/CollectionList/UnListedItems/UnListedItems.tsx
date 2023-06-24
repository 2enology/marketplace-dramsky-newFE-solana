import React, {FC, useContext, useState} from "react";
import styles from "./UnListedItems.module.scss";
import {Input} from "../../../../components/Input/Input";
import {GridMoreViewIcon, GridViewIcon, SearchIcon} from "../../../../components/Icons/Icons";
import cn from "classnames";
import {MOCK_PRODUCTS, ProductListView, ProductViewType} from "../../../../components/ProductListView/ProductListView";
import GetNFTDataProvider, {GetNFTDataContext} from "../../../../contexts/NFTDataProvider";
import {
  FloatingActionType,
  FloatingSelectActions,
} from "../../../../components/FloatingSelectActions/FloatingSelectActions";
import {Button} from "../../../../components/Button/Button";
import {useModal} from "../../../../hooks/use-modal";
import {PreviewSelectedItemsModal} from "./PreviewSelectedItems/PreviewSelectedItemsModal";
import {useWindowSize} from "../../../../hooks/use-window-size";
import {ActionType} from "../../../../components/MoreActionButton/MoreActionButton";
import {useMoreActionPopup} from "../../../../hooks/use-more-action-popup";
import {ListItemsModal} from "./ListItemsModal/ListItemsModal";
import {waitTimeout} from "../../../../common/common-util";

type Props = {
  collectionState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export const UnListedItems: FC<Props> = ({collectionState}) => {
  const viewState = useState<ProductViewType>("grid");
  const [view] = viewState;
  const {ownNFTs} = useContext(GetNFTDataContext);
  const [selectedCollection] = collectionState;
  const keywordState = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const {modalService} = useModal();
  const selectedItemsDetails = (ownNFTs || []).filter((item) => selectedProducts.includes(item.tokenId));
  const {width, isMobile: isMobileWindow} = useWindowSize();

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
      label: "List items",
      onClick: async () => {
        if (isMobileWindow) {
          await waitTimeout(400);
        }

        const modal = modalService.openModal({
          component: (
            <ListItemsModal
              selectedItems={selectedItemsDetails}
              onDismiss={() => modal.close()}
              onClose={() => {
                modal.close();
                setSelectedProducts([]);
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
    <div className={styles["un-listed-items"]}>
      <CollectionItemsFilter
        viewState={viewState}
        selectedCollection={selectedCollection}
        keywordState={keywordState}
      />

      <ProductListView
        unListed
        products={
          !ownNFTs
            ? null
            : ownNFTs.filter(
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
          list={(ownNFTs || []).map((item) => item.tokenId)}
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

export const CollectionItemsFilter: FC<{
  viewState: any;
  selectedCollection: string | null;
  keywordState: [string, React.Dispatch<React.SetStateAction<string>>];
}> = ({viewState, selectedCollection, keywordState}) => {
  const [view, setView] = viewState;
  const [keyword, setKeyword] = keywordState;

  return (
    <div className={styles["collection-items-filter"]}>
      <div className={styles["c-name"]}>{selectedCollection}</div>

      <div className={styles["right-filter"]}>
        <div className={cn(styles["desktop-action"], "desktop-only")}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search items..."
            className={styles["input"]}
          />
          <div
            className={cn(styles["grid-icon"], styles["has-margin"], view == "grid" && styles["active"])}
            onClick={() => setView("grid")}
          >
            <GridViewIcon />
          </div>

          <div
            className={cn(styles["grid-icon"], view == "more_grid_item" && styles["active"])}
            onClick={() => setView("more_grid_item")}
          >
            <GridMoreViewIcon />
          </div>
        </div>

        <div className={cn(styles["mobile-action"], "mobile-only")}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
