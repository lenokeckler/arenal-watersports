import { vi } from "vitest";

vi.mock("../actions/submitFirstPasswordChange", () => ({
  submitFirstPasswordChange: vi.fn(),
}));
