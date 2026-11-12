import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { submitDamageReport } from "../actions/submitDamageReport";
import {
  AUTHENTICATED_DAMAGE_REPORT_USER,
  DEFAULT_DAMAGE_REPORT_SUBMISSION,
} from "./DamageReportSubmission.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const insertedDamageReports: string[] = [];

const createMockDamageReportSupabaseClient = (): Awaited<
  ReturnType<typeof createServerSupabaseClient>
> => {
  const client = createClient<Database>(
    "http://127.0.0.1:54321",
    "test-anon-key",
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        fetch: (_input, init) => {
          if (typeof init?.body === "string") {
            insertedDamageReports.push(init.body);
          }

          return Promise.resolve(
            new Response(null, { status: 201 })
          );
        },
      },
    }
  );
  vi.spyOn(client.auth, "getUser").mockResolvedValue({
    data: {
      user: AUTHENTICATED_DAMAGE_REPORT_USER,
    },
    error: null,
  });

  return client;
};

const supabaseClient =
  createMockDamageReportSupabaseClient();

describe("submitDamageReport", () => {
  beforeEach(() => {
    insertedDamageReports.splice(0);
    vi.clearAllMocks();
    vi.spyOn(
      supabaseClient.auth,
      "getUser"
    ).mockResolvedValue({
      data: {
        user: AUTHENTICATED_DAMAGE_REPORT_USER,
      },
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );
  });

  afterEach(() => {
    insertedDamageReports.splice(0);
    vi.restoreAllMocks();
  });

  it("sends all report fields with the authenticated creator", async () => {
    const result = await submitDamageReport(
      DEFAULT_DAMAGE_REPORT_SUBMISSION
    );

    expect(result).toEqual({ ok: true });
    expect(insertedDamageReports).toHaveLength(1);
    expect(JSON.parse(insertedDamageReports[0])).toEqual({
      unit_id: DEFAULT_DAMAGE_REPORT_SUBMISSION.unitId,
      cause: DEFAULT_DAMAGE_REPORT_SUBMISSION.cause,
      description:
        DEFAULT_DAMAGE_REPORT_SUBMISSION.description,
      impact_delta:
        DEFAULT_DAMAGE_REPORT_SUBMISSION.impactDelta,
      created_by: AUTHENTICATED_DAMAGE_REPORT_USER.id,
    });
  });

  it("preserves submission failures for the form boundary", async () => {
    vi.mocked(createServerSupabaseClient).mockRejectedValue(
      new Error("Supabase connection failed")
    );

    await expect(
      submitDamageReport(DEFAULT_DAMAGE_REPORT_SUBMISSION)
    ).rejects.toThrow("Supabase connection failed");
  });
});
