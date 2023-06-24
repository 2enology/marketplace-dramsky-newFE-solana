import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import styles from "./AuthButton.module.scss";
import {Button} from "../Button/Button";
import {useWallet} from "@solana/wallet-adapter-react";
import {useWalletModal, WalletConnectButton, WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {ChevDownIcon, ProfileIcon} from "../Icons/Icons";
import cn from "classnames";
import {useOnClickOutside} from "../../hooks/use-onclick-outside";
import {web3} from "@project-serum/anchor";
import {ProductPrice} from "../ProductPrice/ProductPrice";
import {useRouter} from "next/router";

type Props = {};

export const AuthButton: FC<Props> = ({}) => {
  const {wallet, publicKey} = useWallet();

  if (wallet && publicKey) {
    return <ProfileButton />;
  }

  return <ConnectWalletButton />;
};

const ConnectWalletButton = () => {
  const {setVisible} = useWalletModal();

  return (
    <Button
      btnType="primary"
      onClick={() => {
        setVisible(true);
      }}
    >
      Connect Wallet
    </Button>
  );
};

const ProfileButton = () => {
  const router = useRouter();
  const {disconnect, publicKey} = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58() || "", [publicKey]);
  const [open, setOpen] = useState(false);
  const elem = useRef(null);
  useOnClickOutside(elem, () => setOpen(false));
  const [myBalance, setMyBalance] = useState<number>(0);

  const getBalanceFunc = async () => {
    const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));
    if (publicKey) {
      let balance = await solConnection.getBalance(publicKey);
      setMyBalance(balance / 1000000000);
    }
  };

  useEffect(() => {
    getBalanceFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ACTIONS = [
    {
      label: "My Profile",
      action: () => router.push("/myprofile"),
    },
    {
      label: "Copy Address",
      action: () => {},
    },
    {
      label: <div className={styles["my-balance"]}>Balance ({myBalance.toFixed(2)} SOL)</div>,
      action: () => {},
    },
    {
      label: "Logout",
      action: () => disconnect(),
    },
  ];

  return (
    <div className={styles["profile-btn"]} ref={elem}>
      <div className={cn(styles["profile-info"], open && styles["open"])} onClick={() => setOpen(true)}>
        <div className={styles["user-icon"]}>
          <ProfileIcon />
        </div>
        <div className={cn(styles["username"], "golden-text")}>
          <span>{base58.slice(0, 4) + ".." + base58.slice(-4)}</span>
        </div>

        <ChevDownIcon />
      </div>

      <div className={cn(styles["popup"], open && styles["open"])}>
        {ACTIONS.map((item, index) => (
          <div
            className={styles["select-item"]}
            key={index}
            onClick={() => {
              item.action();
              setOpen(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
