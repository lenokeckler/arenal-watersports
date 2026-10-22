import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { PREDEFINED_COMBO_SELECTION_FIXTURE } from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { createPredefinedComboSelectionPage } from "./PredefinedComboSelection.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { createCustomComboPage } from "./CustomCombo.page";

export const prepareGuideAssignedPredefinedComboSubmission =
  async () => {
    renderReservationForm(
      {
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
        guides: [
          {
            id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
            name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
          },
        ],
      },
      [PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO]
    );
    const customComboPage = createCustomComboPage(
      document.body
    );
    await customComboPage.selectComboWithGuide(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    );
    const predefinedComboPage =
      createPredefinedComboSelectionPage(document.body);
    await predefinedComboPage.selectMode(
      PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
    );
    await predefinedComboPage.selectCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id
    );
    await predefinedComboPage.fillCustomerName(
      PREDEFINED_COMBO_SELECTION_TEST.CUSTOMER_NAME
    );
    return predefinedComboPage;
  };
