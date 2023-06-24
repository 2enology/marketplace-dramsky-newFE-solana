import React, {FC, useRef, useState} from "react";
import styles from "./MoreActionButton.module.scss";
import {Button} from "../Button/Button";
import {ThreeDotsIcon} from "../Icons/Icons";
import {useOnClickOutside} from "../../hooks/use-onclick-outside";
import cn from "classnames";

export type ActionType = {
  title: string;
  onClick: () => void;
};

type Props = {
  actions: ActionType[];
};

export const MoreActionButton: FC<Props> = ({actions}) => {
  const elem = useRef(null);
  const [open, setOpen] = useState(false);
  useOnClickOutside(elem, () => {
    setOpen(false);
  });

  return (
    <div className={styles["more-action-button"]} ref={elem}>
      <Button
        btnType="secondary"
        onClick={() => {
          setOpen(true);
        }}
        className={styles["button"]}
      >
        <ThreeDotsIcon />
      </Button>

      <div className={cn(styles["action-popup"], open && styles["open"])}>
        {actions.map((action, index) => (
          <div
            className={styles["action"]}
            key={index}
            onClick={() => {
              action.onClick();
              setOpen(false);
            }}
          >
            {action.title}
          </div>
        ))}
      </div>
    </div>
  );
};
