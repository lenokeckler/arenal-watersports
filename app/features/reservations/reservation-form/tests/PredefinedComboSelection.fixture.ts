import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { createPredefinedComboSelectionPage } from "./PredefinedComboSelection.page";
import { renderReservationForm } from "./ReservationFormView.fixture";

const regularCombo: ReservationPredefinedCombo = {
  audience: "national",
  currency: "CRC",
  id: "cccccccc-0000-0000-0000-000000000002",
  items: [
    {
      categoryId: "category-jet-ski",
      categoryName: "Jet Ski",
      isGuideOnly: false,
      quantity: 2,
    },
  ],
  name: "Paquete lago",
  packagePrice: 25000,
};

const guideCombo: ReservationPredefinedCombo = {
  ...regularCombo,
  id: "cccccccc-0000-0000-0000-000000000003",
  items: [
    {
      categoryId: "category-guide",
      categoryName: "Tour en lancha",
      isGuideOnly: true,
      quantity: 1,
    },
  ],
  name: "Paquete con tour",
};

export const PREDEFINED_COMBO_SELECTION_FIXTURE = {
  COMBO: regularCombo,
  GUIDE_COMBO: guideCombo,
} as const;

export const selectPredefinedCombo = async (
  comboId: string,
  combo = PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO
): Promise<
  ReturnType<typeof createPredefinedComboSelectionPage>
> => {
  renderReservationForm(undefined, [combo]);
  const page = createPredefinedComboSelectionPage(
    document.body
  );
  await page.selectComboReservation();
  await page.selectMode(
    PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
  );
  await page.selectCombo(comboId);
  return page;
};
