import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import {
  E2E_ACCOUNT_BOUNDARY,
  E2E_ACCOUNT_BOUNDARY_ERROR,
  E2E_PROTECTED_CATALOG,
} from "../constants/E2eAccountBoundary.constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { createAnonClient } from "../support/createAnonClient";
import { createServiceRoleClient } from "../support/createServiceRoleClient";

const createProfilelessEmail = (): string =>
  toAuthEmail(
    `${E2E_ACCOUNT_BOUNDARY.USERNAME_PREFIX}${randomUUID()}`
  );

test.describe("Account boundary", () => {
  test("refuses a public sign-up", async () => {
    const { data, error } =
      await createAnonClient().auth.signUp({
        email: createProfilelessEmail(),
        password: E2E_ACCOUNT_BOUNDARY.PASSWORD,
      });

    expect(error?.code).toBe(
      E2E_ACCOUNT_BOUNDARY_ERROR.SIGN_UP_DISABLED
    );
    expect(data.session).toBeNull();
  });

  test("refuses a token to an account without a worker profile", async () => {
    const admin = createServiceRoleClient();
    const email = createProfilelessEmail();
    const { data: created, error: createError } =
      await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        password: E2E_ACCOUNT_BOUNDARY.PASSWORD,
      });

    expect(createError).toBeNull();

    try {
      const { data, error } =
        await createAnonClient().auth.signInWithPassword({
          email,
          password: E2E_ACCOUNT_BOUNDARY.PASSWORD,
        });

      expect(error?.message).toBe(
        E2E_ACCOUNT_BOUNDARY_ERROR.ACCOUNT_UNAVAILABLE
      );
      expect(data.session).toBeNull();
    } finally {
      if (created.user) {
        await admin.auth.admin.deleteUser(created.user.id);
      }
    }
  });

  test("lets a provisioned worker sign in and read the catalog", async () => {
    const supabase = createAnonClient();
    const { data: signedIn, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: toAuthEmail(E2E_LOGIN_ACCOUNT.USERNAME),
        password: E2E_LOGIN_ACCOUNT.PASSWORD,
      });

    expect(signInError).toBeNull();
    expect(signedIn.session).not.toBeNull();

    const { data: categories, error: readError } =
      await supabase
        .from(E2E_PROTECTED_CATALOG.TABLE)
        .select(E2E_PROTECTED_CATALOG.COLUMN)
        .limit(E2E_PROTECTED_CATALOG.ROW_LIMIT);

    expect(readError).toBeNull();
    expect(categories).toHaveLength(
      E2E_PROTECTED_CATALOG.ROW_LIMIT
    );
  });
});
