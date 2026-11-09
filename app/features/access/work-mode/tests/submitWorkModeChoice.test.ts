import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  PATHS,
  SUPABASE_WORK_AREA,
  WORK_MODE_FIELD,
  WORK_MODE_RESULT,
} from "@/app/constants";
import { chooseWorkAreaAsSignedIn } from "@/app/services/work-mode";
import { submitWorkModeChoice } from "../actions/submitWorkModeChoice";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/app/services/work-mode", () => ({
  chooseWorkAreaAsSignedIn: vi.fn(),
}));

const areaForm = (area: string): FormData => {
  const formData = new FormData();
  formData.set(WORK_MODE_FIELD.AREA, area);

  return formData;
};

describe("submitWorkModeChoice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets the mode and returns to the home", async () => {
    vi.mocked(chooseWorkAreaAsSignedIn).mockResolvedValue(
      WORK_MODE_RESULT.CHOSEN
    );

    await expect(
      submitWorkModeChoice(
        null,
        areaForm(SUPABASE_WORK_AREA.OPERATIONS)
      )
    ).rejects.toThrow();
    expect(chooseWorkAreaAsSignedIn).toHaveBeenCalledWith(
      SUPABASE_WORK_AREA.OPERATIONS
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("changes nothing for an unknown area", async () => {
    expect(
      await submitWorkModeChoice(null, areaForm("gerencia"))
    ).toBe(WORK_MODE_RESULT.FAILED);
    expect(chooseWorkAreaAsSignedIn).not.toHaveBeenCalled();
  });

  it("answers a refusal to the card", async () => {
    vi.mocked(chooseWorkAreaAsSignedIn).mockResolvedValue(
      WORK_MODE_RESULT.NOT_ENABLED
    );

    expect(
      await submitWorkModeChoice(
        null,
        areaForm(SUPABASE_WORK_AREA.OPERATIONS)
      )
    ).toBe(WORK_MODE_RESULT.NOT_ENABLED);
    expect(redirect).not.toHaveBeenCalled();
  });
});
