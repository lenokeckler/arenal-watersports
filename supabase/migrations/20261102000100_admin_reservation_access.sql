create or replace function require_reservations_access()
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authenticated worker is required';
  end if;

  if not has_area('reservas') and not is_admin() then
    raise exception 'Reservations access is required';
  end if;
end;
$$;

drop policy if exists reservations_insert on reservations;
create policy reservations_insert on reservations
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

drop policy if exists items_insert on reservation_items;
create policy items_insert on reservation_items
  for insert to authenticated
  with check (
    has_area('reservas') or has_area('operaciones') or is_admin()
  );
