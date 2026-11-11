import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UnitPhotosView from "../UnitPhotosView";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { buildPhotoSlots } from "../utils/buildPhotoSlots";
import {
  PHOTOS_DATA,
  PHOTO_URL,
} from "./UnitPhotos.constants";

describe("UnitPhotosView", () => {
  it("shows the impact count next to a slot per angle", () => {
    render(
      <UnitPhotosView
        data={PHOTOS_DATA}
        errorMessage={null}
      />
    );

    expect(
      screen.getByText("JS-1 · Jet ski")
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${UNIT_PHOTOS_COPY.IMPACTS}3`)
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
    render(
      <UnitPhotosView
        data={PHOTOS_DATA}
        errorMessage={null}
      />
    );

    expect(
      screen.getByRole("img", {
        name: `${UNIT_PHOTOS_COPY.ALT_PREFIX}${UNIT_PHOTOS_COPY.ANGLE.right_side}`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(UNIT_PHOTOS_COPY.NO_PHOTO)
    ).toHaveLength(3);
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

describe("buildPhotoSlots", () => {
  it("keeps the order of the angles and leaves the missing ones empty", () => {
    const slots = buildPhotoSlots(
      [{ angle: "front", storage_path: "u/front" }],
      new Map([["u/front", PHOTO_URL]])
    );

    expect(slots.map((slot) => slot.angle)).toEqual([
      "right_side",
      "left_side",
      "front",
      "bottom",
    ]);
    expect(slots.map((slot) => slot.url)).toEqual([
      null,
      null,
      PHOTO_URL,
      null,
    ]);
  });

  it("leaves a slot empty when its url could not be signed", () => {
    const slots = buildPhotoSlots(
      [{ angle: "front", storage_path: "u/front" }],
      new Map()
    );

    expect(slots[2].url).toBeNull();
  });
});
