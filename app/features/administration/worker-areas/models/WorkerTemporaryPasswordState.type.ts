import type { TemporaryPasswordGrant } from "@/app/services/authentication/models/TemporaryPasswordGrant.type";
import type { NullableRef } from "@/app/types";

export type WorkerTemporaryPasswordState =
  NullableRef<TemporaryPasswordGrant>;
