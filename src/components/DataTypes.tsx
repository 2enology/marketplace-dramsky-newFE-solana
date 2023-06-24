export type NFTCard = {
  tokenId: string;
  listed: boolean;
  collectionName: string;
  collectionAddr: string;
  imgUrl: string;
  mintAddr: string;
  metaDataUrl: string;
  solPrice: number;
  tokenPrice: number;
  seller: string;
};

export type NFTMetaData = {
  attributes: {
    trait_type: string;
    value: string;
  }[];
  description: string;
  image: string;
  name: string;
};

export type NFTCardType = {
  tokenId: string;
  collectionAddr: string;
  imgUrl: string;
  mintAddr: string;
  metaDataUrl: string;
  solPrice: number;
  tokenPrice: number;
};

export type IndividualNFTDataType = {
  name: string;
  imgUrl: string;
  description: string;
  creator: string;
  seller: string;
  mintAddr: string;
  brand: string;
  caskType: string;
  size: string;
  abv: string;
  region: string;
  solPrice: number;
  tokenPrice: number;
};

export type ActivityDataType = {
  imgUrl: String;
  tokenId: String;
  mintAddr: String;
  txType: Number;
  solPrice: Number;
  tokenPrice: Number;
  seller: String;
  buyer: String;
  createdTime: String;
};

export type CollectionData = {
  collectionAddr: string;
};

export type GetNFTDataContextValue = {
  collections: CollectionData[] | undefined;
  ownNFTs: NFTCard[] | undefined;
  reFetchOwnNFTs: () => Promise<any>;
};

export type UserProfile = {
  name: string;
  bio: string;
  avatarImg: string;
  bannerImg: string;
};

export type ActivityDataContextValue = {
  myActivityData: ActivityDataType[];
};
