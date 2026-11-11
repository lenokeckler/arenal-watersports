import {
  WORKER_AREA_INTENT,
  type WorkerAreaIntent,
} from "@/app/constants";

const INTENTS: readonly unknown[] = Object.values(
  WORKER_AREA_INTENT
);

export const isWorkerAreaIntent = (
  value: unknown
): value is WorkerAreaIntent => INTENTS.includes(value);
