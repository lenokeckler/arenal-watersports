import { CURRENCY_CODE } from "@/app/constants";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { DepositEmptyNoticeProps } from "../models/DepositEmptyNoticeProps.interface";
import type { DepositErrorNoticeProps } from "../models/DepositErrorNoticeProps.interface";
import type { DepositSummaryProps } from "../models/DepositSummaryProps.interface";

const LONG_NAME_REPEATS = 12;

export const LONG_CUSTOMER_NAME = "Maria de los Angeles "
  .repeat(LONG_NAME_REPEATS)
  .trim();

export const USD_SUMMARY: DepositSummaryProps = {
  customerName: "Ana Mora",
  code: "RES-0001",
  amount: 50,
  currency: CURRENCY_CODE.USD,
};

export const CRC_SUMMARY: DepositSummaryProps = {
  customerName: "Luis Vargas",
  code: "RES-0002",
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
};

export const EMPTY_NOTICE: DepositEmptyNoticeProps = {
  icon: MATERIAL_ICON_NAME.LOCK_OPEN,
  title: "Sin depositos",
  body: "No hay dinero pendiente.",
};

export const ERROR_NOTICE: DepositErrorNoticeProps = {
  title: "No se pudo cargar",
  body: "Intente de nuevo.",
};

export const USD_AMOUNT_TEXT = "US$ 50.00";
export const CRC_AMOUNT_TEXT = "₡ 25 000";
