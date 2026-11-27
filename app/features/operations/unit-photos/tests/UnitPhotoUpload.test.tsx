import {
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import {
  FRONT_LABEL,
  MANAGER_DATA,
  RIGHT_LABEL,
  buildPhotoFile,
} from "./UnitPhotoUpload.constants";
import {
  clearToasts,
  renderWithToasts,
} from "./renderWithToasts";

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

const renderPhotos = (data = MANAGER_DATA) =>
  renderWithToasts(
    <UnitPhotosView
      data={data}
      errorMessage={null}
    />
  );

describe("UnitPhotoUpload", () => {
  beforeEach(() => {
    refresh.mockReset();
    uploadUnitPhoto.mockReset();
    uploadUnitPhoto.mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    clearToasts();
  });

  it("offers no upload to a temporary guide and says why", () => {
    renderPhotos(PHOTOS_DATA);

    expect(
      screen.getByText(UNIT_PHOTOS_COPY.VIEW_ONLY)
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(FRONT_LABEL)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(RIGHT_LABEL)
    ).not.toBeInTheDocument();
  });

  it("offers to upload an empty angle and to replace a photo from its large view", async () => {
    const user = userEvent.setup();
    renderPhotos();

    expect(
      screen.getByLabelText(FRONT_LABEL)
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(RIGHT_LABEL)
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: UNIT_PHOTOS_COPY.VIEW_LARGE(
          UNIT_PHOTOS_COPY.ANGLE.right_side
        ),
      })
    );

    expect(
      screen.getByLabelText(RIGHT_LABEL)
    ).toBeInTheDocument();
  });

  it("uploads the chosen photo for its angle and refreshes the screen", async () => {
    const user = userEvent.setup();
    const file = buildPhotoFile("image/jpeg");
    renderPhotos();

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
    renderPhotos();

    await user.upload(
      screen.getByLabelText(FRONT_LABEL),
      buildPhotoFile("application/pdf")
    );

    expect(
      await screen.findByText(UNIT_PHOTOS_COPY.ERROR_TYPE)
    ).toBeInTheDocument();
    expect(uploadUnitPhoto).not.toHaveBeenCalled();
  });

  it("says so when the photo could not be saved", async () => {
    uploadUnitPhoto.mockRejectedValue(new Error("denied"));
    const user = userEvent.setup();
    renderPhotos();

    await user.upload(
      screen.getByLabelText(FRONT_LABEL),
      buildPhotoFile("image/png")
    );

    expect(
      await screen.findByText(UNIT_PHOTOS_COPY.ERROR_UPLOAD)
    ).toBeInTheDocument();
    expect(refresh).not.toHaveBeenCalled();
  });
});
