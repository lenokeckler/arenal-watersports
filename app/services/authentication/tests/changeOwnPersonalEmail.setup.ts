import { vi } from "vitest";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../reauthenticateSettledWorker",
  () => import("./mocks/reauthenticateSettledWorker.mock")
);
vi.mock(
  "../updateOwnPersonalEmail",
  () => import("./mocks/updateOwnPersonalEmail.mock")
);
