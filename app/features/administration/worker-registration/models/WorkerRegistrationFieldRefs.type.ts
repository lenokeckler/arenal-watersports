import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { WORKER_REGISTRATION_FOCUS_ORDER } from "../constants/WorkerRegistrationForm.constants";

export type WorkerRegistrationFieldRefs = Record<
  (typeof WORKER_REGISTRATION_FOCUS_ORDER)[number],
  RefObject<NullableRef<HTMLInputElement>>
>;
