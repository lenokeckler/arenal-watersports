import Button from "@/app/components/button/Button";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import FieldFactory from "@/app/components/field-factory/FieldFactory";
import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  BUTTON,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import { STOCK_COUNT_SYMBOL } from "../constants/StockCountSymbol.constants";
import { STOCK_QUANTITY_STEP } from "../constants/StockQuantityField.constants";
import type { StockQuantityBlockProps } from "../models/StockQuantityBlockProps.interface";
import {
  STOCK_QUANTITY_BLOCK_CLASS,
  STOCK_QUANTITY_CHANGE_CLASS,
  STOCK_QUANTITY_ERROR_CLASS,
  STOCK_QUANTITY_HEADING_CLASS,
  STOCK_QUANTITY_LABEL_CLASS,
  STOCK_QUANTITY_STEP_BUTTON_CLASS,
  STOCK_QUANTITY_STEPPER_CLASS,
  resolveStockQuantityInputClassName,
} from "../styles/StockQuantityBlock.styles";

const StockQuantityBlock = ({
  changeText,
  disabled,
  error,
  field,
  id,
  label,
  onChange,
  onQuantityStep,
  value,
}: StockQuantityBlockProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={label}
    className={STOCK_QUANTITY_BLOCK_CLASS[field]}
  >
    <div className={STOCK_QUANTITY_HEADING_CLASS}>
      <Label
        htmlFor={id}
        bold
        className={STOCK_QUANTITY_LABEL_CLASS}
      >
        {label}
      </Label>
      <InlineText
        className={STOCK_QUANTITY_CHANGE_CLASS[field]}
      >
        {changeText}
      </InlineText>
    </div>
    <div className={STOCK_QUANTITY_STEPPER_CLASS}>
      <Button
        type="button"
        variant={BUTTON.BASE}
        disabled={disabled}
        aria-label={[
          STOCK_COUNT_COPY.DECREASE_PREFIX,
          label,
        ].join(STRING.SPACE)}
        className={STOCK_QUANTITY_STEP_BUTTON_CLASS}
        onClick={() =>
          onQuantityStep(
            field,
            STOCK_QUANTITY_STEP.DECREASE
          )
        }
      >
        {STOCK_COUNT_SYMBOL.MINUS}
      </Button>
      <FieldFactory
        id={id}
        name={id}
        value={value}
        type={INPUT_TYPES.TEXT}
        baseClassName={resolveStockQuantityInputClassName(
          Boolean(error)
        )}
        handleChange={onChange}
        disabled={disabled}
        hasError={Boolean(error)}
        hasErrorText={Boolean(error)}
        describedBy={STOCK_COUNT_FIELD_ID.HINT}
        autoComplete={AUTOCOMPLETE.OFF}
        inputMode={INPUT_MODE.NUMERIC}
        spellCheck={false}
      />
      <Button
        type="button"
        variant={BUTTON.BASE}
        disabled={disabled}
        aria-label={[
          STOCK_COUNT_COPY.INCREASE_PREFIX,
          label,
        ].join(STRING.SPACE)}
        className={STOCK_QUANTITY_STEP_BUTTON_CLASS}
        onClick={() =>
          onQuantityStep(
            field,
            STOCK_QUANTITY_STEP.INCREASE
          )
        }
      >
        {STOCK_COUNT_SYMBOL.PLUS}
      </Button>
    </div>
    {error && (
      <Text
        id={`${id}${FIELD_ERROR_ID_SUFFIX}`}
        className={STOCK_QUANTITY_ERROR_CLASS}
      >
        {error}
      </Text>
    )}
  </div>
);

export default StockQuantityBlock;
