import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { test as base } from "./activeWorkerTest";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { E2eIncomeMovements } from "./models/E2eIncomeMovements.interface";
import { readWorkerIdByUsername } from "./readWorkerIdByUsername";
import { removeIncomeMovements } from "./removeIncomeMovements";
import { seedIncomeMovements } from "./seedIncomeMovements";

export const test = base.extend<{
  incomeMovements: E2eIncomeMovements;
}>({
  incomeMovements: [
    async ({ context }, provide) => {
      const supabase = createServiceRoleClient();
      const movements = await seedIncomeMovements(
        supabase,
        await readWorkerIdByUsername(
          E2E_LOGIN_ACCOUNT.USERNAME
        )
      );

      try {
        await provide(movements);
      } finally {
        await removeIncomeMovements(supabase, movements);
        await context.clearCookies();
      }
    },
    { auto: true },
  ],
});

export { expect } from "./activeWorkerTest";
