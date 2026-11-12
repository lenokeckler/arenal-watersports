import { createClient } from "@supabase/supabase-js";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE } from "@/app/constants";
import { createStatelessSupabaseClient } from "@/app/services/supabase";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

describe("createStatelessSupabaseClient", () => {
  let capturedUrl: string;
  let capturedKey: string;
  let capturedOptions: unknown;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createClient).mockImplementation(((
      url: string,
      key: string,
      options: unknown
    ) => {
      capturedUrl = url;
      capturedKey = key;
      capturedOptions = options;
    }) as unknown as typeof createClient);
  });

  it("uses the anon key and keeps no session anywhere", () => {
    createStatelessSupabaseClient();

    expect(capturedUrl).toBe(SUPABASE.URL);
    expect(capturedKey).toBe(SUPABASE.ANON_KEY);
    expect(capturedOptions).toEqual({
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  });
});
