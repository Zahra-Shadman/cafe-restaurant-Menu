// lib/login.ts
import { AdminUrl } from "@/api/urls";
import { IadminLogReq } from "@/types/admin.login";
import axios from "axios";

export const login = async (
  username: string,
  password: string
): Promise<IadminLogReq> => {
  const response = await axios.post(AdminUrl, {
    username,
    password,
  });

  return response.data;
};
