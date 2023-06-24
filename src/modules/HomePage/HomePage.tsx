import React, {FC} from "react";
import styles from "./HomePage.module.scss";
import BannerImage from "../../../public/img/home/banner-image.png";
import {HomeBannerSection} from "./BannerSection/HomeBannerSection";
import {MonthlyTopCollections} from "./MonthlyTopCollections/MonthlyTopCollections";
import {FeaturedCollections} from "./FeaturedCollections/FeaturedCollections";

type Props = {};

export const HomePage: FC<Props> = ({}) => {
  return (
    <div className={styles["home-page"]}>
      <HomeBannerSection />
      <div className={styles["golden-circle"]} />
      <div className={styles["green-circle"]} />

      <div className="container">
        <MonthlyTopCollections />
        <FeaturedCollections />
      </div>
    </div>
  );
};
