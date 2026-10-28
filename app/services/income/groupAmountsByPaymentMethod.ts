import { PAYMENT_METHOD_TEXT_LOCALE } from "@/app/constants";
import { fromMinorUnits } from "@/app/utils/money/fromMinorUnits";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import { comparePaymentMethodIncome } from "./comparePaymentMethodIncome";
import type { ChargeMovement } from "./models/ChargeMovement.interface";
import type { PaymentMethodIncome } from "./models/PaymentMethodIncome.interface";
import type { PaymentMethodTally } from "./models/PaymentMethodTally.interface";

const tallyCharge = (
  tallies: Map<string, PaymentMethodTally>,
  { amount, paymentMethod }: ChargeMovement
): Map<string, PaymentMethodTally> => {
  const name = paymentMethod.trim();
  const key = name.toLocaleLowerCase(
    PAYMENT_METHOD_TEXT_LOCALE
  );
  const tally = tallies.get(key) ?? {
    key,
    name,
    minorUnits: 0,
  };
  return tallies.set(key, {
    ...tally,
    minorUnits: tally.minorUnits + toMinorUnits(amount),
  });
};

const toPaymentMethodIncome = ({
  key,
  name,
  minorUnits,
}: PaymentMethodTally): PaymentMethodIncome => ({
  key,
  name,
  amount: fromMinorUnits(minorUnits),
});

export const groupAmountsByPaymentMethod = (
  charges: readonly ChargeMovement[]
): PaymentMethodIncome[] =>
  [
    ...charges
      .reduce(
        tallyCharge,
        new Map<string, PaymentMethodTally>()
      )
      .values(),
  ]
    .map(toPaymentMethodIncome)
    .sort(comparePaymentMethodIncome);
