import { vi } from "vitest";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../readSignedInWorker",
  () => import("./mocks/readSignedInWorker.mock")
);
vi.mock(
  "../verifyCurrentPassword",
  () => import("./mocks/verifyCurrentPassword.mock")
);
vi.mock(
  "../updateOwnPassword",
  () => import("./mocks/updateOwnPassword.mock")
);
vi.mock(
  "../signOutEverywhere",
  () => import("./mocks/signOutEverywhere.mock")
);
