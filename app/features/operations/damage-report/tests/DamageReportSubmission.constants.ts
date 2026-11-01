import type { User } from "@supabase/supabase-js";
import type { CreateDamageReportInput } from "../models/CreateDamageReportInput.interface";

export const AUTHENTICATED_DAMAGE_REPORT_USER: User = {
  app_metadata: {
    provider: "email",
    providers: ["email"],
  },
  aud: "authenticated",
  created_at: "2026-01-01T00:00:00.000Z",
  email: "worker@arenal.local",
  id: "11111111-1111-4111-8111-111111111111",
  user_metadata: {},
};

export const DEFAULT_DAMAGE_REPORT_SUBMISSION: CreateDamageReportInput =
  {
    unitId: "22222222-2222-4222-8222-222222222222",
    cause: "collision",
    description:
      "La unidad presentó un daño durante la revisión.",
    impactDelta: 3,
  };
