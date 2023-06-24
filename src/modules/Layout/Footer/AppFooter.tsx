import React, {FC} from "react";
import styles from "./AppFooter.module.scss";
import Logo from "../Header/Logo.png";
import Image from "next/image";
import cn from "classnames";
import Link from "next/link";

type Props = {};

export const AppFooter: FC<Props> = ({}) => {
  const MARKETPLACE = [
    {
      label: "Explore",
      url: "/",
    },
    {
      label: "Our Collection",
      url: "/",
    },
    {
      label: "Connect Wallet",
      url: "/",
    },
  ];

  const ABOUT_US = [
    {
      label: "Our Vision",
      url: "/",
    },
    {
      label: "About Us",
      url: "/",
    },
    {
      label: "Features",
      url: "/",
    },
    {
      label: "Roadmap",
      url: "/",
    },
  ];

  return (
    <>
      <footer className={styles["app-footer"]}>
        <div className={styles["circle"]} />
        <div className={styles["bottom-circle"]} />

        <div className={cn("container", styles["app-container"])}>
          <div className={styles["logo-section"]}>
            <Image src={Logo} alt="Dramsky" width={153} height={40} />

            <div className={styles["app-description"]}>A one stop pit for all your whisky investment needs.</div>

            <div className={styles["follow-us"]}>
              Follow us
              <div className={styles["social-icons"]}>
                <TwitterIcon />
                <DiscordIcon />
              </div>
            </div>
          </div>

          <div className={styles["right-section"]}>
            <div className={cn(styles["marketplace"], styles["footer-section"])}>
              <div className={styles["section-title"]}>Marketplace</div>

              {MARKETPLACE.map((place, index) => (
                <div key={index} className={styles["item-wrapper"]}>
                  <Link href={place.url} className={styles["item"]}>
                    {place.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className={styles["footer-section"]}>
              <div className={styles["section-title"]}>About Us</div>

              {ABOUT_US.map((place, index) => (
                <div key={index} className={styles["item-wrapper"]}>
                  <Link href={place.url} className={styles["item"]}>
                    {place.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div className={styles["app-version"]}>
        <div className={cn(styles["terms-container"], "container")}>
          <div className={styles["dramsky-copyright"]}>Dramsky. {new Date().getFullYear()}. All rights reserved.</div>

          <div className={styles["faqs"]}>
            <Link href="/faq" className={styles["link"]}>
              FAQ
            </Link>

            <Link href="/privacy" className={styles["link"]}>
              Privacy Policy
            </Link>

            <Link href="/terms" className={styles["link"]}>
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const TwitterIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24Z"
      fill="#1DA1F2"
    />
    <path
      d="M36 16.5C35.1 16.95 34.2 17.1 33.15 17.25C34.2 16.65 34.95 15.75 35.25 14.55C34.35 15.15 33.3 15.45 32.1 15.75C31.2 14.85 29.85 14.25 28.5 14.25C25.35 14.25 22.95 17.25 23.7 20.25C19.65 20.1 16.05 18.15 13.5 15.15C12.15 17.4 12.9 20.25 15 21.75C14.25 21.75 13.5 21.45 12.75 21.15C12.75 23.4 14.4 25.5 16.65 26.1C15.9 26.25 15.15 26.4 14.4 26.25C15 28.2 16.8 29.7 19.05 29.7C17.25 31.05 14.55 31.8 12 31.5C14.25 32.85 16.8 33.75 19.5 33.75C28.65 33.75 33.75 26.1 33.45 19.05C34.5 18.45 35.4 17.55 36 16.5Z"
      fill="white"
    />
  </svg>
);

const DiscordIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z"
      fill="#404EED"
    />
    <path
      d="M33.3566 15.2408C31.6357 14.4351 29.7903 13.8414 27.8609 13.5014C27.8258 13.4949 27.7906 13.5113 27.7725 13.5441C27.5352 13.9748 27.2723 14.5367 27.0882 14.9784C25.0129 14.6614 22.9483 14.6614 20.9156 14.9784C20.7315 14.5269 20.459 13.9748 20.2207 13.5441C20.2026 13.5124 20.1674 13.496 20.1323 13.5014C18.2039 13.8403 16.3585 14.434 14.6366 15.2408C14.6217 15.2473 14.6089 15.2583 14.6004 15.2725C11.1001 20.6086 10.1412 25.8136 10.6116 30.9541C10.6137 30.9792 10.6275 31.0032 10.6467 31.0186C12.9561 32.7492 15.1932 33.7998 17.3887 34.4962C17.4238 34.5071 17.4611 34.494 17.4834 34.4645C18.0028 33.7407 18.4657 32.9777 18.8627 32.1752C18.8861 32.1282 18.8637 32.0724 18.8158 32.0539C18.0815 31.7696 17.3823 31.4231 16.7097 31.0295C16.6565 30.9978 16.6522 30.9202 16.7012 30.883C16.8427 30.7748 16.9843 30.6622 17.1194 30.5485C17.1439 30.5277 17.178 30.5233 17.2067 30.5364C21.6255 32.595 26.4092 32.595 30.7758 30.5364C30.8046 30.5222 30.8386 30.5266 30.8642 30.5474C30.9993 30.6611 31.1409 30.7748 31.2835 30.883C31.3324 30.9202 31.3292 30.9978 31.276 31.0295C30.6034 31.4307 29.9042 31.7696 29.1688 32.0528C29.1209 32.0714 29.0997 32.1282 29.1231 32.1752C29.5285 32.9766 29.9915 33.7396 30.5013 34.4634C30.5225 34.494 30.5609 34.5071 30.596 34.4962C32.8022 33.7998 35.0392 32.7492 37.3486 31.0186C37.3688 31.0032 37.3816 30.9803 37.3837 30.9551C37.9467 25.0122 36.4408 19.8499 33.3918 15.2736C33.3843 15.2583 33.3715 15.2473 33.3566 15.2408ZM19.5225 27.8241C18.1922 27.8241 17.096 26.5778 17.096 25.0472C17.096 23.5167 18.1709 22.2704 19.5225 22.2704C20.8847 22.2704 21.9703 23.5276 21.949 25.0472C21.949 26.5778 20.8741 27.8241 19.5225 27.8241ZM28.4941 27.8241C27.1638 27.8241 26.0676 26.5778 26.0676 25.0472C26.0676 23.5167 27.1425 22.2704 28.4941 22.2704C29.8563 22.2704 30.9419 23.5276 30.9206 25.0472C30.9206 26.5778 29.8563 27.8241 28.4941 27.8241Z"
      fill="white"
    />
  </svg>
);
