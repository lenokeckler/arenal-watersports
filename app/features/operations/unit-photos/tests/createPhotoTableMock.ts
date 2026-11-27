import { vi } from "vitest";
import type { PhotoClientAnswers } from "./PhotoClientAnswers.interface";

export const createPhotoTableMock = ({
  deletedPaths = [],
  previousPath = null,
  recordError = null,
}: PhotoClientAnswers) => {
  const upsert = vi
    .fn()
    .mockResolvedValue({ error: recordError });
  const maybeSingle = vi.fn().mockResolvedValue({
    data: previousPath
      ? { storage_path: previousPath }
      : null,
    error: null,
  });
  const select = vi.fn().mockResolvedValue({
    data: deletedPaths.map((path) => ({
      storage_path: path,
    })),
    error: null,
  });
  const table = {
    delete: () => ({
      eq: () => ({ eq: () => ({ select }) }),
    }),
    select: () => ({
      eq: () => ({ eq: () => ({ maybeSingle }) }),
    }),
    upsert,
  };

  return { table, upsert };
};
