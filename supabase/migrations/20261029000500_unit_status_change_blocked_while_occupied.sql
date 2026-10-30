create or replace function guard_unit_status_change_while_occupied()
returns trigger
language plpgsql
as $$
begin
  if new.status is distinct from old.status
     and old.status = 'available'
     and exists (
       select 1
       from reservation_items ri
       join reservation_dispatches rd on rd.id = ri.dispatch_id
       where ri.unit_id = old.id
         and rd.closed_at is null
     ) then
    raise exception 'La unidad esta ocupada en un despacho abierto';
  end if;
  return new;
end;
$$;

create trigger equipment_units_guard_status_change_while_occupied
  before update of status on equipment_units
  for each row
  execute function guard_unit_status_change_while_occupied();
