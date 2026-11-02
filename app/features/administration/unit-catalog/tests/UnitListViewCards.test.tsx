import { describe, expect, it, vi } from "vitest";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import {
  UNIT_EFFECTIVE_STATUS,
  UNIT_STATUS,
} from "../constants/UnitStatus.constants";
import { UNIT_STATUS_LABEL } from "../constants/UnitStatusLabel.constants";
import { UNIT_CARD_DIMMED_CLASS } from "../styles/UnitCard.styles";
import { resolveUnitEditPath } from "../utils/resolveUnitPaths";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import {
  buildUnitListItem,
  DEFAULT_UNIT_LIST_ITEM,
  FAKE_CATEGORY_NAME,
} from "./UnitList.constants";
import { createUnitListPage } from "./UnitList.page";
import { renderUnitListView } from "./renderUnitListView";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

const UNIT_CODE = DEFAULT_UNIT_LIST_ITEM.code;

describe("UnitListView cards", () => {
  it("titles the screen with the category and links back to the categories", () => {
    renderUnitListView();
    const unitListPage = createUnitListPage();

    expect(
      unitListPage.getTitle(
        `${UNIT_LIST_COPY.LIST_TITLE_PREFIX} ${FAKE_CATEGORY_NAME}`
      )
    ).toBeInTheDocument();
    expect(unitListPage.getBackLink()).toBeInTheDocument();
  });

  it.each(Object.values(UNIT_STATUS))(
    "shows the label of the %s status on the card",
    (status) => {
      renderUnitListView({
        units: [
          buildUnitListItem({
            recordedStatus: status,
            effectiveStatus: status,
            decommissioned:
              status === UNIT_STATUS.DECOMMISSIONED,
          }),
        ],
      });

      expect(
        createUnitListPage().getText(
          UNIT_STATUS_LABEL[status]
        )
      ).toBeInTheDocument();
    }
  );

  it("shows the occupied label when the view says the unit is occupied", () => {
    renderUnitListView({
      units: [
        buildUnitListItem({
          effectiveStatus: UNIT_EFFECTIVE_STATUS.OCCUPIED,
        }),
      ],
    });

    expect(
      createUnitListPage().getText(
        UNIT_STATUS_LABEL[UNIT_EFFECTIVE_STATUS.OCCUPIED]
      )
    ).toBeInTheDocument();
  });

  it("links an active unit to its edit page", () => {
    renderUnitListView();

    expect(
      createUnitListPage().getEditLink(UNIT_CODE)
    ).toHaveAttribute(
      "href",
      resolveUnitEditPath(
        FAKE_CATEGORY_ID,
        DEFAULT_UNIT_LIST_ITEM.id
      )
    );
  });

  it("dims a decommissioned unit and offers no edit link", () => {
    renderUnitListView({
      units: [
        buildUnitListItem({
          effectiveStatus: UNIT_STATUS.DECOMMISSIONED,
          decommissioned: true,
        }),
      ],
    });
    const unitListPage = createUnitListPage();

    expect(unitListPage.getCard(UNIT_CODE)).toHaveClass(
      UNIT_CARD_DIMMED_CLASS
    );
    expect(unitListPage.getEditLink(UNIT_CODE)).toBeNull();
  });
});
