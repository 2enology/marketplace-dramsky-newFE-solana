import {request} from "./request";

export type OfferType = {
  buyer: string;
  byToken: boolean;
  tokenId: string;
  createdAt: Date;
  expiresAt: number;
  id: string;
  imgUrl: string;
  mintAddr: string;
  collectionAddr: string;
  offerPrice: number;
  seller: string;
  updatedAt: Date;
  solPrice: number;
  tokenPrice: number;
};

export type AcceptOfferDataPayload = {
  offerData: any;
  mintAddr: string;
  transaction: any;
};

export const offerApi = {
  offerItem: (offerData: any, transaction: any) =>
    request.post(`/offer/create`, {
      offerData,
      transaction,
    }),
  getOffersByMintAddr: (addr: string) => request.get<OfferType[]>(`/offer/findAllByMintAddr/${addr}`),
  acceptOffer: (data: AcceptOfferDataPayload) => request.delete(`/offer/acceptoffer`, data),
  cancelOffer: (cancelData: any) => request.delete(`/offer/canceloffer`, cancelData),
  getOffersMade: (addr: string) => request.get<OfferType[]>(`/offer/findAllByBuyer/${addr}`),
  getOffersReceived: (addr: string) => request.get<OfferType[]>(`/offer/findAllBySeller/${addr}`),
  purchaseOffer: (mintAddr: string) => request.delete(`/listednfts/${mintAddr}`),
};
