import {
  buildPasswordResetPinMail,
  createSmtpMailTransport,
  type MailTransport,
} from "@/app/services/mail";
import { markPasswordResetPinUndeliveredQuietly } from "./markPasswordResetPinUndeliveredQuietly";
import type { IssuedPasswordResetPin } from "./models/IssuedPasswordResetPin.interface";

export const deliverPasswordResetPin = async (
  issued: IssuedPasswordResetPin,
  pin: string,
  transport?: MailTransport
): Promise<void> => {
  try {
    const send = transport ?? createSmtpMailTransport();

    await send(
      buildPasswordResetPinMail({
        lifetimeMinutes: issued.lifetimeMinutes,
        personalEmail: issued.personalEmail,
        pin,
      })
    );
  } catch {
    await markPasswordResetPinUndeliveredQuietly(
      issued.pinId
    );
  }
};
