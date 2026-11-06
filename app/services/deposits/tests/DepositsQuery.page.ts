import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";

import type { DepositsQueryResult } from "./models/DepositsQueryResult.interface";

export class DepositsQueryPage {
  readonly range = vi.fn();
  readonly order = vi.fn(() => ({
    order: this.order,
    range: this.range,
  }));
  readonly inFilter = vi.fn(() => ({ order: this.order }));
  readonly select = vi.fn(() => ({ in: this.inFilter }));
  readonly from = vi.fn(() => ({ select: this.select }));
  readonly rpc = vi.fn();

  constructor(
    result: DepositsQueryResult,
    isAdministrator: boolean
  ) {
    this.range.mockResolvedValue({
      count: Array.isArray(result.data)
        ? result.data.length
        : null,
      ...result,
    });
    this.rpc.mockResolvedValue({
      data: isAdministrator,
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from: this.from,
        rpc: this.rpc,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  }

  static respondingWith(
    result: DepositsQueryResult
  ): DepositsQueryPage {
    return new DepositsQueryPage(result, true);
  }

  static forNonAdministrator(): DepositsQueryPage {
    return new DepositsQueryPage(
      { data: [], error: null },
      false
    );
  }

  get clientCreations(): number {
    return vi.mocked(createServerSupabaseClient).mock.calls
      .length;
  }
}
