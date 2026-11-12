import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readOwnProfileIdentity } from "../services/readOwnProfileIdentity";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock(
  "@/app/services/authentication/readSignedInUserId",
  () => ({ readSignedInUserId: vi.fn() })
);

const maybeSingle = vi.fn();
const eq = vi.fn(() => ({ maybeSingle }));
const select = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ select }));

describe("readOwnProfileIdentity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from,
      } as never
    );
    vi.mocked(readSignedInUserId).mockResolvedValue(
      "user-1"
    );
  });

  it("reads the own worker and writes the areas, the role and the marks in Spanish", async () => {
    maybeSingle.mockResolvedValue({
      data: {
        base_role: "reservas",
        full_name: "Ana Rojas",
        username: "anarojas",
        worker_areas: [
          { area: "reservas" },
          { area: "operaciones" },
        ],
        worker_marks: [{ mark: "guia" }],
      },
      error: null,
    });

    expect(await readOwnProfileIdentity()).toEqual({
      areas: ["Reservas", "Operaciones"],
      fullName: "Ana Rojas",
      marks: ["Guía"],
      role: "Reservas",
      username: "anarojas",
    });
    expect(eq).toHaveBeenCalledWith("id", "user-1");
  });

  it("answers null when nobody is signed in", async () => {
    vi.mocked(readSignedInUserId).mockResolvedValue(null);

    expect(await readOwnProfileIdentity()).toBeNull();
    expect(from).not.toHaveBeenCalled();
  });

  it("answers null when the worker is not found", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await readOwnProfileIdentity()).toBeNull();
  });

  it("throws the database error", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: "42501",
        message: "permission denied",
      },
    });

    await expect(
      readOwnProfileIdentity()
    ).rejects.toThrow();
  });
});
