import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readSignedInUsername } from "../readSignedInUsername";
import { readSignedInWorker } from "../readSignedInWorker";
import { captureArguments } from "./captureArguments";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../readSignedInWorker",
  () => import("./mocks/readSignedInWorker.mock")
);

describe("readSignedInUsername", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      SUPABASE_CLIENT as never
    );
    vi.mocked(readSignedInWorker).mockResolvedValue(
      ALREADY_CHANGED_WORKER
    );
  });

  it("returns the username of the signed-in worker", async () => {
    await expect(readSignedInUsername()).resolves.toBe(
      ALREADY_CHANGED_WORKER.username
    );
  });

  it("reads the worker with the request client", async () => {
    const argumentsOf = captureArguments(
      vi.mocked(readSignedInWorker),
      [ALREADY_CHANGED_WORKER]
    );

    await readSignedInUsername();

    expect(argumentsOf()).toEqual([[SUPABASE_CLIENT]]);
  });

  it("returns null when nobody is signed in", async () => {
    vi.mocked(readSignedInWorker).mockResolvedValue(null);

    await expect(
      readSignedInUsername()
    ).resolves.toBeNull();
  });
});
