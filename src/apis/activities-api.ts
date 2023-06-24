import {request} from "./request";

export type TxType = 0 | 1 | 2 | 3 | 4;

export interface IActivity {
  imgUrl: string;
  tokenId: string;
  txType: TxType;
  solPrice: number;
  tokenPrice: number;
  seller: string;
  buyer: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export const activitiesApi = {
  getActivities: (walletID: string) => request.get<IActivity[]>(`/activity/findById/${walletID}`),
  getItemActivities: (mintAddr: string) => request.get<IActivity[]>(`/activity/findByMintAddr/${mintAddr}`),
  createActivity: (form: any) => request.post(`/activity/create`, form),
};
