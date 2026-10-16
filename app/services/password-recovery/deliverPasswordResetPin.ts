import {
  buildPasswordResetPinMail,
  createSmtpMailTransport,
  type MailTransport,
} from "@/app/services/mail";
import { markPasswordResetPinUndelivered } from "./markPasswordResetPinUndelivered";
import type { IssuedPasswordResetPin } from "./models/IssuedPasswordResetPin.interface";

const markUndeliveredQuietly = async (
  pinId: string
): Promise<void> => {
  await markPasswordResetPinUndelivered(pinId).catch(
    () => undefined
  );
};

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
    await markUndeliveredQuietly(issued.pinId);
  }
};
