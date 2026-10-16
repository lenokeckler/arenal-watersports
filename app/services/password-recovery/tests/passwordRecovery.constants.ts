import { PostgrestError } from "@supabase/supabase-js";
import { PASSWORD_RESET_PIN } from "@/app/constants";
import type { IssuedPasswordResetPin } from "../models/IssuedPasswordResetPin.interface";

export const NETWORK_KEY_VALUE = "a".repeat(64);
export const UNNORMALIZED_USERNAME = "  Worker.One ";
export const NORMALIZED_USERNAME = "worker.one";
export const REQUEST_PIN = "482913";
export const SMALL_RANDOM_VALUE = 42;
export const SMALL_RANDOM_PIN = "000042";
export const PIN_BOUND =
  PASSWORD_RESET_PIN.RADIX ** PASSWORD_RESET_PIN.LENGTH;
export const GENERATION_SAMPLE_SIZE = 200;
export const PIN_SHAPE = new RegExp(
  `^[0-9]{${PASSWORD_RESET_PIN.LENGTH}}$`
);

export const ISSUED_PIN: IssuedPasswordResetPin = {
  lifetimeMinutes: 10,
  personalEmail: "worker.one@example.com",
  pinId: "00000000-0000-0000-0000-0000000000a1",
};

export const ISSUED_ROW = {
  lifetime_minutes: ISSUED_PIN.lifetimeMinutes,
  personal_email: ISSUED_PIN.personalEmail,
  pin_id: ISSUED_PIN.pinId,
};

export const RPC_FAILURE = new PostgrestError({
  code: "XX000",
  details: "",
  hint: "",
  message: "rpc failed",
});

export const TRANSPORT_FAILURE_MESSAGE = "smtp down";
export const MARK_FAILURE_MESSAGE = "mark failed";
export const MISSING_MAIL_ENVIRONMENT_MESSAGE =
  "mail environment missing";
export const INVALID_USERNAME = "";
