import * as anchor from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";

export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const SELL_DATA_SEED = "sell-info";
export const SELL_DATA_SIZE = 136;
export const OFFER_DATA_SEED = "offer-info";
export const OFFER_DATA_SIZE = 104;
export const USER_DATA_SEED = "user-info";
export const ESCROW_VAULT_SEED = "escrow-vault";

export const COLLECTION_INFO_SEED = "collection-info";

export const COLLECTIONS_POOL_SEED = "collections-pool";
export const COLLECTIONS_POOL_SIZE = 4016;

export const COLLECTION_INFO_SIZE = 49;

export const MARKETPLACE_PROGRAM_ID = new PublicKey("3YuUgx1fJYvtaVmbfCjvq68HUukZE74WroqqW5e5stun");
export const USDT_TOKEN_MINT = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
export const USDT_TOKEN_DECIMAL = 1_000_000; // USDT Token Decimal

export interface GlobalPool {
  // 8 + 376
  superAdmin: PublicKey; // 32
  admins: PublicKey[]; // 8 * 32
  adminsCount: anchor.BN; // 8
  collectionCount: anchor.BN; // 8
  teamCount: anchor.BN; // 8
  teamTreasury: PublicKey[]; // 8 * 32
  treasuryRate: anchor.BN[]; // 8 * 8
}

export interface CollectionInfo {
  address: PublicKey;
  fee: anchor.BN;
  active: number;
}

export interface SellData {
  // 8 + 128
  mint: PublicKey; // 32
  seller: PublicKey; // 32
  collection: PublicKey; // 32
  priceSol: anchor.BN; // 8
  priceToken: anchor.BN; // 8
  listedDate: anchor.BN; // 8
  active: anchor.BN; // 8
}

export interface OfferData {
  // 8 + 96
  mint: PublicKey; // 32
  buyer: PublicKey; // 32
  offerPrice: anchor.BN; // 8
  offerListingDate: anchor.BN; // 8
  byToken: anchor.BN; // 8
  active: anchor.BN; // 8
}

export interface UserData {
  // 8 + 64
  address: PublicKey; // 32
  tradedVolume: anchor.BN; // 8
  tradedTokenVolume: anchor.BN; // 8
  escrowSolBalance: anchor.BN; // 8
  escrowTokenBalance: anchor.BN; // 8
}
