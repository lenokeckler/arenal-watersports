import type { Nullable } from "@/app/types";

export interface PhotoClientAnswers {
  deletedPaths?: string[];
  previousPath?: Nullable<string>;
  recordError?: Nullable<{ message: string }>;
  removedCount?: number;
}
