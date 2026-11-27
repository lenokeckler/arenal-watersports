export const PHOTO_UNIT_QUERY = {
  COLUMNS:
    "id, code, impact_count, category:equipment_categories!inner(id, name, image_path, has_condition_photos), photos:unit_condition_photos(angle)",
  LOAD: "load the machines that keep condition photos",
} as const;
