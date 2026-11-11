import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";

import type { RefundsQueryResult } from "./models/RefundsQueryResult.interface";

export class RefundsQueryPage {
  readonly lt = vi.fn();
  readonly gte = vi.fn(() => ({ lt: this.lt }));
  readonly select = vi.fn(() => ({ gte: this.gte }));
  readonly from = vi.fn(() => ({ select: this.select }));

  constructor(result: RefundsQueryResult) {
    this.lt.mockResolvedValue(result);
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from: this.from,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  }

  static respondingWith(
    result: RefundsQueryResult
  ): RefundsQueryPage {
    return new RefundsQueryPage(result);
  }
}
