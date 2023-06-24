import axios, {AxiosError, Method} from "axios";
import {toast} from "../components/Toast/Toast";
import {NextApiRequest, NextApiResponse} from "next";
import {isServerSide} from "../common/common-util";
// import {CookieService} from "../common/cookie-service";

const getApiHost = () => process.env.NEXT_PUBLIC_API_ENDPOINT;

type OptionalType = {
  componentHandleError?: boolean;
  req?: NextApiRequest;
  res?: NextApiResponse;
  useNsureDeviceId?: boolean;
};

type RequestType<Req> = {
  method: Method;
  url: string;
  payload?: Req;
  optional?: OptionalType;
  staticURL?: boolean;
  updatedToken?: string;
};

export type ApiResponse<Res> =
  | [Res, null]
  | [null, {status: number; message: string; err_code: string; reason?: string}];

async function handleSuccess<Res>({data}: {data: any; componentHandleError?: boolean}): Promise<ApiResponse<Res>> {
  return [data || null, null];
}

async function handleError<Req, Res>(
  resp: any,
  {url, method, payload, optional}: RequestType<Req>
): Promise<ApiResponse<Res>> {
  if (!isServerSide()) {
    toast.show({
      text: resp.response.data.message ?? `Server error | Status code: ${resp.response?.status || 500}`,
      type: "alert",
    });
  }

  return [
    null,
    {
      status: resp.response?.status || 500,
      message: `Server error | Status code: ${resp.response?.status || 500}`,
      err_code: "500",
    },
  ];
}

async function makeRequest<Req, Res>({
  method,
  url,
  payload,
  optional,
  staticURL,
}: RequestType<Req>): Promise<ApiResponse<Res>> {
  try {
    const resp = await axios({
      method: method,
      url: staticURL ? url : `${getApiHost()}${url}`,
      data: payload,
    });

    return handleSuccess<Res>({
      data: resp.data,
      componentHandleError: optional?.componentHandleError,
    });
  } catch (err) {
    return handleError<Req, Res>(err, {method, url, payload, optional});
  }
}

async function get<Res>(url: string, optional?: OptionalType) {
  return makeRequest<any, Res>({method: "GET", url, optional});
}

async function getStatic<Res>(url: string, optional?: OptionalType) {
  return makeRequest<any, Res>({method: "GET", url, optional, staticURL: true});
}

async function post<Req, Res>(url: string, payload?: Req, optional?: OptionalType) {
  return makeRequest<Req, Res>({method: "POST", url, optional, payload});
}

async function put<Req, Res>(url: string, payload?: Req, optional?: OptionalType) {
  return makeRequest<Req, Res>({method: "PUT", url, optional, payload});
}

async function _delete<Req, Res>(url: string, payload?: Req, optional?: OptionalType) {
  return makeRequest<any, Res>({method: "DELETE", url, optional, payload});
}

export const request = {
  get,
  getStatic,
  post,
  put,
  delete: _delete,
};
