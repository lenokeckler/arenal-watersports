import { STRING } from "@/app/constants";
import type { PaymentMethodIncome } from "@/app/services/income";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";

export const resolvePaymentMethodName = ({
  name,
}: PaymentMethodIncome): string =>
  name === STRING.Empty
    ? DAILY_INCOME_COPY.NO_PAYMENT_METHOD
    : name;
