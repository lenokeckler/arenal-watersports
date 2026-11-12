create or replace function private.insert_predefined_combo_reservation_row(
  p_validated_payload jsonb
) returns uuid
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
  created_reservation_id uuid;
begin
  select * into reservation_input from jsonb_to_record(p_validated_payload)
    as payload(combo_id uuid, customer_name text, people_count integer,
      duration_minutes integer, validated_starts_at timestamptz,
      validated_worker_id uuid);
  insert into reservations (
    customer_name, people_count, type, combo_id, starts_at,
    duration_minutes, status, created_by, updated_by
  ) values (
    reservation_input.customer_name, reservation_input.people_count,
    'combo', reservation_input.combo_id,
    reservation_input.validated_starts_at,
    reservation_input.duration_minutes, 'scheduled',
    reservation_input.validated_worker_id,
    reservation_input.validated_worker_id
  ) returning id into created_reservation_id;
  return created_reservation_id;
end;
$$;

create or replace function private.insert_predefined_combo_reservation_details(
  p_reservation_id uuid,
  p_validated_payload jsonb
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
begin
  select * into reservation_input from jsonb_to_record(p_validated_payload)
    as payload(validated_worker_id uuid, validated_items jsonb,
      validated_guide_ids jsonb, validated_package_price_usd numeric,
      validated_package_price_crc numeric);
  insert into reservation_items (
    reservation_id, category_id, quantity, created_by, updated_by
  )
  select p_reservation_id, item.category_id, item.quantity,
    reservation_input.validated_worker_id,
    reservation_input.validated_worker_id
  from jsonb_to_recordset(reservation_input.validated_items)
    as item(category_id uuid, quantity integer)
  order by item.category_id;
  insert into reservation_guides (reservation_id, worker_id, assigned_by)
  select p_reservation_id, guide.worker_id::uuid,
    reservation_input.validated_worker_id
  from jsonb_array_elements_text(reservation_input.validated_guide_ids)
    as guide(worker_id);
  insert into reservation_pricing (
    reservation_id, list_amount_usd, list_amount_crc,
    agreed_amount_usd, agreed_amount_crc, created_by, updated_by
  ) values (
    p_reservation_id, reservation_input.validated_package_price_usd,
    reservation_input.validated_package_price_crc,
    reservation_input.validated_package_price_usd,
    reservation_input.validated_package_price_crc,
    reservation_input.validated_worker_id,
    reservation_input.validated_worker_id
  );
end;
$$;

create or replace function private.persist_predefined_combo_reservation(
  p_payload jsonb
) returns uuid
language plpgsql security invoker set search_path = public, private
as $$
declare
  validated_payload jsonb;
  created_reservation_id uuid;
begin
  validated_payload := private.validate_predefined_combo_reservation(p_payload);
  created_reservation_id := private.insert_predefined_combo_reservation_row(
    validated_payload
  );
  perform private.insert_predefined_combo_reservation_details(
    created_reservation_id,
    validated_payload
  );
  return created_reservation_id;
end;
$$;

create or replace function create_predefined_combo_reservation(
  p_payload jsonb
) returns uuid
language sql security invoker set search_path = public, private
as $$
  select private.persist_predefined_combo_reservation(p_payload);
$$;

revoke all on function private.insert_predefined_combo_reservation_row(jsonb) from public, anon;
grant execute on function private.insert_predefined_combo_reservation_row(jsonb) to authenticated;
revoke all on function private.insert_predefined_combo_reservation_details(uuid, jsonb) from public, anon;
grant execute on function private.insert_predefined_combo_reservation_details(uuid, jsonb) to authenticated;
revoke all on function private.persist_predefined_combo_reservation(jsonb) from public, anon;
grant execute on function private.persist_predefined_combo_reservation(jsonb) to authenticated;
revoke all on function create_predefined_combo_reservation(jsonb) from public, anon;
grant execute on function create_predefined_combo_reservation(jsonb) to authenticated;
