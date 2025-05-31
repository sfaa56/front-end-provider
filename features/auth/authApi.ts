import { apiClient } from "@/lib/api";
import { User } from "../../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

interface userReturnRequest {
    user: User;
    token: string;
}

export const login = async (data: LoginPayload): Promise<userReturnRequest> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
