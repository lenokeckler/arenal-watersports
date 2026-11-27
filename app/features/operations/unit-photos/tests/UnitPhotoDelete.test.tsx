import { cleanup, waitFor } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import UnitPhotosView from "../UnitPhotosView";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import {
  PHOTOS_DATA,
  PHOTO_UNIT_ID,
} from "./UnitPhotos.constants";
import { createUnitPhotoDeletePage } from "./UnitPhotoDelete.page";
import {
  clearToasts,
  renderWithToasts,
} from "./renderWithToasts";

const { deleteUnitPhoto, refresh } = vi.hoisted(() => ({
  deleteUnitPhoto: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("../services/deleteUnitPhoto", () => ({
  deleteUnitPhoto,
}));

const openConfirmation = async () => {
  renderWithToasts(
    <UnitPhotosView
      data={{ ...PHOTOS_DATA, canManage: true }}
      errorMessage={null}
    />
  );
  const page = createUnitPhotoDeletePage();
  await page.openLarge();
  await page.askToDelete();

  return page;
};

describe("deleting a unit photo", () => {
  beforeEach(() => {
    deleteUnitPhoto.mockReset();
    deleteUnitPhoto.mockResolvedValue({
      isFileRemoved: true,
    });
    refresh.mockReset();
  });

  afterEach(() => {
    cleanup();
    clearToasts();
  });

  it("asks first and deletes nothing when cancelled", async () => {
    const page = await openConfirmation();

    await page.cancel();

    expect(
      page.queryConfirmation()
    ).not.toBeInTheDocument();
    expect(deleteUnitPhoto).not.toHaveBeenCalled();
  });

  it("deletes the photo of that angle once confirmed", async () => {
    const page = await openConfirmation();

    await page.confirm();

    expect(
      await page.findNotice(UNIT_PHOTOS_COPY.DELETED)
    ).toBeInTheDocument();
    expect(deleteUnitPhoto).toHaveBeenCalledWith({
      slot: PHOTOS_DATA.slots[0],
      unitId: PHOTO_UNIT_ID,
    });
    await waitFor(() =>
      expect(refresh).toHaveBeenCalledOnce()
    );
  });

  it("warns when the file stayed behind", async () => {
    deleteUnitPhoto.mockResolvedValue({
      isFileRemoved: false,
    });
    const page = await openConfirmation();

    await page.confirm();

    expect(
      await page.findNotice(
        UNIT_PHOTOS_COPY.DELETED_FILE_KEPT
      )
    ).toBeInTheDocument();
  });

  it("says so when the photo could not be deleted", async () => {
    deleteUnitPhoto.mockRejectedValue(new Error("denied"));
    const page = await openConfirmation();

    await page.confirm();

    expect(
      await page.findNotice(UNIT_PHOTOS_COPY.ERROR_DELETE)
    ).toBeInTheDocument();
    expect(refresh).not.toHaveBeenCalled();
  });
});
