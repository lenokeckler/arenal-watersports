import { vi } from "vitest";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../readFirstSignInWorker",
  () => import("./mocks/readFirstSignInWorker.mock")
);
vi.mock(
  "../checkWorkerPassword",
  () => import("./mocks/checkWorkerPassword.mock")
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
  "../updateSignedInPassword",
  () => import("./mocks/updateSignedInPassword.mock")
);
vi.mock(
  "../completeFirstPasswordChange",
  () => import("./mocks/completeFirstPasswordChange.mock")
);
vi.mock(
  "../refreshFirstSignInSession",
  () => import("./mocks/refreshFirstSignInSession.mock")
);
