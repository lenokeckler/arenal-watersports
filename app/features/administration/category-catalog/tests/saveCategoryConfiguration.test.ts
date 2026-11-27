import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_CONFIGURATION_STEP as STEP } from "../constants/CategoryConfigurationStep.constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { saveCategoryConfiguration } from "../utils/saveCategoryConfiguration";
import { validateCategoryConfiguration } from "../utils/validateCategoryConfiguration";
import {
  BASELINE_DRAFT,
  buildDraft,
  INVALID_EDITED_VALUES,
  ONE_FLAG_EDITED_VALUES,
} from "./CategoryConfigureSave.constants";
import { buildImageFile } from "./CategoryImage.constants";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

const mockSaveImage = vi.fn();
const mockUpdateConfiguration = vi.fn();
const mockMarkInactive = vi.fn();
const mockReactivate = vi.fn();

vi.mock("../utils/saveCategoryImage", () => ({
  saveCategoryImage: (options: object) =>
    mockSaveImage(options),
}));
vi.mock(
  "../services/updateCategoryConfigurationAction",
  () => ({
    updateCategoryConfigurationAction: (input: object) =>
      mockUpdateConfiguration(input),
  })
);
vi.mock("../services/markCategoryInactiveAction", () => ({
  markCategoryInactiveAction: (categoryId: string) =>
    mockMarkInactive(categoryId),
}));
vi.mock("../services/reactivateCategoryAction", () => ({
  reactivateCategoryAction: (categoryId: string) =>
    mockReactivate(categoryId),
}));

const SUCCESS_RESULT = {
  status: CATEGORY_MUTATION_STATUS.SUCCESS,
};
const SAVED = {
  status: STATUS.SUCCESS,
  message: CATEGORY_CONFIGURE_SAVE_COPY.SAVED,
};
const FAILED = {
  status: STATUS.ERROR,
  message: CATEGORY_CONFIGURE_SAVE_COPY.FAILED,
};
const REFUSAL_MESSAGE =
  CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_TOO_HIGH_ERROR;
const PHOTO_FAILURE = {
  hasLeftoverObject: false,
  status: STATUS.ERROR,
  message: CATEGORY_IMAGE_COPY.UPLOAD_ERROR,
};
const PHOTO_SUCCESS = {
  ...PHOTO_FAILURE,
  status: STATUS.SUCCESS,
  message: CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
};
const EVERYTHING_CHANGED = buildDraft({
  values: ONE_FLAG_EDITED_VALUES,
  pickedFile: buildImageFile(),
  isActive: false,
});

const save = (
  current = EVERYTHING_CHANGED,
  baseline = BASELINE_DRAFT
) =>
  saveCategoryConfiguration({
    categoryId: FAKE_CATEGORY_ID,
    baseline,
    current,
  });

const expectNoNetworkCall = (): void => {
  expect(mockSaveImage).not.toHaveBeenCalled();
  expect(mockUpdateConfiguration).not.toHaveBeenCalled();
  expect(mockMarkInactive).not.toHaveBeenCalled();
  expect(mockReactivate).not.toHaveBeenCalled();
};

describe("saveCategoryConfiguration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSaveImage.mockResolvedValue(PHOTO_SUCCESS);
    mockUpdateConfiguration.mockResolvedValue(
      SUCCESS_RESULT
    );
    mockMarkInactive.mockResolvedValue(SUCCESS_RESULT);
    mockReactivate.mockResolvedValue(SUCCESS_RESULT);
  });

  it("saves the photo, the settings and the active switch in that order", async () => {
    const { steps } = await save();
    const [photoOrder] =
      mockSaveImage.mock.invocationCallOrder;
    const [settingsOrder] =
      mockUpdateConfiguration.mock.invocationCallOrder;
    const [activeOrder] =
      mockMarkInactive.mock.invocationCallOrder;

    expect(steps).toEqual({
      [STEP.PHOTO]: PHOTO_SUCCESS,
      [STEP.SETTINGS]: SAVED,
      [STEP.ACTIVE]: SAVED,
    });
    expect(photoOrder).toBeLessThan(settingsOrder);
    expect(settingsOrder).toBeLessThan(activeOrder);
  });

  it("reactivates the category when the switch goes back on", async () => {
    await save(
      buildDraft(),
      buildDraft({ isActive: false })
    );

    expect(mockReactivate).toHaveBeenCalledWith(
      FAKE_CATEGORY_ID
    );
    expect(mockMarkInactive).not.toHaveBeenCalled();
  });

  it("reports a failed photo and still saves the other steps", async () => {
    mockSaveImage.mockResolvedValue(PHOTO_FAILURE);

    const { steps } = await save();

    expect(steps).toEqual({
      [STEP.PHOTO]: PHOTO_FAILURE,
      [STEP.SETTINGS]: SAVED,
      [STEP.ACTIVE]: SAVED,
    });
  });

  it("reports the message of a refused settings update and keeps the other steps", async () => {
    mockUpdateConfiguration.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message: REFUSAL_MESSAGE,
    });

    const { steps } = await save();

    expect(steps).toEqual({
      [STEP.PHOTO]: PHOTO_SUCCESS,
      [STEP.SETTINGS]: {
        status: STATUS.ERROR,
        message: REFUSAL_MESSAGE,
      },
      [STEP.ACTIVE]: SAVED,
    });
  });

  it("turns an unreachable settings update or switch into the failed message", async () => {
    mockUpdateConfiguration.mockRejectedValue(
      new Error("offline")
    );
    mockMarkInactive.mockRejectedValue(
      new Error("offline")
    );

    const { steps } = await save();

    expect(steps).toEqual({
      [STEP.PHOTO]: PHOTO_SUCCESS,
      [STEP.SETTINGS]: FAILED,
      [STEP.ACTIVE]: FAILED,
    });
  });

  it("blocks every network call when a field is invalid", async () => {
    const outcome = await save(
      buildDraft({
        values: INVALID_EDITED_VALUES,
        pickedFile: buildImageFile(),
        isActive: false,
      })
    );

    expect(outcome).toEqual({
      validation: validateCategoryConfiguration(
        INVALID_EDITED_VALUES
      ),
      steps: {},
    });
    expectNoNetworkCall();
  });

  it("makes no call when nothing changed", async () => {
    const outcome = await save(BASELINE_DRAFT);

    expect(outcome.steps).toEqual({});
    expect(outcome.validation.isValid).toBe(true);
    expectNoNetworkCall();
  });
});
