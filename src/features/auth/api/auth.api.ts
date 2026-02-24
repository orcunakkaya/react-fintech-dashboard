import { http } from "@/shared/lib/http";

export type RegisterBody = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
  };
};

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
};

type ProfileApiResponse = {
  success: boolean;
  data: Profile;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      isActive: boolean;
      lastLoginAt: string;
      lastLoginIP: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
};

export async function registerUser(body: RegisterBody) {
  const res = await http.post<RegisterResponse>("/users/register", body);
  return res.data;
}

export async function loginUser(body: LoginBody) {
  const res = await http.post<LoginResponse>("/users/login", body);
  return res.data;
}

export async function getProfile(): Promise<Profile> {
  const res = await http.get<ProfileApiResponse>("/users/profile");
  return res.data.data;
}