import React, {FC} from "react";
import styles from "./EditProfilePage.module.scss";
import {BackHeaderBar} from "../../components/BackHeaderBar/BackHeaderBar";
import {ProfileIcon} from "../../components/Icons/Icons";
import cn from "classnames";

type Props = {};

export const EditProfilePage: FC<Props> = ({}) => {
  return (
    <div className={styles["edit-profile"]}>
      <BackHeaderBar mobileTitle="Edit Profile" onBack={() => {}} />

      <div className="container">
        <div className={styles["edit-profile-wrapper"]}>
          <div className={styles["left-panel"]}>
            <div className={styles["panel-title"]}>
              <div className={styles["title"]}>Settings</div>
              <div className={styles["desc"]}>Update and manage your account</div>
            </div>

            <div className={cn(styles["tab"], styles["active"])}>
              <ProfileIcon /> Edit Profile
            </div>
          </div>

          <div className={styles["right-panel"]}>
            <div className={styles["panel-title"]}>Edit Profile</div>

          </div>
        </div>
      </div>
    </div>
  );
};
