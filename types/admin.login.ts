// types/admin.login.ts
export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAdminLogReq {
  status: string;
  token: IToken;
}