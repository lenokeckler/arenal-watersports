import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import UnitPhotosView from "../UnitPhotosView";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { validatePhotoFile } from "../utils/validatePhotoFile";
import {
  PHOTOS_DATA,
  PHOTO_UNIT_ID,
} from "./UnitPhotos.constants";

const { refresh, uploadUnitPhoto } = vi.hoisted(() => ({
  refresh: vi.fn(),
  uploadUnitPhoto: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("../services/uploadUnitPhoto", () => ({
  uploadUnitPhoto,
}));

const MANAGER_DATA = { ...PHOTOS_DATA, canManage: true };
const FRONT_LABEL = `${UNIT_PHOTOS_COPY.UPLOAD}: ${UNIT_PHOTOS_COPY.ANGLE.front}`;
const RIGHT_LABEL = `${UNIT_PHOTOS_COPY.REPLACE}: ${UNIT_PHOTOS_COPY.ANGLE.right_side}`;

const buildFile = (type: string): File =>
  new File(["photo"], "photo.jpg", { type });

describe("UnitPhotoUpload", () => {
  beforeEach(() => {
    refresh.mockReset();
    uploadUnitPhoto.mockReset();
    uploadUnitPhoto.mockResolvedValue(undefined);
  });

  it("offers no upload to someone without the general manager mark", () => {
    render(
      <UnitPhotosView
        data={PHOTOS_DATA}
        errorMessage={null}
      />
    );

    expect(
      screen.queryByLabelText(FRONT_LABEL)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(RIGHT_LABEL)
    ).not.toBeInTheDocument();
  });

  it("offers to upload an empty angle and to replace the one that has a photo", () => {
    render(
      <UnitPhotosView
        data={MANAGER_DATA}
        errorMessage={null}
      />
    );

    expect(
      screen.getByLabelText(FRONT_LABEL)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(RIGHT_LABEL)
    ).toBeInTheDocument();
  });

  it("uploads the chosen photo for its angle and refreshes the screen", async () => {
    const user = userEvent.setup();
    const file = buildFile("image/jpeg");
    render(
      <UnitPhotosView
        data={MANAGER_DATA}
        errorMessage={null}
      />
    );

    await user.upload(
      screen.getByLabelText(FRONT_LABEL),
      file
    );

    await waitFor(() => {
      expect(uploadUnitPhoto).toHaveBeenCalledWith({
        angle: "front",
        file,
        unitId: PHOTO_UNIT_ID,
      });
    });
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByText(UNIT_PHOTOS_COPY.SAVED)
    ).toBeInTheDocument();
  });

  it("refuses a file that is not an image without uploading it", async () => {
    const user = userEvent.setup({
      applyAccept: false,
    });
    render(
      <UnitPhotosView
        data={MANAGER_DATA}
        errorMessage={null}
      />
    );

    await user.upload(
      screen.getByLabelText(FRONT_LABEL),
      buildFile("application/pdf")
    );

    expect(
      await screen.findByText(UNIT_PHOTOS_COPY.ERROR_TYPE)
    ).toBeInTheDocument();
    expect(uploadUnitPhoto).not.toHaveBeenCalled();
  });

  it("says so when the photo could not be saved", async () => {
    uploadUnitPhoto.mockRejectedValue(new Error("denied"));
    const user = userEvent.setup();
    render(
      <UnitPhotosView
        data={MANAGER_DATA}
        errorMessage={null}
      />
    );

    await user.upload(
      screen.getByLabelText(FRONT_LABEL),
      buildFile("image/png")
    );

    expect(
      await screen.findByText(UNIT_PHOTOS_COPY.ERROR_UPLOAD)
    ).toBeInTheDocument();
    expect(refresh).not.toHaveBeenCalled();
  });
});

describe("validatePhotoFile", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])(
    "accepts %s",
    (type) => {
      expect(
        validatePhotoFile({ size: 1024, type })
      ).toBeNull();
    }
  );

  it("refuses a type that is not an image the bucket allows", () => {
    expect(
      validatePhotoFile({ size: 1024, type: "image/gif" })
    ).toBe(UNIT_PHOTOS_COPY.ERROR_TYPE);
  });

  it("refuses a photo over 5 MB and accepts exactly 5 MB", () => {
    expect(
      validatePhotoFile({
        size: 5_242_881,
        type: "image/jpeg",
      })
    ).toBe(UNIT_PHOTOS_COPY.ERROR_SIZE);
    expect(
      validatePhotoFile({
        size: 5_242_880,
        type: "image/jpeg",
      })
    ).toBeNull();
  });
});
