import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";

import type { ChargesQueryResult } from "./models/ChargesQueryResult.interface";

export class ChargesQueryPage {
  readonly lt = vi.fn();
  readonly gte = vi.fn(() => ({ lt: this.lt }));
  readonly select = vi.fn(() => ({ gte: this.gte }));
  readonly from = vi.fn(() => ({ select: this.select }));

  constructor(result: ChargesQueryResult) {
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
    result: ChargesQueryResult
  ): ChargesQueryPage {
    return new ChargesQueryPage(result);
  }
}
