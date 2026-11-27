import { vi } from "vitest";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import { createPhotoTableMock } from "./createPhotoTableMock";
import type { PhotoClientAnswers } from "./PhotoClientAnswers.interface";

export const createPhotoClientMock = (
  answers: PhotoClientAnswers
) => {
  const upload = vi.fn().mockResolvedValue({ error: null });
  const remove = vi.fn().mockResolvedValue({
    data: Array.from(
      { length: safeNumber(answers.removedCount) },
      () => ({})
    ),
    error: null,
  });
  const { table, upsert } = createPhotoTableMock(answers);
  const client = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "worker" } },
        error: null,
      }),
    },
    from: () => table,
    storage: { from: () => ({ remove, upload }) },
  };

  return { client, remove, upload, upsert };
};
