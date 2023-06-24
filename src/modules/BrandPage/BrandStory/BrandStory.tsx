/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import styles from "./BrandStory.module.scss";
import cn from "classnames";

type Props = {};

export const BrandStory: FC<Props> = ({}) => {
  return (
    <div className="container">
      <div className={styles["brand-story"]}>
        <div className={styles["image-content"]}>
          <img src="img/brands/mashiroBrand.png" alt="" />
        </div>

        <div className={styles["slick-dots"]}>
          <div className={styles["dot"]} />
          <div className={cn(styles["dot"], styles["active"])} />
          <div className={styles["dot"]} />
        </div>

        <div className={styles["story"]}>
          <h2 className={cn(styles["story-title"], "golden-text")}>
            <span>Masahiro Brand Story</span>
          </h2>

          <div className={styles["story-full"]}>
            <p>
              Masahiro Distillery was founded in 1883 by Shobun Higa, his father Shozoku Higa was the master chef of the
              former Ryukyu Kingdom. With the help of his enormous reputation and family connections, Shozoku Higa
              gained the trust to be licensed as a distillery to make the traditional Okinawan spirit “awamori” and has
              since established itself as one of the oldest distilleries. and Okinawan greats.
            </p>
            <p>
              Shozoku’s passion for cooking can be found alive today in the philosophy of the Masahiro Distillery
              company of producing only by hand and with the highest quality. Reinforcing tradition with the most modern
              business philosophy, Masahiro Distillery is Okinawa’s first distillery to be certified to ISO 9001 (the
              international standard for a quality management system).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
