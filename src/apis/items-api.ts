import {request} from "./request";
import {NFTCard, NFTCardType, NFTMetaData} from "../components/DataTypes";
import {PublicKey} from "@solana/web3.js";
import {web3} from "@project-serum/anchor";

export type DeListPayload = {
  delistData: (Omit<NFTCardType, "listed" | "collectionName"> & {txType: number; seller: string; buyer: string})[];
  mintAddrArray: PublicKey[];
  transactions: any;
};

export type UpdatePayload = {
  updateData: any;
  mintAddr: string;
  transaction: any;
};

export type PurchasePayload = {
  purchaseData: any;
  mintAddrArray: PublicKey[];
  transaction: any;
};

export const itemsApi = {
  listItem: (listData: any, transactions: any) =>
    request.post(`/listednfts/create`, {
      listData,
      transactions,
    }),
  getListedItems: (address: string) => request.get<NFTCard[]>(`/listednfts/findAllBySeller/${address}`),
  updateItems: (data: UpdatePayload) => request.put(`/listednfts`, data),
  deListItems: (data: DeListPayload) => request.delete(`/listednfts`, data),
  purchaseItems: (data: PurchasePayload) => request.delete(`/listednfts/purchase`, data),
  getItemImage: (url: string) => request.getStatic<{image: string}>(url),
  getItemDetails: (mintAddr: string) => request.get<NFTCard>(`/listednfts/${mintAddr}`),
  getItemAttrs: (metaURL: string) => request.getStatic<NFTMetaData>(metaURL),
};
