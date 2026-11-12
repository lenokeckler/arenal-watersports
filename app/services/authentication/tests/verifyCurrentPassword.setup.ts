import { vi } from "vitest";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../recordFailedSignIn",
  () => import("./mocks/recordFailedSignIn.mock")
);
vi.mock(
  "../recordSuccessfulSignIn",
  () => import("./mocks/recordSuccessfulSignIn.mock")
);
vi.mock(
  "../isBlockedByAttempts",
  () => import("./mocks/isBlockedByAttempts.mock")
);
