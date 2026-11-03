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
import { getUnit } from "../services/getUnit";
import { getUnitCategory } from "../services/getUnitCategory";
import UnitEditForm from "../UnitEditForm";
import UnitFormView from "../UnitFormView";
import {
  DEFAULT_UNIT,
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";
import {
  BY_QUANTITY_UNIT_CATEGORY,
  OTHER_CATEGORY_UNIT,
} from "./UnitForm.constants";
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
vi.mock("../services/getUnit");

const renderEntry = () =>
  UnitEditForm({
    categoryId: FAKE_CATEGORY_ID,
    unitId: FAKE_UNIT_ID,
  });

describe("UnitEditForm", () => {
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
    vi.mocked(getUnit).mockResolvedValue(DEFAULT_UNIT);
  });

  it("redirects a worker who is not an administrator home without reading the unit", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow();

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getUnit).not.toHaveBeenCalled();
  });

  it.each([
    ["the category does not exist", null, DEFAULT_UNIT],
    [
      "the category is counted by quantity",
      BY_QUANTITY_UNIT_CATEGORY,
      DEFAULT_UNIT,
    ],
    [
      "the unit does not exist",
      DEFAULT_UNIT_CATEGORY,
      null,
    ],
    [
      "the unit belongs to another category",
      DEFAULT_UNIT_CATEGORY,
      OTHER_CATEGORY_UNIT,
    ],
  ])(
    "shows not found when %s",
    async (_name, category, unit) => {
      vi.mocked(getUnitCategory).mockResolvedValue(
        category
      );
      vi.mocked(getUnit).mockResolvedValue(unit);

      await expect(renderEntry()).rejects.toThrow(
        NOT_FOUND
      );
    }
  );

  it("gives administration the edit form of the unit", async () => {
    const element = await renderEntry();

    expect(element.type).toBe(UnitFormView);
    expect(element.props).toEqual({
      mode: UNIT_FORM_MODE.EDIT,
      category: DEFAULT_UNIT_CATEGORY,
      unit: DEFAULT_UNIT,
    });
  });
});
