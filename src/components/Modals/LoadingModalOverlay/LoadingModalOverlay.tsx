import React, {FC} from "react";
import styles from "./LoadingModalOverlay.module.scss";
import {LoadingIcon} from "../../Icons/Icons";

export type LoadingModalProps = {
  title?: string;
  description?: string;
};

export const LoadingModalOverlay: FC<LoadingModalProps> = ({
  title = "Do not close this window",
  description = "After wallet approval, your action will be finished in few seconds",
}) => {
  return (
    <div className={styles["loading-modal-overlay"]}>
      <div className={styles["loading-icon"]}>
        <LoadingIcon />
      </div>

      <div className={styles["title"]}>{title}</div>

      <div className={styles["description"]}>{description}</div>
    </div>
  );
};
