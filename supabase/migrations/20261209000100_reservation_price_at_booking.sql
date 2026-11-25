create function private.snapshot_reservation_list_price(p_reservation_id uuid)
returns void
language plpgsql security invoker set search_path = public, private
as $$
begin
  insert into reservation_pricing (
    reservation_id, list_amount_usd, list_amount_crc, created_by, updated_by
  )
  select p_reservation_id, catalog.catalog_usd, catalog.catalog_crc,
    auth.uid(), auth.uid()
  from private.reservation_catalog_amounts(p_reservation_id) as catalog
  where catalog.catalog_usd is not null or catalog.catalog_crc is not null
  on conflict (reservation_id) do nothing;
end;
$$;

create or replace function private.persist_rental_reservation(
  p_payload jsonb
) returns uuid
language plpgsql security invoker set search_path = public, private
as $$
declare
  validated_payload jsonb;
  reservation_input record;
  created_reservation_id uuid;
begin
  validated_payload := private.validate_rental_reservation_payload(p_payload);
  select * into reservation_input from jsonb_to_record(validated_payload) as payload(
    customer_name text, people_count integer, duration_minutes integer,
    unit_id uuid, category_id uuid, quantity integer,
    validated_category_id uuid,
    validated_worker_id uuid, validated_starts_at timestamptz,
    validated_reservation_type reservation_type, validated_guide_ids jsonb,
    validated_extra_ids jsonb
  );
  insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(reservation_input.customer_name), reservation_input.people_count,
    reservation_input.validated_reservation_type, reservation_input.validated_starts_at,
    reservation_input.duration_minutes, 'scheduled', reservation_input.validated_worker_id,
    reservation_input.validated_worker_id)
  returning id into created_reservation_id;
  insert into reservation_items (reservation_id, unit_id, category_id, quantity, created_by, updated_by)
  values (created_reservation_id, reservation_input.unit_id, reservation_input.category_id,
    reservation_input.quantity, reservation_input.validated_worker_id, reservation_input.validated_worker_id);
  perform private.persist_reservation_extras(created_reservation_id,
    private.parse_reservation_extra_ids(jsonb_build_object('extra_ids', reservation_input.validated_extra_ids)));
  perform private.snapshot_reservation_list_price(created_reservation_id);
  insert into reservation_guides (reservation_id, worker_id, assigned_by)
  select created_reservation_id, guide_id::uuid, reservation_input.validated_worker_id
  from jsonb_array_elements_text(reservation_input.validated_guide_ids) as selected(guide_id);
  return created_reservation_id;
end;
$$;

revoke all on function private.snapshot_reservation_list_price(uuid) from public, anon;
grant execute on function private.snapshot_reservation_list_price(uuid) to authenticated;
