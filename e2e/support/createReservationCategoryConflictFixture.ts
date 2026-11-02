import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { E2E_RESERVATION_CATEGORY_CONFLICT } from "../constants/E2eReservationForm.constants";

type E2EProjectName =
  keyof typeof E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_CUSTOMER_SUFFIXES;

const isE2EProjectName = (
  projectName: string
): projectName is E2EProjectName =>
  Object.hasOwn(
    E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_CUSTOMER_SUFFIXES,
    projectName
  );

const createLocalSupabaseClient = () => {
  const supabaseUrl = new URL(SUPABASE.URL);
  if (
    supabaseUrl.hostname !== "localhost" &&
    supabaseUrl.hostname !== "127.0.0.1"
  ) {
    throw new Error(
      "Reservation conflict E2E fixtures require local Supabase."
    );
  }

  return createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

const getFixtureCustomerNames = (
  projectName: string
): { first: string; second: string } => {
  const suffixes =
    E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_CUSTOMER_SUFFIXES;
  if (!isE2EProjectName(projectName)) {
    throw new Error(
      "Unknown Playwright project for reservation conflict fixture."
    );
  }
  const suffix = suffixes[projectName];

  return {
    first: `${E2E_RESERVATION_CATEGORY_CONFLICT.FIRST_CUSTOMER_NAME} · ${suffix}`,
    second: `${E2E_RESERVATION_CATEGORY_CONFLICT.SECOND_CUSTOMER_NAME} · ${suffix}`,
  };
};

export const createReservationCategoryConflictFixture =
  () => {
    const supabase = createLocalSupabaseClient();
    const fixtureId = randomUUID();
    let isAuthenticated = false;

    const getRunCustomerNames = (
      projectName: string
    ): { first: string; second: string } => {
      const customerNames =
        getFixtureCustomerNames(projectName);
      const fixtureSuffix = `E2E US-RES-16 ${fixtureId.slice(0, 12)} ·`;
      return {
        first: `${fixtureSuffix} ${customerNames.first}`,
        second: `${fixtureSuffix} ${customerNames.second}`,
      };
    };

    const cancelFixtureReservations = async (
      projectName: string
    ): Promise<void> => {
      const customerNames =
        getRunCustomerNames(projectName);
      const { data, error } = await supabase
        .from("reservations")
        .select("id")
        .in("customer_name", [
          customerNames.first,
          customerNames.second,
        ])
        .eq("status", "scheduled");
      if (error) {
        throw error;
      }
      if (data.length === 0) {
        return;
      }

      const { error: updateError } = await supabase
        .from("reservations")
        .update({
          cancellation_reason:
            E2E_RESERVATION_CATEGORY_CONFLICT.CANCEL_REASON,
          status: "cancelled",
        })
        .in(
          "id",
          data.map((reservation) => reservation.id)
        );
      if (updateError) {
        throw updateError;
      }
    };

    return {
      cleanup: async (
        projectName: string
      ): Promise<void> => {
        let cleanupError: unknown;
        if (isAuthenticated) {
          try {
            await cancelFixtureReservations(projectName);
          } catch (error) {
            cleanupError = error;
          }
        }
        const { error: signOutError } =
          await supabase.auth.signOut({ scope: "local" });
        isAuthenticated = false;
        if (cleanupError) {
          throw cleanupError;
        }
        if (signOutError) {
          throw signOutError;
        }
      },
      prepare: async (
        projectName: string
      ): Promise<void> => {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: E2E_LOGIN_ACCOUNT.EMAIL,
            password: E2E_LOGIN_ACCOUNT.PASSWORD,
          });
        if (error) {
          throw error;
        }
        isAuthenticated = true;
        await cancelFixtureReservations(projectName);
      },
      getCustomerNames: getRunCustomerNames,
    };
  };
