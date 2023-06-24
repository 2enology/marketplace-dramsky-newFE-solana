import React, {FC} from "react";
import styles from "./AppHeader.module.scss";
import {useRouter} from "next/router";
import Image from "next/image";
import Logo from "./Logo.png";
import {HeaderInputSearch} from "./HeaderInputSearch/HeaderInputSearch";
import {HeaderBrands} from "./HeaderBrands/HeaderBrands";
import {HeaderButtons} from "./Buttons/HeaderButtons";
import cn from "classnames";
import {AnnouncementIcon, BurgerIcon, SearchIcon} from "../../../components/Icons/Icons";
import {useModal} from "../../../hooks/use-modal";
import {MobileCategoryModal} from "./MobileCategoryModal/MobileCategoryModal";

type Props = {};

export const AppHeader: FC<Props> = ({}) => {
  const router = useRouter();
  const {modalService} = useModal();

  return (
    <div className={styles["header-wrapper"]}>
      {router.pathname == "/" && (
        <div className={styles["announcement"]}>
          <AnnouncementIcon />
          You can now sell items to our website. <span>Get started</span>
        </div>
      )}

      <div className={styles["header"]}>
        <div className={cn("container", styles["header-container"])}>
          <Image
            src={Logo}
            alt="Logo"
            className={styles["logo"]}
            width={153}
            height={40}
            onClick={() => router.push("/")}
            priority
          />

          <HeaderInputSearch className={styles["header-input-search"]} />

          <div className={styles["right-action"]}>
            <HeaderBrands className={styles["brands"]} />

            <HeaderButtons />
          </div>

          <div className={styles["mobile-actions"]}>
            <div className={styles["search-button"]}>
              <SearchIcon />
            </div>

            <div
              className={styles["menu-button"]}
              onClick={() => {
                const modal = modalService.openModal({
                  component: <MobileCategoryModal onClose={() => modal.close()} />,
                  className: "right-slider-animation",
                  width: "100%",
                });
              }}
            >
              <BurgerIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
