import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_PHOTOS_BUCKET,
  UNIT_PHOTOS_ERROR,
  UNIT_PHOTOS_SIGNED_URL_SECONDS,
} from "../constants/UnitPhotos.constants";
import type { UnitPhotosData } from "../models/UnitPhotosData.interface";
import { canManageUnitPhotos } from "./canManageUnitPhotos";
import { buildPhotoSlots } from "../utils/buildPhotoSlots";
import type { NullableRef } from "@/app/types";

export const getUnitPhotos = async (
  unitId: string
): Promise<NullableRef<UnitPhotosData>> => {
  const supabase = await getOperationsSupabaseClient();
  const { data: unit, error: unitError } = await supabase
    .from("equipment_units")
    .select(
      "id, code, impact_count, category:equipment_categories!inner(name, has_condition_photos)"
    )
    .eq("id", unitId)
    .eq("category.has_condition_photos", true)
    .neq("status", "decommissioned")
    .maybeSingle();
  throwIfSupabaseError(
    unitError,
    UNIT_PHOTOS_ERROR.LOAD_UNIT
  );

  if (!unit) {
    return null;
  }

  const { data: rows, error: photosError } = await supabase
    .from("unit_condition_photos")
    .select("angle, storage_path")
    .eq("unit_id", unitId);
  throwIfSupabaseError(
    photosError,
    UNIT_PHOTOS_ERROR.LOAD_PHOTOS
  );

  const photoRows = rows ?? [];
  const urlByPath = new Map<string, string>();

  if (photoRows.length > 0) {
    const { data: signed, error: signError } =
      await supabase.storage
        .from(UNIT_PHOTOS_BUCKET)
        .createSignedUrls(
          photoRows.map((row) => row.storage_path),
          UNIT_PHOTOS_SIGNED_URL_SECONDS
        );
    if (signError) {
      throw new Error(UNIT_PHOTOS_ERROR.SIGN_PHOTOS);
    }

    (signed ?? []).forEach((item) => {
      if (item.path && item.signedUrl) {
        urlByPath.set(item.path, item.signedUrl);
      }
    });
  }

  return {
    canManage: await canManageUnitPhotos(supabase),
    slots: buildPhotoSlots(photoRows, urlByPath),
    unit: {
      categoryName: unit.category?.name ?? "",
      code: unit.code,
      id: unit.id,
      impactCount: unit.impact_count,
    },
  };
};
