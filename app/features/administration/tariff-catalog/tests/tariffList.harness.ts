import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({ refresh: vi.fn() }));

export const refreshMock = hoisted.refresh;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));
