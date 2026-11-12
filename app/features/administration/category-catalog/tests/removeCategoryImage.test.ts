import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { removeCategoryImage } from "../utils/removeCategoryImage";
import { IMAGE_CATEGORY_ID } from "./CategoryImage.constants";
import {
  ACTION_ERROR_MESSAGE,
  SET_ERROR_RESULT,
  SET_LEFTOVER_RESULT,
  SET_SUCCESS_RESULT,
} from "./CategoryImageScreen.constants";

const mockRemoveAction = vi.fn();

vi.mock("../services/removeCategoryImageAction", () => ({
  removeCategoryImageAction: (categoryId: string) =>
    mockRemoveAction(categoryId),
}));

describe("removeCategoryImage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockRemoveAction.mockResolvedValue(SET_SUCCESS_RESULT);
  });

  afterEach(() => vi.restoreAllMocks());

  it("removes the image and reports the success toast", async () => {
    const outcome = await removeCategoryImage(
      IMAGE_CATEGORY_ID
    );

    expect(mockRemoveAction).toHaveBeenCalledWith(
      IMAGE_CATEGORY_ID
    );
    expect(outcome).toEqual({
      hasLeftoverObject: false,
      message: CATEGORY_IMAGE_COPY.REMOVE_SUCCESS_TOAST,
      status: STATUS.SUCCESS,
    });
  });

  it("reports a leftover object", async () => {
    mockRemoveAction.mockResolvedValue(SET_LEFTOVER_RESULT);

    const outcome = await removeCategoryImage(
      IMAGE_CATEGORY_ID
    );

    expect(outcome.hasLeftoverObject).toBe(true);
  });

  it("returns the action message when it refuses", async () => {
    mockRemoveAction.mockResolvedValue(SET_ERROR_RESULT);

    const outcome = await removeCategoryImage(
      IMAGE_CATEGORY_ID
    );

    expect(outcome.message).toBe(ACTION_ERROR_MESSAGE);
    expect(outcome.status).toBe(STATUS.ERROR);
  });

  it("explains an unreachable server", async () => {
    mockRemoveAction.mockRejectedValue(
      new Error("network")
    );

    const outcome = await removeCategoryImage(
      IMAGE_CATEGORY_ID
    );

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.REMOVE_ERROR
    );
  });

  it("does not call the server while offline", async () => {
    vi.spyOn(
      window.navigator,
      "onLine",
      "get"
    ).mockReturnValue(false);

    const outcome = await removeCategoryImage(
      IMAGE_CATEGORY_ID
    );

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.OFFLINE_ERROR
    );
    expect(mockRemoveAction).not.toHaveBeenCalled();
  });
});
