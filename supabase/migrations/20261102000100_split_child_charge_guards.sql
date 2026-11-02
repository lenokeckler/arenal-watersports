create function reservation_charge_reject_split_child_tariff()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from reservations r
    where r.id = new.reservation_id
      and r.parent_reservation_id is not null
  ) then
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
  if exists (
    select 1 from reservations r
    where r.id = new.reservation_id
      and r.parent_reservation_id is not null
  ) then
    raise exception
      'el deposito de garantia se queda en la reserva original, no en una salida nacida de una division';
  end if;
  return new;
end;
$$;

create trigger deposits_no_split_child
  before insert or update of reservation_id on deposits
  for each row execute function deposit_reject_split_child();
