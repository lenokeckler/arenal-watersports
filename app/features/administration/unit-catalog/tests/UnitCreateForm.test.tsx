import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import { getUnitCategory } from "../services/getUnitCategory";
import UnitCreateForm from "../UnitCreateForm";
import UnitFormView from "../UnitFormView";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import { BY_QUANTITY_UNIT_CATEGORY } from "./UnitForm.constants";
import { DEFAULT_UNIT_CATEGORY } from "./UnitList.constants";

const redirectMock = vi.hoisted(() => vi.fn());
const NOT_FOUND = "NEXT_NOT_FOUND";

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getUnitCategory");

const renderEntry = () =>
  UnitCreateForm({ categoryId: FAKE_CATEGORY_ID });

describe("UnitCreateForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getUnitCategory).mockResolvedValue(
      DEFAULT_UNIT_CATEGORY
    );
  });

  it("redirects a worker who is not an administrator home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow();

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getUnitCategory).not.toHaveBeenCalled();
  });

  it.each([
    ["does not exist", null],
    ["is counted by quantity", BY_QUANTITY_UNIT_CATEGORY],
  ])(
    "shows not found when the category %s",
    async (_name, category) => {
      vi.mocked(getUnitCategory).mockResolvedValue(
        category
      );

      await expect(renderEntry()).rejects.toThrow(
        NOT_FOUND
      );
    }
  );

  it("gives administration the create form of the category", async () => {
    const element = await renderEntry();

    expect(element.type).toBe(UnitFormView);
    expect(element.props).toEqual({
      mode: UNIT_FORM_MODE.CREATE,
      category: DEFAULT_UNIT_CATEGORY,
    });
  });
});
