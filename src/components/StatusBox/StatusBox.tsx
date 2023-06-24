import React, {FC} from "react";
import styles from "./StatusBox.module.scss";
import cn from "classnames";

type Props = {
  statusType: "error";
  text: string;
  className?: string;
};

export const StatusBox: FC<Props> = ({statusType, text, className}) => {
  return (
    <div className={cn(styles["status-box"], styles[statusType], className)}>
      <AlertIcon />

      {text}
    </div>
  );
};

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="white" />
    <path
      d="M11.9995 17C12.2332 17 12.4292 16.921 12.5875 16.7629C12.7458 16.6049 12.825 16.4091 12.825 16.1755C12.825 15.9418 12.746 15.7458 12.588 15.5875C12.4299 15.4292 12.2341 15.35 12.0005 15.35C11.7668 15.35 11.5708 15.429 11.4125 15.5871C11.2542 15.7451 11.175 15.9409 11.175 16.1746C11.175 16.4082 11.254 16.6042 11.4121 16.7625C11.5701 16.9208 11.7659 17 11.9995 17ZM11.325 13.175H12.825V6.85H11.325V13.175ZM12.0066 22C10.6278 22 9.33192 21.7375 8.11915 21.2125C6.90638 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.093 2.7875 15.879C2.2625 14.665 2 13.3678 2 11.9875C2 10.6072 2.2625 9.31003 2.7875 8.09602C3.3125 6.88201 4.02917 5.825 4.9375 4.925C5.84583 4.025 6.90701 3.3125 8.12103 2.7875C9.33503 2.2625 10.6322 2 12.0125 2C13.3928 2 14.69 2.2625 15.904 2.7875C17.118 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6145 22 11.9934C22 13.3723 21.7375 14.6681 21.2125 15.8809C20.6875 17.0936 19.975 18.1526 19.075 19.0579C18.175 19.9632 17.1167 20.6798 15.9 21.2079C14.6833 21.736 13.3855 22 12.0066 22Z"
      fill="#DD4040"
    />
  </svg>
);
