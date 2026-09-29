import type { SignInCredentials } from "@/app/services/authentication/models/SignInCredentials.interface";

export const VALID_LOGIN_CREDENTIALS: SignInCredentials = {
  password: "Local-test-password1!",
  username: "admin",
};

export const PARTIAL_PASSWORD = "abc";

export const NETWORK_FAILURE_MESSAGE = "Failed to fetch";
export const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";
