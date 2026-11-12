import type { NullableRef } from "@/app/types";

export interface E2eWorkerOptions {
  mustChangePassword: boolean;
  password: string;
  personalEmail?: NullableRef<string>;
}
