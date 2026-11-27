import { describe, expect, it, vi } from "vitest";
import { deleteUnitPhoto } from "../services/deleteUnitPhoto";
import { uploadUnitPhoto } from "../services/uploadUnitPhoto";
import { buildPhotoPath } from "../utils/buildPhotoPath";
import {
  PHOTOS_DATA,
  PHOTO_UNIT_ID,
} from "./UnitPhotos.constants";
import { createPhotoClientMock } from "./createPhotoClientMock";

const { createClient } = vi.hoisted(() => ({
  createClient: vi.fn(),
}));

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: createClient,
}));

const PREVIOUS_PATH = `${PHOTO_UNIT_ID}/front-1`;
const TAKEN_AT = 2;
const SLOT = PHOTOS_DATA.slots[0];

const buildUpload = () => ({
  angle: "front" as const,
  file: new File(["photo"], "photo.jpg", {
    type: "image/jpeg",
  }),
  unitId: PHOTO_UNIT_ID,
});

describe("buildPhotoPath", () => {
  it("gives every version of an angle its own path", () => {
    expect(
      buildPhotoPath(PHOTO_UNIT_ID, "front", TAKEN_AT)
    ).toBe(`${PHOTO_UNIT_ID}/front-${TAKEN_AT}`);
  });
});

describe("uploadUnitPhoto", () => {
  it("writes a new file without overwriting and then removes the old one", async () => {
    const mock = createPhotoClientMock({
      previousPath: PREVIOUS_PATH,
    });
    createClient.mockReturnValue(mock.client);
    const clock = vi
      .spyOn(Date, "now")
      .mockReturnValue(TAKEN_AT);

    await uploadUnitPhoto(buildUpload());
    clock.mockRestore();

    expect(mock.upload).toHaveBeenCalledWith(
      buildPhotoPath(PHOTO_UNIT_ID, "front", TAKEN_AT),
      expect.any(File),
      { contentType: "image/jpeg" }
    );
    expect(mock.remove).toHaveBeenCalledWith([
      PREVIOUS_PATH,
    ]);
  });

  it("keeps the old file when the new photo could not be recorded", async () => {
    const mock = createPhotoClientMock({
      previousPath: PREVIOUS_PATH,
      recordError: { message: "denied" },
    });
    createClient.mockReturnValue(mock.client);

    await expect(
      uploadUnitPhoto(buildUpload())
    ).rejects.toThrow();
    expect(mock.remove).not.toHaveBeenCalled();
  });
});

describe("deleteUnitPhoto", () => {
  it("removes the row first and then its file", async () => {
    const mock = createPhotoClientMock({
      deletedPaths: [PREVIOUS_PATH],
      removedCount: 1,
    });
    createClient.mockReturnValue(mock.client);

    await expect(
      deleteUnitPhoto({
        slot: SLOT,
        unitId: PHOTO_UNIT_ID,
      })
    ).resolves.toEqual({ isFileRemoved: true });
    expect(mock.remove).toHaveBeenCalledWith([
      PREVIOUS_PATH,
    ]);
  });

  it("fails without touching files when no row was deleted", async () => {
    const mock = createPhotoClientMock({});
    createClient.mockReturnValue(mock.client);

    await expect(
      deleteUnitPhoto({
        slot: SLOT,
        unitId: PHOTO_UNIT_ID,
      })
    ).rejects.toThrow();
    expect(mock.remove).not.toHaveBeenCalled();
  });

  it("reports a file that was not removed", async () => {
    const mock = createPhotoClientMock({
      deletedPaths: [PREVIOUS_PATH],
    });
    createClient.mockReturnValue(mock.client);

    await expect(
      deleteUnitPhoto({
        slot: SLOT,
        unitId: PHOTO_UNIT_ID,
      })
    ).resolves.toEqual({ isFileRemoved: false });
  });
});
