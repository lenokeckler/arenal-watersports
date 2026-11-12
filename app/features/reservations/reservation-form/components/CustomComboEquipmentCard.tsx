import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON, STRING } from "@/app/constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { CustomComboEquipmentCardProps } from "../models/CustomComboEquipmentCardProps.interface";
import {
  CUSTOM_COMBO_ADD_BUTTON_CLASS,
  CUSTOM_COMBO_CATEGORY_ACTIONS_CLASS,
  CUSTOM_COMBO_CATEGORY_CARD_CLASS,
  CUSTOM_COMBO_REMOVE_BUTTON_CLASS,
  CUSTOM_COMBO_TARIFF_UNAVAILABLE_CLASS,
  CUSTOM_COMBO_UNIT_SELECTOR_LAYOUT_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCardHeader from "./CustomComboEquipmentCardHeader";
import CustomComboEquipmentQuantityControl from "./CustomComboEquipmentQuantityControl";
import CustomComboUnitAvailabilitySelector from "./CustomComboUnitAvailabilitySelector";
import CustomComboUnitExtras from "./CustomComboUnitExtras";

const InterchangeableEquipmentControl = ({
  category,
  onAdd,
  onDecrease,
  onIncrease,
  selection,
}: CustomComboEquipmentCardProps): React.JSX.Element => {
  if (
    selection?.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY
  ) {
    return (
      <CustomComboEquipmentQuantityControl
        categoryName={category.name}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        quantity={selection.quantity}
      />
    );
  }

  return (
    <Button
      className={CUSTOM_COMBO_ADD_BUTTON_CLASS}
      onClick={onAdd}
      type="button"
      variant={BUTTON.BASE}
    >
      {CUSTOM_COMBO_FORM_COPY.ADD}
    </Button>
  );
};

const ConcreteUnitEquipmentControl = ({
  category,
  date,
  durationHours,
  extraIds,
  extraUnitId,
  onExtraToggle,
  onRemove,
  onUnitChange,
  selection,
  time,
}: CustomComboEquipmentCardProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_UNIT_SELECTOR_LAYOUT_CLASS}>
    <CustomComboUnitAvailabilitySelector
      categoryId={category.id}
      categoryName={category.name}
      date={date}
      durationHours={durationHours}
      time={time}
      selectedUnitId={
        selection?.kind ===
        RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
          ? selection.unitId
          : STRING.Empty
      }
      onChange={onUnitChange}
    />
    {selection ? (
      <Button
        className={CUSTOM_COMBO_REMOVE_BUTTON_CLASS}
        onClick={onRemove}
        type="button"
        variant={BUTTON.BASE}
      >
        {CUSTOM_COMBO_FORM_COPY.REMOVE_ITEM}
      </Button>
    ) : null}
    {selection?.kind ===
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT &&
    category.isGuideOnly &&
    category.isInterchangeable === false ? (
      <CustomComboUnitExtras
        extraIds={
          extraUnitId === selection.unitId ? extraIds : []
        }
        onToggle={onExtraToggle}
        unitId={selection.unitId}
      />
    ) : null}
  </div>
);

const UnavailableTariffControl = ({
  category,
  onRemove,
  selection,
}: CustomComboEquipmentCardProps): React.JSX.Element => {
  const missingTariffMessage = category.isGuideOnly
    ? CUSTOM_COMBO_FORM_COPY.MISSING_TOUR_TARIFF
    : CUSTOM_COMBO_FORM_COPY.MISSING_RENTAL_TARIFF;

  return (
    <div className={CUSTOM_COMBO_CATEGORY_ACTIONS_CLASS}>
      <Text
        className={CUSTOM_COMBO_TARIFF_UNAVAILABLE_CLASS}
        role={ARIA_ROLE.STATUS}
      >
        {missingTariffMessage}
      </Text>
      {selection ? (
        <Button
          className={CUSTOM_COMBO_REMOVE_BUTTON_CLASS}
          onClick={onRemove}
          type="button"
          variant={BUTTON.BASE}
        >
          {CUSTOM_COMBO_FORM_COPY.REMOVE_ITEM}
        </Button>
      ) : null}
    </div>
  );
};

const CustomComboEquipmentCard = (
  props: CustomComboEquipmentCardProps
): React.JSX.Element => (
  <article className={CUSTOM_COMBO_CATEGORY_CARD_CLASS}>
    <CustomComboEquipmentCardHeader
      category={props.category}
    />
    {props.category.hasIndividualTariff === false ? (
      <UnavailableTariffControl {...props} />
    ) : (
      <div className={CUSTOM_COMBO_CATEGORY_ACTIONS_CLASS}>
        {props.category.isInterchangeable ? (
          <InterchangeableEquipmentControl {...props} />
        ) : (
          <ConcreteUnitEquipmentControl {...props} />
        )}
      </div>
    )}
  </article>
);

export default CustomComboEquipmentCard;
