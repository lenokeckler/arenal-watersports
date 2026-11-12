import { describe, expect, it } from "vitest";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { reduceCustomComboDraft } from "../utils/reduceCustomComboDraft";
import { REDUCE_CUSTOM_COMBO_DRAFT_TEST } from "./reduceCustomComboDraft.constants";

describe("reduceCustomComboDraft", () => {
  it("clears the selected equipment and agreed amounts when reset", () => {
    const draft = {
      agreedAmountCrc:
        REDUCE_CUSTOM_COMBO_DRAFT_TEST.AGREED_AMOUNT_CRC,
      agreedAmountUsd:
        REDUCE_CUSTOM_COMBO_DRAFT_TEST.AGREED_AMOUNT_USD,
      extraIds: [],
      extraUnitId: null,
      items: [
        {
          categoryId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
          quantity: REDUCE_CUSTOM_COMBO_DRAFT_TEST.QUANTITY,
        },
      ],
    };

    expect(
      reduceCustomComboDraft(draft, {
        type: CUSTOM_COMBO_DRAFT_ACTION.RESET,
      })
    ).toEqual(CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS);
  });

  it("binds selected extras to the selected concrete unit", () => {
    const draft = {
      ...CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      items: [
        {
          categoryId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
          unitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
        },
      ],
    };

    expect(
      reduceCustomComboDraft(draft, {
        type: CUSTOM_COMBO_DRAFT_ACTION.EXTRA_TOGGLE,
        extraId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.EXTRA_ID,
        unitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
      })
    ).toMatchObject({
      extraIds: [REDUCE_CUSTOM_COMBO_DRAFT_TEST.EXTRA_ID],
      extraUnitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
    });
  });

  it("clears selected extras when their concrete unit changes", () => {
    const draft = {
      ...CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      extraIds: [REDUCE_CUSTOM_COMBO_DRAFT_TEST.EXTRA_ID],
      extraUnitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
      items: [
        {
          categoryId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
          unitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
        },
      ],
    };

    expect(
      reduceCustomComboDraft(draft, {
        type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_CHANGE,
        selection: {
          categoryId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
          unitId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.REPLACEMENT_UNIT_ID,
        },
      })
    ).toMatchObject({ extraIds: [], extraUnitId: null });
  });

  it("clears selected extras when their concrete unit is removed", () => {
    const draft = {
      ...CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      extraIds: [REDUCE_CUSTOM_COMBO_DRAFT_TEST.EXTRA_ID],
      extraUnitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
      items: [
        {
          categoryId:
            REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
          unitId: REDUCE_CUSTOM_COMBO_DRAFT_TEST.UNIT_ID,
        },
      ],
    };

    expect(
      reduceCustomComboDraft(draft, {
        type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL,
        categoryId:
          REDUCE_CUSTOM_COMBO_DRAFT_TEST.CATEGORY_ID,
      })
    ).toMatchObject({ extraIds: [], extraUnitId: null });
  });
});
