import React, {FC} from "react";
import styles from "./MoreActionsPopup.module.scss";
import {CloseXIcon} from "../Icons/Icons";

export type MActionType = {
  label: string;
  onClick: () => void;
};

export type MoreActionPopupProps = {
  actions: MActionType[];
  heading?: string;
  onClose?: () => void;
};

export const MoreActionsPopup: FC<MoreActionPopupProps> = ({actions, heading, onClose}) => {
  return (
    <div className={styles["more-action-popup"]}>
      <div className={styles["modal-title"]}>
        {heading}

        <div className={styles["close-btn"]} onClick={onClose}>
          <CloseXIcon />
        </div>
      </div>

      <div className={styles["modal-body"]}>
        {actions.map((action, index) => (
          <div
            className={styles["action"]}
            key={index}
            onClick={() => {
              action.onClick();
              onClose?.();
            }}
          >
            {action.label}
          </div>
        ))}
      </div>
    </div>
  );
};
