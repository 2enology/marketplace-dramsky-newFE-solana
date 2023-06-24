import React, {FC} from "react";
import styles from "./ModalTemplate.module.scss";
import {ArrowBack, CloseXIcon} from "../Icons/Icons";
import cn from "classnames";

type Props = {
  title: any;
  primaryButton?: JSX.Element;
  secondaryButton?: JSX.Element;
  onDismiss: () => void;
  customFooter?: JSX.Element;
  className?: string;
  fullHeight?: boolean;
};

export const ModalTemplate: FC<Props> = ({
  title,
  primaryButton,
  secondaryButton,
  onDismiss,
  children,
  customFooter,
  className,
  fullHeight,
}) => {
  return (
    <div className={cn(styles["modal-template"], className, fullHeight && styles["full-height"])}>
      <div className={styles["modal-header"]}>
        <div className={styles["modal-title"]}>{title}</div>

        <div className={styles["back-btn"]} onClick={onDismiss}>
          <ArrowBack />
        </div>

        <div className={styles["close-btn"]} onClick={onDismiss}>
          <CloseXIcon />
        </div>
      </div>

      <div className={styles["modal-body"]}>{children}</div>

      <div className={cn(styles["modal-footer"], !secondaryButton && styles["btn-full-width"])}>
        {secondaryButton}
        {primaryButton}
      </div>
    </div>
  );
};
