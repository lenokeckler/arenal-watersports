import addressparser from "nodemailer/lib/addressparser";
import { describe, expect, it } from "vitest";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { isPlainMailAddress } from "../isPlainMailAddress";
import {
  DISGUISED_RECIPIENTS,
  LEGITIMATE_DOMAIN_SUFFIXES,
} from "./nodemailerAddress.constants";

const listDeliveries = (value: string): string[] =>
  addressparser(value)
    .flatMap((entry) =>
      "group" in entry ? (entry.group ?? []) : [entry]
    )
    .map((entry) =>
      safeString("address" in entry ? entry.address : null)
    )
    .filter(Boolean);

describe("nodemailer address parsing", () => {
  it.each(DISGUISED_RECIPIENTS)(
    "never delivers %j to the domain hidden inside it",
    (value) => {
      const deliveries = listDeliveries(value);

      expect(deliveries.length).toBeGreaterThan(0);
      deliveries.forEach((address) => {
        expect(
          LEGITIMATE_DOMAIN_SUFFIXES.some((suffix) =>
            address.endsWith(suffix)
          )
        ).toBe(true);
      });
    }
  );

  it.each(DISGUISED_RECIPIENTS)(
    "is never handed %j by the application",
    (value) => {
      expect(isPlainMailAddress(value)).toBe(false);
    }
  );
});
