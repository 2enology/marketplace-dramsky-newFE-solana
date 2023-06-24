import React, {FC} from "react";
import styles from "./FeesBoxAlert.module.scss";
import {Input} from "../Input/Input";

type Props = {};

export const FeesBoxAlert: FC<Props> = ({}) => {
  return (
    <div className={styles["fees-box"]}>
      <div className={styles["desc"]}>
        Important: Fees and royalties are critical for the development of Dramsky marketplace and projects as a whole
      </div>

      <div className={styles["fees-input"]}>
        <div className={styles["input-wrapper"]}>
          <div className={styles["label"]}>Creator fees</div>
          <Input value={5} onChange={() => {}} disabled />
        </div>

        <div className={styles["input-wrapper"]}>
          <div className={styles["label"]}>Marketplace fees</div>
          <Input value={5} onChange={() => {}} disabled />
        </div>
      </div>
    </div>
  );
};
