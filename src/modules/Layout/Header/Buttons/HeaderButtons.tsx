import React, {FC, useState} from "react";
import styles from "./HeaderButtons.module.scss";
import {Button} from "../../../../components/Button/Button";
import cn from "classnames";
import {AuthButton} from "../../../../components/AuthButton/AuthButton";

type Props = {
  className?: string;
  isMobile?: boolean;
};

export const HeaderButtons: FC<Props> = ({className, isMobile}) => {
  return (
    <div className={cn(styles["header-buttons"], className, isMobile && styles["mobile-view"])}>
      <Button btnType="secondary" onClick={() => {}}>
        Sell Items
      </Button>

      <AuthButton />
    </div>
  );
};
