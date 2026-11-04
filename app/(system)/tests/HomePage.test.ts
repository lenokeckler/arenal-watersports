import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import HomePage from "../page";
import { REDIRECT_SIGNAL_MESSAGE } from "./HomePage.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("sends the entry route to the equipment board", () => {
    expect(() => HomePage()).toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );
    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith(PATHS.BOARD);
  });
});
