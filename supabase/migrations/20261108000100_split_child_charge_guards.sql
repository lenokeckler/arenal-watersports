create function reservation_is_split_child(p_reservation_id uuid)
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from reservations r
    where r.id = p_reservation_id
      and r.parent_reservation_id is not null
  );
$$;

create function reservation_charge_reject_split_child_tariff()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if reservation_is_split_child(new.reservation_id) then
    raise exception
      'una salida nacida de una division solo admite tiempo adicional: el cobro de tarifa se queda en la reserva original';
  end if;
  return new;
end;
$$;

create trigger reservation_charges_no_split_child_tariff
  before insert or update of reservation_id, kind on reservation_charges
  for each row when (new.kind = 'tariff')
  execute function reservation_charge_reject_split_child_tariff();

create function deposit_reject_split_child()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if reservation_is_split_child(new.reservation_id) then
    raise exception
      'el deposito de garantia se queda en la reserva original, no en una salida nacida de una division';
  end if;
  return new;
end;
$$;

create trigger deposits_no_split_child
  before insert or update of reservation_id on deposits
  for each row execute function deposit_reject_split_child();

create function reservations_guard_split_child()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from reservation_charges c
    where c.reservation_id = new.id and c.kind = 'tariff'
  ) or exists (
    select 1 from deposits d
    where d.reservation_id = new.id
  ) then
    raise exception
      'una reserva con cobro de tarifa o deposito no puede pasar a ser una salida nacida de una division';
  end if;
  if exists (select 1 from reservations c where c.parent_reservation_id = new.id) then
    raise exception
      'una reserva con salidas nacidas de una division no puede pasar a ser una salida';
  end if;
  if reservation_is_split_child(new.parent_reservation_id) then
    raise exception
      'una salida nacida de una division debe apuntar a la reserva original';
  end if;
  return new;
end;
$$;

create trigger reservations_split_child_shape
  before insert or update of parent_reservation_id on reservations
  for each row when (new.parent_reservation_id is not null)
  execute function reservations_guard_split_child();

revoke all on function reservation_is_split_child(uuid) from public, anon;
grant execute on function reservation_is_split_child(uuid) to authenticated;
revoke all on function reservation_charge_reject_split_child_tariff() from public, anon;
grant execute on function reservation_charge_reject_split_child_tariff() to authenticated;
revoke all on function deposit_reject_split_child() from public, anon;
grant execute on function deposit_reject_split_child() to authenticated;
revoke all on function reservations_guard_split_child() from public, anon;
grant execute on function reservations_guard_split_child() to authenticated;
