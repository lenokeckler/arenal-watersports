import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_AUTH_COOKIE,
  SUPABASE_COOKIE_OPTIONS,
} from "@/app/constants";
import { createBrowserSupabaseClient } from "../client";
import { createClient } from "../server";

const { createBrowserClient, createServerClient } =
  vi.hoisted(() => ({
    createBrowserClient: vi.fn(),
    createServerClient: vi.fn(),
  }));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient,
  createServerClient,
}));
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: () => [],
    set: vi.fn(),
  }),
}));

describe("supabase client cookie options", () => {
  beforeEach(() => {
    createBrowserClient.mockReset();
    createServerClient.mockReset();
  });

  it("names the auth cookie of the browser client with the project constant", () => {
    createBrowserSupabaseClient();

    const options = createBrowserClient.mock.calls[0][2];
    expect(options.cookieOptions).toEqual(
      SUPABASE_COOKIE_OPTIONS
    );
    expect(options.cookieOptions.name).toBe(
      SUPABASE_AUTH_COOKIE.NAME
    );
  });

  it("names the auth cookie of the server client with the project constant", async () => {
    await createClient();

    const options = createServerClient.mock.calls[0][2];
    expect(options.cookieOptions.name).toBe(
      SUPABASE_AUTH_COOKIE.NAME
    );
  });
});
