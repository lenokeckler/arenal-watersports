import { CURRENCY_CODE } from "@/app/constants";
import type { ChargeMovement } from "../models/ChargeMovement.interface";
import type { CurrencyIncome } from "../models/CurrencyIncome.interface";
import type { PaymentMethodIncome } from "../models/PaymentMethodIncome.interface";

const usd = (
  amount: number,
  paymentMethod: string
): ChargeMovement => ({
  amount,
  currency: CURRENCY_CODE.USD,
  paymentMethod,
});

const crc = (
  amount: number,
  paymentMethod: string
): ChargeMovement => ({
  amount,
  currency: CURRENCY_CODE.CRC,
  paymentMethod,
});

export const SAME_METHOD_DIFFERENT_SPELLING = [
  usd(10, "efectivo"),
  usd(15.5, "  Efectivo "),
  usd(4.5, "EFECTIVO"),
];
export const EXPECTED_MERGED_METHOD: PaymentMethodIncome[] =
  [{ key: "efectivo", name: "efectivo", amount: 30 }];

export const DRIFTING_CENTS = [
  usd(0.1, "Tarjeta"),
  usd(0.2, "Tarjeta"),
];
export const EXPECTED_EXACT_CENTS: PaymentMethodIncome[] = [
  { key: "tarjeta", name: "Tarjeta", amount: 0.3 },
];

export const BLANK_METHODS = [usd(20, ""), usd(5, "   ")];
export const EXPECTED_BLANK_METHOD: PaymentMethodIncome[] =
  [{ key: "", name: "", amount: 25 }];

export const UNSORTED_METHODS = [
  usd(10, "Tarjeta"),
  usd(40, "SINPE Móvil"),
  usd(10, "Efectivo"),
];
export const EXPECTED_SORTED_METHODS: PaymentMethodIncome[] =
  [
    { key: "sinpe móvil", name: "SINPE Móvil", amount: 40 },
    { key: "efectivo", name: "Efectivo", amount: 10 },
    { key: "tarjeta", name: "Tarjeta", amount: 10 },
  ];

export const MIXED_CURRENCIES = [
  crc(25000.75, "SINPE Móvil"),
  usd(85.5, "Tarjeta"),
  crc(5000, "Efectivo"),
  usd(14.5, "Tarjeta"),
];
export const EXPECTED_MIXED_SUMMARY: CurrencyIncome[] = [
  {
    currency: CURRENCY_CODE.USD,
    total: 100,
    byPaymentMethod: [
      { key: "tarjeta", name: "Tarjeta", amount: 100 },
    ],
  },
  {
    currency: CURRENCY_CODE.CRC,
    total: 30000.75,
    byPaymentMethod: [
      {
        key: "sinpe móvil",
        name: "SINPE Móvil",
        amount: 25000.75,
      },
      { key: "efectivo", name: "Efectivo", amount: 5000 },
    ],
  },
];

export const ONLY_COLONES = [crc(5000, "Efectivo")];
export const EXPECTED_ONLY_COLONES_SUMMARY: CurrencyIncome[] =
  [
    {
      currency: CURRENCY_CODE.USD,
      total: 0,
      byPaymentMethod: [],
    },
    {
      currency: CURRENCY_CODE.CRC,
      total: 5000,
      byPaymentMethod: [
        { key: "efectivo", name: "Efectivo", amount: 5000 },
      ],
    },
  ];

export const EXPECTED_EMPTY_SUMMARY: CurrencyIncome[] = [
  {
    currency: CURRENCY_CODE.USD,
    total: 0,
    byPaymentMethod: [],
  },
  {
    currency: CURRENCY_CODE.CRC,
    total: 0,
    byPaymentMethod: [],
  },
];

export const ACCENT_DISTINCT_METHODS = [
  usd(10, "Débito"),
  usd(10, "Debito"),
];
export const EXPECTED_ACCENT_DISTINCT_KEYS = [
  "debito",
  "débito",
];

export const UPPER_AND_MIXED_CASE_ACCENTED_METHODS = [
  usd(10, "SINPE MÓVIL"),
  usd(5, "Sinpe Móvil"),
];
export const EXPECTED_ACCENTED_CASE_MERGE: PaymentMethodIncome[] =
  [{ key: "sinpe móvil", name: "SINPE MÓVIL", amount: 15 }];

export const NORMALIZATION_FORMS_OF_ONE_METHOD = [
  usd(10, "Débito".normalize("NFC")),
  usd(5, "Débito".normalize("NFD")),
];
export const EXPECTED_NORMALIZED_MERGE_COUNT = 1;

export const INNER_SPACES_OF_ONE_METHOD = [
  usd(10, "Sinpe Móvil"),
  usd(5, "Sinpe  \t Móvil"),
];
export const EXPECTED_INNER_SPACES_MERGE: PaymentMethodIncome[] =
  [{ key: "sinpe móvil", name: "Sinpe Móvil", amount: 15 }];

export const MAXIMUM_COLONES_CHARGE_PLUS_ONE_CENT = [
  crc(999_999_999_999.99, "Efectivo"),
  crc(0.01, "Efectivo"),
];
export const EXPECTED_MAXIMUM_COLONES_TOTAL = 1_000_000_000_000;

export const THOUSAND_ONE_CENT_CHARGES = Array.from(
  { length: 1000 },
  () => usd(0.01, "Efectivo")
);
export const EXPECTED_THOUSAND_CENTS_TOTAL = 10;

export const TIED_ACCENTED_NAMES = [
  usd(10, "Zelle"),
  usd(10, "Ñandú"),
  usd(10, "Oro"),
  usd(10, "Nube"),
];
export const EXPECTED_TIED_ACCENTED_ORDER = [
  "Nube",
  "Ñandú",
  "Oro",
  "Zelle",
];
