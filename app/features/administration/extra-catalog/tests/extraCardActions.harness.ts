import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteOrDeactivate: vi.fn(),
  reactivate: vi.fn(),
  refresh: vi.fn(),
  showToast: vi.fn(),
}));

export const refreshMock = hoisted.refresh;
export const showToastMock = hoisted.showToast;
export const deleteOrDeactivateMock =
  hoisted.deleteOrDeactivate;
export const reactivateMock = hoisted.reactivate;

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: showToastMock }),
}));

vi.mock(
  "../services/deleteOrDeactivateExtraAction",
  () => ({
    deleteOrDeactivateExtraAction: deleteOrDeactivateMock,
  })
);

vi.mock("../services/reactivateExtraAction", () => ({
  reactivateExtraAction: reactivateMock,
}));
