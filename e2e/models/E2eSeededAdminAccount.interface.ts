import type { E2eAccountCredentials } from "./E2eAccountCredentials.interface";

export interface E2eSeededAdminAccount extends E2eAccountCredentials {
  workerId: string;
}
