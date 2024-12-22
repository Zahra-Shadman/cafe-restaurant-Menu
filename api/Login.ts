import { AdminUrl } from "@/api/urls";

import { IAdminLogReq } from "@/types/admin.login";

import axios from "axios";

export const login = async (
  username: string,
  password: string
): Promise<IAdminLogReq> => {
  const response = await axios.post(AdminUrl, {
    username,
    password,
  });
 
  return response.data;
};
