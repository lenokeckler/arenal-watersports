import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkArea } from "@/app/types";

import type { AreaRpcResult } from "./models/AreaRpcResult.interface";

export class AreaRpcPage {
  readonly rpc = vi.fn(
    (_name: string, { target }: { target: WorkArea }) =>
      Promise.resolve(this.results[target])
  );

  constructor(
    private readonly results: Partial<
      Record<WorkArea, AreaRpcResult>
    >
  ) {
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      this.client
    );
  }

  static respondingWith(
    results: Partial<Record<WorkArea, AreaRpcResult>>
  ): AreaRpcPage {
    return new AreaRpcPage(results);
  }

  get client(): ServerSupabaseClient {
    return {
      rpc: this.rpc,
    } as unknown as ServerSupabaseClient;
  }

  get askedAreas(): WorkArea[] {
    return this.rpc.mock.calls.map(
      ([, { target }]) => target
    );
  }
}
