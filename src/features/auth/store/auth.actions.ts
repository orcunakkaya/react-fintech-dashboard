import { tokenStorage } from "./auth.token";

export function logout() {
  tokenStorage.clear();
}