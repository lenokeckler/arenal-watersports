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

create or replace function guard_dispatch_assignment_unit_available()
returns trigger
language plpgsql
as $$
begin
  if new.unit_id is not null
     and new.dispatch_id is not null
     and (tg_op = 'INSERT' or new.dispatch_id is distinct from old.dispatch_id) then
    perform 1
    from equipment_units
    where id = new.unit_id
      and status = 'available'
    for share;
    if not found then
      raise exception 'La unidad no esta disponible para despacharse';
    end if;
  end if;
  return new;
end;
$$;

create trigger reservation_items_guard_dispatch_unit_available
  before insert or update of dispatch_id on reservation_items
  for each row
  execute function guard_dispatch_assignment_unit_available();
