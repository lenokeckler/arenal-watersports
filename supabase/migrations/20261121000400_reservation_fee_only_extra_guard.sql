create or replace function validate_reservation_guide_only_equipment()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
declare
  committed_category_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then return new; end if;
  if new.extra_id is not null and new.category_id is null and new.unit_id is null then return new; end if;
  committed_category_id := private.get_committed_reservation_category(new.category_id, new.unit_id);
  if private.is_guide_only_equipment_allowed(new.reservation_id, committed_category_id) then return new; end if;
  raise exception 'Guide-only equipment requires a tour reservation';
end;
$$;

revoke all on function validate_reservation_guide_only_equipment() from public, anon;
