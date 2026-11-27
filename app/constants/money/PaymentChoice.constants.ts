export const PAYMENT_CHOICE = {
  CASH: "cash",
  CARD: "card",
  PAYPAL: "paypal",
  SINPE: "sinpe",
  OTHER: "other",
} as const;

export type PaymentChoice =
  (typeof PAYMENT_CHOICE)[keyof typeof PAYMENT_CHOICE];

export const PAYMENT_CHOICE_ORDER: readonly PaymentChoice[] =
  [
    PAYMENT_CHOICE.CASH,
    PAYMENT_CHOICE.CARD,
    PAYMENT_CHOICE.PAYPAL,
    PAYMENT_CHOICE.SINPE,
    PAYMENT_CHOICE.OTHER,
  ];

export const FIRST_PAYMENT_CHOICE = PAYMENT_CHOICE.CASH;
