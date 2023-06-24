import {itemsApi} from "./items-api";
import {activitiesApi} from "./activities-api";
import {offerApi} from "./offer-api";

export type SSRRequestType = {req?: any; res?: any};

export const api = {
  items: itemsApi,
  activity: activitiesApi,
  offer: offerApi,
};
