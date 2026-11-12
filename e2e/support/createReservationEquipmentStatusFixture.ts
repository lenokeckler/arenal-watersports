import { createClient } from "@supabase/supabase-js";
import { SUPABASE, SUPABASE_TABLE } from "@/app/constants";
import type { Database, NullableRef } from "@/app/types";
import {
  E2E_RESERVATION_EQUIPMENT_STATUS,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import type { ReservationEquipmentStatus } from "../models/ReservationEquipmentStatus.type";

export const createReservationEquipmentStatusFixture = (
  unitCode: string = E2E_RESERVATION_FORM_COPY.REALTIME_UNIT_OPTION
) => {
  const supabase = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  let equipmentUnitId: NullableRef<string> = null;
  let initialStatus: NullableRef<ReservationEquipmentStatus> =
    null;

  const updateUnitStatus = async (
    status: ReservationEquipmentStatus
  ): Promise<ReservationEquipmentStatus> => {
    if (!equipmentUnitId) {
      throw new Error(
        "Reservation equipment fixture is not prepared."
      );
    }
    const { data, error } = await supabase
      .from(SUPABASE_TABLE.EQUIPMENT_UNITS)
      .update({ status })
      .eq("id", equipmentUnitId)
      .select("status")
      .single();
    if (error) {
      throw error;
    }
    return data.status;
  };

  return {
    markUnitAsDamaged:
      async (): Promise<ReservationEquipmentStatus> =>
        await updateUnitStatus(
          E2E_RESERVATION_EQUIPMENT_STATUS.DAMAGED
        ),
    prepare:
      async (): Promise<ReservationEquipmentStatus> => {
        const { data, error } = await supabase
          .from(SUPABASE_TABLE.EQUIPMENT_UNITS)
          .select("id, status")
          .eq("code", unitCode)
          .single();
        if (error) {
          throw error;
        }

        equipmentUnitId = data.id;
        initialStatus = data.status;
        return initialStatus;
      },
    restore: async (): Promise<void> => {
      let restorationError: unknown;
      if (initialStatus) {
        try {
          await updateUnitStatus(initialStatus);
        } catch (error) {
          restorationError = error;
        }
      }
      if (restorationError) {
        throw restorationError;
      }
    },
  };
};
