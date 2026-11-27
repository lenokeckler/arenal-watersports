import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  setCompatibility: vi.fn(),
  showToast: vi.fn(),
}));

export const pushMock = hoisted.push;
export const refreshMock = hoisted.refresh;
export const setCompatibilityMock =
  hoisted.setCompatibility;
export const showToastMock = hoisted.showToast;

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: showToastMock }),
}));

vi.mock("../services/setExtraCompatibilityAction", () => ({
  setExtraCompatibilityAction: setCompatibilityMock,
}));
