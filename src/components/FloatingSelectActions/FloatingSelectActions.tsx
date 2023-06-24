import React, {FC} from "react";
import styles from "./FloatingSelectActions.module.scss";
import {Checkbox} from "../Checkbox/Checkbox";
import {Button, ButtonType} from "../Button/Button";
import {useWindowSize} from "../../hooks/use-window-size";
import cn from "classnames";
import {useMoreActionPopup} from "../../hooks/use-more-action-popup";

export type FloatingActionType = {
  label: string;
  btnType: ButtonType;
  onClick: () => void;
};

type Props = {
  selected: any[];
  list: any[];
  onUpdate: (items: any[]) => void;
  actions: FloatingActionType[];
  onPreview: () => void;
};

export const FloatingSelectActions: FC<Props> = ({selected, list, onUpdate, onPreview, actions}) => {
  const checkboxState = selected.length == 0 ? false : selected.length < list.length ? "indeterminate" : true;
  const {isMobile} = useWindowSize();
  const moreActionPopup = useMoreActionPopup();

  return (
    <div className={styles["floating-select-actions"]}>
      <div className={cn("container", styles["floating-container"])}>
        <div className={styles["floating-wrapper"]}>
          <div
            className={styles["left-select"]}
            onClick={() => {
              if (checkboxState === true) onUpdate([]);
              else {
                onUpdate(list);
              }
            }}
          >
            <Checkbox value={checkboxState} onChange={() => {}} />

            <span>{checkboxState === "indeterminate" ? "Select all items" : "Unselect all items"}</span>
          </div>

          <div className={styles["right-actions"]}>
            {!isMobile && selected.length > 0 && (
              <div className={styles["selected"]} onClick={onPreview}>
                {selected.length} item(s) selected
              </div>
            )}
            <div className={styles["actions-btn"]}>
              {!isMobile ? (
                actions?.map((action, index) => (
                  <Button btnType={action.btnType} onClick={() => action.onClick()} key={index}>
                    {action.label}
                  </Button>
                ))
              ) : (
                <Button
                  btnType="primary"
                  onClick={() => {
                    moreActionPopup.show({actions, heading: `More actions (${selected.length} items)`});
                  }}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
