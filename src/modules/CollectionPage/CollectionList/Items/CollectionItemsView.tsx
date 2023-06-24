import React, {FC, useState} from "react";
import ReactDOM from "react-dom";
import styles from "./CollectionItemsView.module.scss";
import {FilterIcon, GridViewIcon, SolanaIcon, GridMoreViewIcon} from "../../../../components/Icons/Icons";
import cn from "classnames";
import {InputSearch} from "../../../../components/Input/InputSearch";
import {PriceRangeSelect} from "../../../../components/PriceRangeSelect/PriceRangeSelect";
import {Select} from "../../../../components/Select/Select";
import {Button} from "../../../../components/Button/Button";
import {useWindowSize} from "../../../../hooks/use-window-size";
import {useModal} from "../../../../hooks/use-modal";
import {CollectionFilterMobile} from "./Filter/CollectionFilterMobile";
import {MOCK_PRODUCTS, ProductListView} from "../../../../components/ProductListView/ProductListView";
import {BuyNowModal} from "./BuyNowModal/BuyNowModal";
import {MakeCollectionOfferModal} from "../../MakeCollectionOfferModal/MakeCollectionOfferModal";

type Props = {};
type FilterState = {
  keyword: string;
  from: number | "";
  to: number | "";
};

export const SORTS_ARRAY = ["Low to High", "High to Low", "Recently Listed"];

export const CollectionItemsView: FC<Props> = () => {
  const [view, setView] = useState<"grid" | "more_grid_item">("grid");
  const [filter, setFilter] = useState<FilterState>({to: "", from: "", keyword: ""});
  const [sort, setSort] = useState("Low to High");
  const {width, isMobile: isMobileWindow} = useWindowSize();
  const {modalService} = useModal();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  const isMobile = width < 1024;

  const openBuyNowModal = (initStep: 1 | 2) => {
    const modal = modalService.openModal({
      component: (
        <BuyNowModal initStep={initStep} selectedProducts={selectedProducts} onDismiss={() => modal.close()} />
      ),
      className: "right-slider-animation",
      width: isMobileWindow ? "100%" : 460,
    });
  };

  const makeCollectionOffer = () => {
    const modal = modalService.openModal({
      component: <MakeCollectionOfferModal onDismiss={() => modal.close()} />,
      width: isMobileWindow ? "100%" : 608,
      className: isMobileWindow ? "right-slider-animation" : undefined,
    });
  };

  return (
    <div className={styles["collection-items-view"]}>
      {!isMobile && (
        <div className={styles["view-type"]}>
          <div className={cn(styles["view"], view == "grid" && styles["active"])} onClick={() => setView("grid")}>
            <GridViewIcon />
          </div>

          <div
            className={cn(styles["view"], view == "more_grid_item" && styles["active"])}
            onClick={() => setView("more_grid_item")}
          >
            <GridMoreViewIcon />
          </div>
        </div>
      )}

      {!isMobile ? (
        <div className={styles["filter-wrapper"]}>
          <div className={styles["left-filter"]}>
            <InputSearch
              value={filter.keyword}
              onChange={(e) => setFilter({...filter, keyword: e.target.value})}
              placeholder="Search items..."
              className={styles["input-search"]}
            />

            <PriceRangeSelect
              range={filter}
              onChange={(updated) => setFilter({...filter, ...updated})}
              unit={<SolanaIcon />}
            />
          </div>

          <div className={styles["right-filter"]}>
            <Select
              list={SORTS_ARRAY}
              value={sort}
              displayAs={(v) => v}
              onChange={(v) => setSort(v)}
              className={styles["sort"]}
            />

            <Button btnType="primary" className={styles["make-offer-btn"]} onClick={makeCollectionOffer}>
              Make Collection Offer
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles["filter-mobile"]}>
          <div className={styles["action-buttons"]}>
            <Button
              btnType="secondary"
              onClick={() => {
                const modal = modalService.openModal({
                  component: <CollectionFilterMobile onClose={() => modal.close()} />,
                  className: "right-slider-animation",
                  width: "100%",
                });
              }}
            >
              <FilterIcon /> Filter
            </Button>

            <Button btnType="primary" onClick={makeCollectionOffer}>
              Make Offer
            </Button>
          </div>

          <InputSearch
            value={filter.keyword}
            onChange={(e) => setFilter({...filter, keyword: e.target.value})}
            placeholder="Search items..."
            className={styles["input-search"]}
          />
        </div>
      )}

      <ProductListView
        viewType={view}
        selectedProducts={selectedProducts}
        onUpdate={(products) => setSelectedProducts(products)}
      />

      {/*{selectedProducts.length > 0 && (*/}
      {/*  <FloatingSelectActions*/}
      {/*    selected={selectedProducts}*/}
      {/*    list={MOCK_PRODUCTS}*/}
      {/*    onPreview={() => {*/}
      {/*      openBuyNowModal(1);*/}
      {/*    }}*/}
      {/*    // submitBtn={*/}
      {/*    //   <Button*/}
      {/*    //     btnType="primary"*/}
      {/*    //     onClick={() => {*/}
      {/*    //       openBuyNowModal(2);*/}
      {/*    //     }}*/}
      {/*    //     disabled={selectedProducts.length == 0}*/}
      {/*    //   >*/}
      {/*    //     Buy Now*/}
      {/*    //   </Button>*/}
      {/*    // }*/}
      {/*    onUpdate={(items) => setSelectedProducts(items)}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};
