export interface IssuedPasswordResetPin {
  pinId: string;
  personalEmail: string;
  lifetimeMinutes: number;
}
