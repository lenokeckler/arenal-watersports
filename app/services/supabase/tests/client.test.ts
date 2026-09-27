import { describe, expect, it } from "vitest";
import { createBrowserSupabaseClient } from "@/app/services";

describe("createBrowserSupabaseClient", () => {
  it("builds a client with an auth surface and a query builder", () => {
    const supabaseClient = createBrowserSupabaseClient();

    expect(supabaseClient.auth).toBeDefined();
    expect(typeof supabaseClient.from).toBe("function");
  });

  it("reuses one browser client, so the session is not split across instances", () => {
    expect(createBrowserSupabaseClient()).toBe(
      createBrowserSupabaseClient()
    );
  });
});
