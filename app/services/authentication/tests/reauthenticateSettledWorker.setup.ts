import { vi } from "vitest";

vi.mock(
  "../readSignedInWorker",
  () => import("./mocks/readSignedInWorker.mock")
);
vi.mock(
  "../verifyCurrentPassword",
  () => import("./mocks/verifyCurrentPassword.mock")
);
vi.mock(
  "../signOutEverywhere",
  () => import("./mocks/signOutEverywhere.mock")
);
