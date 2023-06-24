import React from "react";

export const CloseXIcon = ({className, onClick}: {className?: string; onClick?: () => void}) => (
  <svg
    className={className}
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  </svg>
);

export const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.25 2.5C7.10833 2.5 3.75 5.85833 3.75 10H1.25L4.49167 13.2417L4.55 13.3583L7.91667 10H5.41667C5.41667 6.775 8.025 4.16667 11.25 4.16667C14.475 4.16667 17.0833 6.775 17.0833 10C17.0833 13.225 14.475 15.8333 11.25 15.8333C9.64167 15.8333 8.18333 15.175 7.13333 14.1167L5.95 15.3C7.30833 16.6583 9.175 17.5 11.25 17.5C15.3917 17.5 18.75 14.1417 18.75 10C18.75 5.85833 15.3917 2.5 11.25 2.5ZM10.4167 6.66667V10.8333L13.9583 12.9333L14.6 11.8667L11.6667 10.125V6.66667H10.4167Z"
      fill="white"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.1296 11.8792H12.4712L12.2379 11.6542C13.0546 10.7042 13.5462 9.47083 13.5462 8.12916C13.5462 5.13749 11.1212 2.71249 8.12956 2.71249C5.13789 2.71249 2.71289 5.13749 2.71289 8.12916C2.71289 11.1208 5.13789 13.5458 8.12956 13.5458C9.47122 13.5458 10.7046 13.0542 11.6546 12.2375L11.8796 12.4708V13.1292L16.0462 17.2875L17.2879 16.0458L13.1296 11.8792ZM8.12956 11.8792C6.05456 11.8792 4.37956 10.2042 4.37956 8.12916C4.37956 6.05416 6.05456 4.37916 8.12956 4.37916C10.2046 4.37916 11.8796 6.05416 11.8796 8.12916C11.8796 10.2042 10.2046 11.8792 8.12956 11.8792Z"
      fill="white"
    />
  </svg>
);

export const BurgerIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 18.5088H21V16.5088H3V18.5088ZM3 13.5088H21V11.5088H3V13.5088ZM3 6.50879V8.50879H21V6.50879H3Z"
      fill="white"
    />
  </svg>
);

export const ChevDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z"
      fill="currentColor"
    />
  </svg>
);

export const SolanaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3925_34111)">
      <path
        d="M5.10911 15.4484C5.2264 15.3307 5.38563 15.2644 5.55176 15.2642H20.826C20.888 15.2641 20.9485 15.2824 21 15.3167C21.0515 15.3511 21.0917 15.4 21.1154 15.4572C21.1391 15.5145 21.1452 15.5774 21.1331 15.6382C21.1209 15.6989 21.091 15.7546 21.0472 15.7984L18.03 18.8155C17.9718 18.8736 17.9028 18.9197 17.8269 18.9511C17.7509 18.9825 17.6695 18.9987 17.5873 18.9986H2.31307C2.25157 18.9982 2.19155 18.9798 2.14049 18.9455C2.08944 18.9112 2.04961 18.8626 2.02598 18.8058C2.00235 18.7491 1.99597 18.6866 2.00763 18.6262C2.0193 18.5658 2.04849 18.5102 2.09156 18.4663L5.10911 15.4484Z"
        fill="url(#paint0_linear_3925_34111)"
      />
      <path
        d="M5.10911 4.18271C5.22766 4.06712 5.3862 4.00168 5.55176 4H20.826C20.888 3.99991 20.9485 4.01821 21 4.05259C21.0515 4.08696 21.0917 4.13586 21.1154 4.19308C21.1391 4.25031 21.1452 4.31327 21.1331 4.374C21.1209 4.43473 21.091 4.49048 21.0472 4.53419L18.03 7.55137C17.9718 7.60947 17.9028 7.65554 17.8269 7.68695C17.7509 7.71837 17.6695 7.73451 17.5873 7.73446H2.31307C2.25157 7.73408 2.19155 7.71559 2.14049 7.68131C2.08944 7.64703 2.04961 7.59846 2.02598 7.54169C2.00235 7.48491 1.99597 7.42242 2.00763 7.36204C2.0193 7.30166 2.04849 7.24605 2.09156 7.20215L5.10911 4.18271Z"
        fill="url(#paint1_linear_3925_34111)"
      />
      <path
        d="M18.0318 9.77977C17.9737 9.72167 17.9047 9.6756 17.8287 9.64419C17.7528 9.61277 17.6714 9.59663 17.5892 9.59668H2.31493C2.25305 9.5967 2.19256 9.61505 2.1411 9.64943C2.08965 9.6838 2.04953 9.73266 2.02583 9.78982C2.00213 9.84699 1.9959 9.90989 2.00793 9.97059C2.01995 10.0313 2.04971 10.0871 2.09342 10.1309L5.11097 13.1481C5.1691 13.2062 5.23812 13.2522 5.31407 13.2837C5.39003 13.3151 5.47143 13.3312 5.55362 13.3311H20.8279C20.8898 13.3312 20.9504 13.3129 21.0019 13.2786C21.0534 13.2442 21.0935 13.1953 21.1172 13.1381C21.1409 13.0808 21.1471 13.0179 21.1349 12.9571C21.1228 12.8964 21.0929 12.8407 21.049 12.7969L18.0318 9.77977Z"
        fill="url(#paint2_linear_3925_34111)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_3925_34111"
        x1="19.367"
        y1="2.19788"
        x2="8.79573"
        y2="22.4453"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3925_34111"
        x1="14.7449"
        y1="-0.215536"
        x2="4.17409"
        y2="20.0322"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_3925_34111"
        x1="17.0429"
        y1="0.983273"
        x2="6.47207"
        y2="21.231"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <clipPath id="clip0_3925_34111">
        <rect width="19.1402" height="15" fill="white" transform="translate(2 4)" />
      </clipPath>
    </defs>
  </svg>
);

export const USDTIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill="#26A17B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0803 12.7782V12.7771C13.0185 12.7816 12.6995 12.8007 11.988 12.8007C11.4198 12.8007 11.0199 12.7838 10.8793 12.7771V12.7788C8.69228 12.6826 7.05991 12.3018 7.05991 11.8461C7.05991 11.3911 8.69228 11.0103 10.8793 10.9124V12.3996C11.0222 12.4097 11.4317 12.4339 11.9975 12.4339C12.6765 12.4339 13.0168 12.4058 13.0803 12.4002V10.9135C15.2628 11.0108 16.8913 11.3916 16.8913 11.8461C16.8913 12.3018 15.2628 12.6814 13.0803 12.7782ZM13.0803 10.7588V9.42794H16.1257V7.39844H7.83391V9.42794H10.8793V10.7582C8.40428 10.8719 6.54297 11.3624 6.54297 11.9496C6.54297 12.5369 8.40428 13.0268 10.8793 13.141V17.4059H13.0803V13.1399C15.5514 13.0262 17.4082 12.5363 17.4082 11.9496C17.4082 11.3629 15.5514 10.873 13.0803 10.7588Z"
      fill="white"
    />
  </svg>
);

export const ArrowBack = ({onClick}: {onClick?: () => void}) => (
  <svg width="18" height="18" onClick={onClick} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 8.25H5.8725L10.065 4.0575L9 3L3 9L9 15L10.0575 13.9425L5.8725 9.75H15V8.25Z" fill="white" />
  </svg>
);

export const ArrowForward = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L7.9425 4.0575L12.1275 8.25H3V9.75H12.1275L7.9425 13.9425L9 15L15 9L9 3Z" fill="#222120" />
  </svg>
);

export const OpenInNew = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.0078 3.99683L20.0032 6.99514L17.002 9.99933"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.0018 6.99805H14.9997C12.7897 6.99805 10.998 8.78965 10.998 10.9997V11.4999"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.0036 12.0001V16.0018C21.0036 18.7643 18.7641 21.0038 16.0015 21.0038H7.99818C5.2356 21.0038 2.99609 18.7643 2.99609 16.0018V7.99842C2.99609 5.23585 5.2356 2.99634 7.99818 2.99634H11.9998"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GridViewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 3V11H11V3H3ZM9 9H5V5H9V9ZM3 13V21H11V13H3ZM9 19H5V15H9V19ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM13 13V21H21V13H13ZM19 19H15V15H19V19Z"
      fill="currentColor"
    />
  </svg>
);

export const GridMoreViewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2ZM8 20H4V16H8V20ZM8 14H4V10H8V14ZM8 8H4V4H8V8ZM14 20H10V16H14V20ZM14 14H10V10H14V14ZM14 8H10V4H14V8ZM20 20H16V16H20V20ZM20 14H16V10H20V14ZM20 8H16V4H20V8Z"
      fill="currentColor"
    />
  </svg>
);

export const CheckedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3.25L4.5 8.75L2 6.25" stroke="#0F0E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FilterIcon = () => (
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 3.75H16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 3.75H11.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.25 9H16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 9H5.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.25 14.25H16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 14.25H11.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13.8107 2.68934C14.3964 3.27513 14.3964 4.22488 13.8107 4.81066C13.2249 5.39645 12.2751 5.39645 11.6893 4.81066C11.1036 4.22488 11.1036 3.27513 11.6893 2.68934C12.2751 2.10355 13.2249 2.10355 13.8107 2.68934"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.81066 7.93934C8.39645 8.52513 8.39645 9.47488 7.81066 10.0607C7.22488 10.6464 6.27513 10.6464 5.68934 10.0607C5.10355 9.47488 5.10355 8.52513 5.68934 7.93934C6.27513 7.35355 7.22488 7.35355 7.81066 7.93934"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.8107 13.1893C14.3964 13.7751 14.3964 14.7249 13.8107 15.3107C13.2249 15.8964 12.2751 15.8964 11.6893 15.3107C11.1036 14.7249 11.1036 13.7751 11.6893 13.1893C12.2751 12.6036 13.2249 12.6036 13.8107 13.1893"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.5H9V6.5H3V5.5Z" fill="currentColor" />
  </svg>
);

export const FirstPageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.2049 16.59L13.6149 12L18.2049 7.41L16.7949 6L10.7949 12L16.7949 18L18.2049 16.59ZM5.79492 6H7.79492V18H5.79492V6Z"
      fill="white"
    />
  </svg>
);

export const ChevLefIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" fill="white" />
  </svg>
);

export const ChevRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="white" />
  </svg>
);

export const LastPageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.79492 7.41L10.3849 12L5.79492 16.59L7.20492 18L13.2049 12L7.20492 6L5.79492 7.41ZM16.2049 6H18.2049V18H16.2049V6Z"
      fill="white"
    />
  </svg>
);

export const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.6673 8.66683H8.66732V12.6668H7.33398V8.66683H3.33398V7.3335H7.33398V3.3335H8.66732V7.3335H12.6673V8.66683Z"
      fill="currentColor"
    />
  </svg>
);

export const ThreeDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
      fill="currentColor"
    />
  </svg>
);

export const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5441 6.765L11.2341 7.455L4.43908 14.25H3.74908V13.56L10.5441 6.765ZM13.2441 2.25C13.0566 2.25 12.8616 2.325 12.7191 2.4675L11.3466 3.84L14.1591 6.6525L15.5316 5.28C15.8241 4.9875 15.8241 4.515 15.5316 4.2225L13.7766 2.4675C13.6266 2.3175 13.4391 2.25 13.2441 2.25ZM10.5441 4.6425L2.24908 12.9375V15.75H5.06158L13.3566 7.455L10.5441 4.6425Z"
      fill="white"
    />
  </svg>
);

export const EditProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="12"
      cy="8.24835"
      r="4.25177"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.99667 20.0033C3.99667 17.5173 6.01251 15.5015 8.49855 15.5015H11.0826"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.0029 16.9399L16.0017 19.9412L14.2019 18.1404"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LaunchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"
      fill="#A5A4A1"
    />
  </svg>
);

export const CheckSuccessFiledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.01732 11.0333L11.734 6.31659L10.9673 5.56659L7.01732 9.51659L5.01732 7.51659L4.26732 8.26659L7.01732 11.0333ZM8.00065 14.6666C7.08954 14.6666 6.22843 14.4916 5.41732 14.1416C4.60621 13.7916 3.89787 13.3138 3.29232 12.7083C2.68676 12.1027 2.20898 11.3944 1.85898 10.5833C1.50898 9.77214 1.33398 8.91103 1.33398 7.99992C1.33398 7.0777 1.50898 6.21103 1.85898 5.39992C2.20898 4.58881 2.68676 3.88325 3.29232 3.28325C3.89787 2.68325 4.60621 2.20825 5.41732 1.85825C6.22843 1.50825 7.08954 1.33325 8.00065 1.33325C8.92287 1.33325 9.78954 1.50825 10.6007 1.85825C11.4118 2.20825 12.1173 2.68325 12.7173 3.28325C13.3173 3.88325 13.7923 4.58881 14.1423 5.39992C14.4923 6.21103 14.6673 7.0777 14.6673 7.99992C14.6673 8.91103 14.4923 9.77214 14.1423 10.5833C13.7923 11.3944 13.3173 12.1027 12.7173 12.7083C12.1173 13.3138 11.4118 13.7916 10.6007 14.1416C9.78954 14.4916 8.92287 14.6666 8.00065 14.6666Z"
      fill="#7FC936"
    />
  </svg>
);

export const ErrorFiledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.00035 11.3333C8.15611 11.3333 8.28676 11.2806 8.39232 11.1752C8.49787 11.0699 8.55065 10.9393 8.55065 10.7836C8.55065 10.6278 8.49797 10.4971 8.39262 10.3916C8.28725 10.286 8.1567 10.2333 8.00095 10.2333C7.8452 10.2333 7.71454 10.2859 7.60898 10.3913C7.50343 10.4967 7.45065 10.6272 7.45065 10.783C7.45065 10.9387 7.50333 11.0694 7.60868 11.1749C7.71405 11.2805 7.84461 11.3333 8.00035 11.3333ZM7.55065 8.78325H8.55065V4.56659H7.55065V8.78325ZM8.00508 14.6666C7.08582 14.6666 6.22193 14.4916 5.41342 14.1416C4.60491 13.7916 3.89787 13.3138 3.29232 12.7083C2.68676 12.1027 2.20898 11.3952 1.85898 10.5859C1.50898 9.77657 1.33398 8.9118 1.33398 7.99159C1.33398 7.07137 1.50898 6.2066 1.85898 5.39727C2.20898 4.58792 2.68676 3.88325 3.29232 3.28325C3.89787 2.68325 4.60532 2.20825 5.41467 1.85825C6.224 1.50825 7.08877 1.33325 8.00898 1.33325C8.9292 1.33325 9.79397 1.50825 10.6033 1.85825C11.4126 2.20825 12.1173 2.68325 12.7173 3.28325C13.3173 3.88325 13.7923 4.58881 14.1423 5.39992C14.4923 6.21103 14.6673 7.07622 14.6673 7.99549C14.6673 8.91475 14.4923 9.77864 14.1423 10.5872C13.7923 11.3957 13.3173 12.1017 12.7173 12.7052C12.1173 13.3087 11.4118 13.7865 10.6007 14.1385C9.78954 14.4906 8.92435 14.6666 8.00508 14.6666Z"
      fill="#F9C200"
    />
  </svg>
);

export const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.33398 11.9999H8.66732V10.6666H7.33398V11.9999ZM8.00065 1.33325C4.32065 1.33325 1.33398 4.31992 1.33398 7.99992C1.33398 11.6799 4.32065 14.6666 8.00065 14.6666C11.6807 14.6666 14.6673 11.6799 14.6673 7.99992C14.6673 4.31992 11.6807 1.33325 8.00065 1.33325ZM8.00065 13.3333C5.06065 13.3333 2.66732 10.9399 2.66732 7.99992C2.66732 5.05992 5.06065 2.66659 8.00065 2.66659C10.9407 2.66659 13.334 5.05992 13.334 7.99992C13.334 10.9399 10.9407 13.3333 8.00065 13.3333ZM8.00065 3.99992C6.52732 3.99992 5.33398 5.19325 5.33398 6.66659H6.66732C6.66732 5.93325 7.26732 5.33325 8.00065 5.33325C8.73398 5.33325 9.33398 5.93325 9.33398 6.66659C9.33398 7.99992 7.33398 7.83325 7.33398 9.99992H8.66732C8.66732 8.49992 10.6673 8.33325 10.6673 6.66659C10.6673 5.19325 9.47398 3.99992 8.00065 3.99992Z"
      fill="#CDCCCB"
    />
  </svg>
);

export const ThumbDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.99935 1.33325H3.99935C3.44602 1.33325 2.97268 1.66659 2.77268 2.14659L0.759349 6.84659C0.699349 6.99992 0.666016 7.15992 0.666016 7.33325V8.66659C0.666016 9.39992 1.26602 9.99992 1.99935 9.99992H6.20602L5.57268 13.0466L5.55268 13.2599C5.55268 13.5333 5.66602 13.7866 5.84602 13.9666L6.55268 14.6666L10.9393 10.2733C11.186 10.0333 11.3327 9.69992 11.3327 9.33325V2.66659C11.3327 1.93325 10.7327 1.33325 9.99935 1.33325ZM9.99935 9.33325L7.10602 12.2266L7.84602 8.66659H1.99935V7.33325L3.99935 2.66659H9.99935V9.33325ZM12.666 1.33325H15.3327V9.33325H12.666V1.33325Z"
      fill="currentColor"
    />
  </svg>
);

export const CancelOfferIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 20H6C4.895 20 4 19.105 4 18V6C4 4.895 4.895 4 6 4H18C19.105 4 20 4.895 20 6V18C20 19.105 19.105 20 18 20Z"
      stroke="#DD4040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.8299 9.16992L9.16992 14.8299"
      stroke="#DD4040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.8299 14.8299L9.16992 9.16992"
      stroke="#DD4040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CancelFiledIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="7.5" fill="#242424" />
    <path
      d="M6.1875 12.6L9 9.7875L11.8125 12.6L12.6 11.8125L9.7875 9L12.6 6.1875L11.8125 5.4L9 8.2125L6.1875 5.4L5.4 6.1875L8.2125 9L5.4 11.8125L6.1875 12.6ZM9 16.5C7.975 16.5 7.00625 16.3031 6.09375 15.9094C5.18125 15.5156 4.38438 14.9781 3.70312 14.2969C3.02188 13.6156 2.48438 12.8188 2.09063 11.9062C1.69688 10.9938 1.5 10.025 1.5 9C1.5 7.9625 1.69688 6.9875 2.09063 6.075C2.48438 5.1625 3.02188 4.36875 3.70312 3.69375C4.38438 3.01875 5.18125 2.48438 6.09375 2.09063C7.00625 1.69688 7.975 1.5 9 1.5C10.0375 1.5 11.0125 1.69688 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.025 16.3031 10.9938 15.9094 11.9062C15.5156 12.8188 14.9813 13.6156 14.3063 14.2969C13.6313 14.9781 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
      fill="#DD4040"
    />
  </svg>
);

export const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 20V19.25C20 16.9028 18.0972 15 15.75 15H8.25C5.90279 15 4 16.9028 4 19.25V20"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AddPhotoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.332 4.33333H12.2187L10.9987 3H6.9987V4.33333H10.412L11.632 5.66667H14.332V13.6667H3.66536V7.66667H2.33203V13.6667C2.33203 14.4 2.93203 15 3.66536 15H14.332C15.0654 15 15.6654 14.4 15.6654 13.6667V5.66667C15.6654 4.93333 15.0654 4.33333 14.332 4.33333ZM5.66536 9.66667C5.66536 11.5067 7.1587 13 8.9987 13C10.8387 13 12.332 11.5067 12.332 9.66667C12.332 7.82667 10.8387 6.33333 8.9987 6.33333C7.1587 6.33333 5.66536 7.82667 5.66536 9.66667ZM8.9987 7.66667C10.0987 7.66667 10.9987 8.56667 10.9987 9.66667C10.9987 10.7667 10.0987 11.6667 8.9987 11.6667C7.8987 11.6667 6.9987 10.7667 6.9987 9.66667C6.9987 8.56667 7.8987 7.66667 8.9987 7.66667ZM3.66536 4.33333H5.66536V3H3.66536V1H2.33203V3H0.332031V4.33333H2.33203V6.33333H3.66536V4.33333Z"
      fill="white"
    />
  </svg>
);

export const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.6654 6V12.6667H5.33203V6H10.6654ZM9.66536 2H6.33203L5.66536 2.66667H3.33203V4H12.6654V2.66667H10.332L9.66536 2ZM11.9987 4.66667H3.9987V12.6667C3.9987 13.4 4.5987 14 5.33203 14H10.6654C11.3987 14 11.9987 13.4 11.9987 12.6667V4.66667Z"
      fill="white"
    />
  </svg>
);

export const LoadingIcon = ({className}: {className?: string}) => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="22"
    height="22"
    viewBox="0 0 50 50"
    xmlSpace="preserve"
  >
    <path
      fill="currentColor"
      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const AnnouncementIcon = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.5002 10.9999C18.5002 11.6699 18.5002 12.3299 18.5002 12.9999C19.7002 12.9999 21.2602 12.9999 22.5002 12.9999C22.5002 12.3299 22.5002 11.6699 22.5002 10.9999C21.2602 10.9999 19.7002 10.9999 18.5002 10.9999Z"
      fill="url(#paint0_linear_4283_48873)"
    />
    <path
      d="M16.5002 17.6099C17.4602 18.3199 18.7102 19.2599 19.7002 19.9999C20.1002 19.4699 20.5002 18.9299 20.9002 18.3999C19.9102 17.6599 18.6602 16.7199 17.7002 15.9999C17.3002 16.5399 16.9002 17.0799 16.5002 17.6099Z"
      fill="url(#paint1_linear_4283_48873)"
    />
    <path
      d="M20.9002 5.59994C20.5002 5.06994 20.1002 4.52994 19.7002 3.99994C18.7102 4.73994 17.4602 5.67994 16.5002 6.39994C16.9002 6.92994 17.3002 7.46994 17.7002 7.99994C18.6602 7.27994 19.9102 6.34994 20.9002 5.59994Z"
      fill="url(#paint2_linear_4283_48873)"
    />
    <path
      d="M4.50024 8.99994C3.40024 8.99994 2.50024 9.89994 2.50024 10.9999V12.9999C2.50024 14.0999 3.40024 14.9999 4.50024 14.9999H5.50024V18.9999H7.50024V14.9999H8.50024L13.5002 17.9999V5.99994L8.50024 8.99994H4.50024ZM9.53024 10.7099L11.5002 9.52994V14.4699L9.53024 13.2899L9.05024 12.9999H4.50024V10.9999H9.05024L9.53024 10.7099Z"
      fill="url(#paint3_linear_4283_48873)"
    />
    <path
      d="M16.0002 11.9999C16.0002 10.6699 15.4202 9.46994 14.5002 8.64994V15.3399C15.4202 14.5299 16.0002 13.3299 16.0002 11.9999Z"
      fill="url(#paint4_linear_4283_48873)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4283_48873"
        x1="2.50024"
        y1="19.9999"
        x2="22.5002"
        y2="19.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B89B5A" />
        <stop offset="1" stopColor="#F9E0A8" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4283_48873"
        x1="2.50024"
        y1="19.9999"
        x2="22.5002"
        y2="19.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B89B5A" />
        <stop offset="1" stopColor="#F9E0A8" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_4283_48873"
        x1="2.50024"
        y1="19.9999"
        x2="22.5002"
        y2="19.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B89B5A" />
        <stop offset="1" stopColor="#F9E0A8" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_4283_48873"
        x1="2.50024"
        y1="19.9999"
        x2="22.5002"
        y2="19.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B89B5A" />
        <stop offset="1" stopColor="#F9E0A8" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_4283_48873"
        x1="2.50024"
        y1="19.9999"
        x2="22.5002"
        y2="19.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B89B5A" />
        <stop offset="1" stopColor="#F9E0A8" />
      </linearGradient>
    </defs>
  </svg>
);

export const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      fill="#F9C200"
    />
  </svg>
);
