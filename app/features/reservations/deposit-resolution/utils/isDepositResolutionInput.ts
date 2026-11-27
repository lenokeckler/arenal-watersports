import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

export const isDepositResolutionInput = (
  input: unknown
): input is DepositResolutionInput =>
  isObject(input) &&
  "depositId" in input &&
  isString(input.depositId) &&
  UUID_PATTERN.test(input.depositId) &&
  "returnedText" in input &&
  isString(input.returnedText) &&
  "reasonText" in input &&
  isString(input.reasonText);
