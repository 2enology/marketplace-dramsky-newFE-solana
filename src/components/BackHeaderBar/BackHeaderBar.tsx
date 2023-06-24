import React, {FC} from "react";
import {useWindowSize} from "../../hooks/use-window-size";
import styles from "./BackHeaderBar.module.scss";
import {ArrowBack} from "../Icons/Icons";

type Props = {
  mobileTitle: string;
  desktopTitle?: string;
  onBack: () => void;
};

export const BackHeaderBar: FC<Props> = ({mobileTitle, desktopTitle, onBack}) => {
  const {width} = useWindowSize();

  if ((width || Infinity) < 1024) {
    return (
      <div className={styles["back-mobile-header"]}>
        <ArrowBack onClick={onBack} />
        <div className={styles["title"]}>{mobileTitle}</div>
      </div>
    );
  }

  if (!desktopTitle) {
    return null;
  }

  return (
    <div className="container">
      <button className={styles["back-btn"]} onClick={onBack}>
        <ArrowBack /> {desktopTitle}
      </button>
    </div>
  );
};
