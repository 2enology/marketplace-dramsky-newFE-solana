/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import {BrandOverview} from "./BrandOverview/BrandOverview";
import styles from "./BrandPage.module.scss";
import {BackHeaderBar} from "../../components/BackHeaderBar/BackHeaderBar";
import {BrandStory} from "./BrandStory/BrandStory";
import {OurCollections} from "./OurCollections/OurCollections";

type Props = {};

export const BrandPage: FC<Props> = ({}) => {
  return (
    <div className={styles["brand-page"]}>
      <BackHeaderBar desktopTitle="Back" mobileTitle="Masahiro" onBack={() => {}} />
      <BrandOverview />

      <img className={styles["brand-banner"]} src="/img/brands/brandsBar.png" alt="" />

      <BrandStory />
      <OurCollections />
    </div>
  );
};
