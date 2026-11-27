import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  KEYBOARD,
  PATHS,
  UNIT_PHOTO_BASIC_ANGLES,
} from "@/app/constants";
import { describe, expect, it } from "vitest";
import { IMPACT_COUNT_COPY } from "@/app/components/impact-count/constants/ImpactCountCopy.constants";
import UnitPhotosView from "../UnitPhotosView";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import {
  PHOTO_UNIT_ID,
  PHOTOS_DATA,
} from "./UnitPhotos.constants";

const renderPhotos = () =>
  render(
    <UnitPhotosView
      data={PHOTOS_DATA}
      errorMessage={null}
    />
  );

describe("UnitPhotosView", () => {
  it("shows the impact count next to a slot per angle", () => {
    renderPhotos();

    expect(
      screen.getByText("JS-1 · Jet ski")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        IMPACT_COUNT_COPY.SPOKEN(
          PHOTOS_DATA.unit.impactCount
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(UNIT_PHOTOS_COPY.ANGLE.right_side)
    ).toBeInTheDocument();
    expect(
      screen.getByText(UNIT_PHOTOS_COPY.ANGLE.left_side)
    ).toBeInTheDocument();
    expect(
      screen.getByText(UNIT_PHOTOS_COPY.ANGLE.front)
    ).toBeInTheDocument();
    expect(
      screen.getByText(UNIT_PHOTOS_COPY.ANGLE.bottom)
    ).toBeInTheDocument();
  });

  it("shows the photo that exists and says which angles have none", () => {
    renderPhotos();

    expect(
      screen.getByRole("img", {
        name: `${UNIT_PHOTOS_COPY.ALT_PREFIX}${UNIT_PHOTOS_COPY.ANGLE.right_side}`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(UNIT_PHOTOS_COPY.NO_PHOTO)
    ).toHaveLength(PHOTOS_DATA.slots.length - 1);
    expect(
      screen.getByText(
        UNIT_PHOTOS_COPY.BASIC_PROGRESS(
          1,
          UNIT_PHOTO_BASIC_ANGLES.length
        )
      )
    ).toBeInTheDocument();
  });

  it("opens a photo in large and closes it again", () => {
    renderPhotos();

    fireEvent.click(
      screen.getByRole("button", {
        name: UNIT_PHOTOS_COPY.VIEW_LARGE(
          UNIT_PHOTOS_COPY.ANGLE.right_side
        ),
      })
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      UNIT_PHOTOS_COPY.ANGLE.right_side
    );

    fireEvent.keyDown(document, { key: KEYBOARD.ESCAPE });

    expect(
      screen.queryByRole("dialog")
    ).not.toBeInTheDocument();
  });

  it("links to the damage report and to the history of the machine", () => {
    renderPhotos();

    expect(
      screen.getByRole("link", {
        name: UNIT_PHOTOS_COPY.REPORT_DAMAGE,
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(PHOTO_UNIT_ID)
    );
    expect(
      screen.getByRole("link", {
        name: UNIT_PHOTOS_COPY.VIEW_HISTORY,
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_HISTORY(PHOTO_UNIT_ID)
    );
  });

  it("shows only the message when the unit is not found", () => {
    render(
      <UnitPhotosView
        data={null}
        errorMessage={UNIT_PHOTOS_COPY.NOT_FOUND}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      UNIT_PHOTOS_COPY.NOT_FOUND
    );
    expect(
      screen.queryByRole("img")
    ).not.toBeInTheDocument();
  });
});
