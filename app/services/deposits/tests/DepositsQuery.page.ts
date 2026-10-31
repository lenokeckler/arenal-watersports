import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";

import type { DepositsQueryResult } from "./models/DepositsQueryResult.interface";

export class DepositsQueryPage {
  readonly order = vi.fn();
  readonly inFilter = vi.fn(() => ({ order: this.order }));
  readonly select = vi.fn(() => ({ in: this.inFilter }));
  readonly from = vi.fn(() => ({ select: this.select }));

  constructor(result: DepositsQueryResult) {
    this.order.mockResolvedValue({
      count: Array.isArray(result.data)
        ? result.data.length
        : null,
      ...result,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from: this.from,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  }

  static respondingWith(
    result: DepositsQueryResult
  ): DepositsQueryPage {
    return new DepositsQueryPage(result);
  }

  get clientCreations(): number {
    return vi.mocked(createServerSupabaseClient).mock.calls
      .length;
  }
}
