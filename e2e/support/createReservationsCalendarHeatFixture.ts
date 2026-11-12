import type { Database } from "@/app/types";
import { getCalendarToday } from "@/app/components/calendar/utils/getCalendarToday";
import {
  E2E_RESERVATIONS_CALENDAR_ERRORS,
  E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE,
} from "../constants/E2eReservationsCalendar.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import type { ReservationsCalendarHeatFixture } from "./models/ReservationsCalendarHeatFixture.interface";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

type ReservationInsert =
  Database["public"]["Tables"]["reservations"]["Insert"];

const createReservationRows = (
  workerId: string,
  dates: ReservationsCalendarHeatFixture["dates"]
): ReservationInsert[] =>
  dates.flatMap(({ customerNames, date }) =>
    customerNames.map((customerName) => ({
      created_by: workerId,
      customer_name: customerName,
      duration_minutes:
        E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.DURATION_MINUTES,
      people_count:
        E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.PEOPLE_COUNT,
      starts_at: new Date(
        Date.UTC(
          date.year,
          date.month - 1,
          date.day,
          E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.START_HOUR_UTC
        )
      ).toISOString(),
      type: E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.TYPE,
      updated_by: workerId,
    }))
  );

const removeFixtureReservations = async (
  client: ReturnType<typeof createServiceRoleClient>,
  reservationIds: string[]
): Promise<void> => {
  const { error } = await client
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .in("id", reservationIds);
  if (error) {
    failE2eOperation(
      E2E_RESERVATIONS_CALENDAR_ERRORS.REMOVE_OPERATION,
      error.message
    );
  }
};

const getProjectDayOffset = (
  projectName: string
): number => {
  const projectOffset = Object.entries(
    E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.DAY_OFFSETS_BY_PROJECT
  ).find(([name]) => name === projectName)?.[1];
  if (projectOffset === undefined) {
    throw new Error(
      E2E_RESERVATIONS_CALENDAR_ERRORS.UNKNOWN_PROJECT(
        projectName
      )
    );
  }
  return projectOffset;
};

export const createReservationsCalendarHeatFixture = async (
  workerId: string,
  username: string,
  projectName: string
): Promise<ReservationsCalendarHeatFixture> => {
  const client = createServiceRoleClient();
  const today = getCalendarToday(new Date());
  const dayOffset = getProjectDayOffset(projectName);
  const dates =
    E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.DAYS.map(
      ({ count, day, heatLevel }) => ({
        count,
        customerNames: Array.from(
          { length: count },
          (_, index) =>
            `${E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE.CUSTOMER_PREFIX}-${username}-${day + dayOffset}-${index}`
        ),
        date: { ...today, day: day + dayOffset },
        heatLevel,
      })
    );
  const reservations = createReservationRows(
    workerId,
    dates
  );
  const { data, error } = await client
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert(reservations)
    .select("id");
  if (error) {
    return failE2eOperation(
      E2E_RESERVATIONS_CALENDAR_ERRORS.CREATE_OPERATION,
      error.message
    );
  }
  const reservationIds = data.map(({ id }) => id);
  return {
    dates,
    remove: () =>
      removeFixtureReservations(client, reservationIds),
  };
};
