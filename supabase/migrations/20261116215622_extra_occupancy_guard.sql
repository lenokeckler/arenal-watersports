create or replace function guard_extra_occupancy_change()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if (old.occupies_category_id, old.occupies_quantity)
    is not distinct from (new.occupies_category_id, new.occupies_quantity) then
    return new;
  end if;
  if exists (
    select 1 from public.reservation_items as item where item.extra_id = old.id
  ) then
    raise exception 'Este extra ya se usa en reservas, por lo que no se puede cambiar el equipo que ocupa. Desactive el extra y cree uno nuevo.'
      using errcode = '55006';
  end if;
  return new;
end;
$$;

revoke all on function guard_extra_occupancy_change() from public, anon, authenticated;

create trigger extras_guard_occupancy_change
before update of occupies_category_id, occupies_quantity
on public.extras for each row
execute function guard_extra_occupancy_change();
