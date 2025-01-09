
export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAdminLogReq {
  [x: string]: any;
  status: string;
  token: IToken;
}