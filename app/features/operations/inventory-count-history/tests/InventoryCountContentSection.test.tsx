import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import InventoryCountContentSection from "../components/InventoryCountContentSection";
import { INVENTORY_COUNT_HISTORY_COPY } from "../constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountContentCategory } from "../models/InventoryCountContent.interface";

const CATEGORIES: InventoryCountContentCategory[] = [
  {
    differenceCount: 1,
    name: "Jet Ski",
    quantities: [],
    units: [
      {
        code: "JET-01",
        countedStatus: "damaged",
        differs: true,
        systemStatus: "available",
      },
    ],
  },
  {
    differenceCount: 0,
    name: "Chalecos",
    quantities: [
      {
        counted: 8,
        differs: false,
        field: "available",
        system: 8,
      },
    ],
    units: [],
  },
];

it("shows each category with its summary, opening the ones that have differences and saying what the system had", () => {
  const { container } = render(
    <InventoryCountContentSection categories={CATEGORIES} />
  );

  expect(
    screen.getByText(
      INVENTORY_COUNT_HISTORY_COPY.CONTENT_HEADING
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      INVENTORY_COUNT_HISTORY_COPY.CATEGORY_SUMMARY(1)
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      INVENTORY_COUNT_HISTORY_COPY.CATEGORY_SUMMARY(0)
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      INVENTORY_COUNT_HISTORY_COPY.SYSTEM_HAD("Disponible")
    )
  ).toBeInTheDocument();
  const [withDifferences, clean] = Array.from(
    container.querySelectorAll("details")
  );
  expect(withDifferences).toHaveAttribute("open");
  expect(clean).not.toHaveAttribute("open");
});

it("renders nothing when the count has no lines", () => {
  const { container } = render(
    <InventoryCountContentSection categories={[]} />
  );

  expect(container).toBeEmptyDOMElement();
});
