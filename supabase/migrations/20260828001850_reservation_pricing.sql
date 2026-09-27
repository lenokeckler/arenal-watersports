create table reservation_pricing (
  reservation_id    uuid primary key references reservations(id) on delete cascade,
  list_amount_usd   numeric(12,2),
  list_amount_crc   numeric(14,2),
  agreed_amount_usd numeric(12,2),
  agreed_amount_crc numeric(14,2),
  created_by        uuid references workers(id),
  updated_by        uuid references workers(id),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger reservation_pricing_stamp_audit
  before insert or update on reservation_pricing
  for each row execute function stamp_audit_fields();

insert into reservation_pricing
  (reservation_id, list_amount_usd, list_amount_crc,
   agreed_amount_usd, agreed_amount_crc, created_by, updated_by)
select id, list_amount_usd, list_amount_crc,
       agreed_amount_usd, agreed_amount_crc, created_by, updated_by
from reservations
where list_amount_usd is not null or list_amount_crc is not null
   or agreed_amount_usd is not null or agreed_amount_crc is not null;

create function reservation_pricing_reject_split_child()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from reservations r
    where r.id = new.reservation_id
      and r.parent_reservation_id is not null
  ) then
    raise exception
      'una salida nacida de una division no lleva cobro propio: se cobra por reserva y no por persona, asi que el cobro se queda completo en la reserva original';
  end if;
  return new;
end;
$$;

create trigger reservation_pricing_no_split_child
  before insert or update on reservation_pricing
  for each row execute function reservation_pricing_reject_split_child();

alter table reservations drop constraint reservations_split_child_no_charge;
alter table reservations
  drop column list_amount_usd,
  drop column list_amount_crc,
  drop column agreed_amount_usd,
  drop column agreed_amount_crc;

alter table reservation_pricing enable row level security;

create policy reservation_pricing_select on reservation_pricing
  for select to authenticated
  using (has_area('reservas') or is_admin());
create policy reservation_pricing_insert on reservation_pricing
  for insert to authenticated
  with check (has_area('reservas') or is_admin());
create policy reservation_pricing_update on reservation_pricing
  for update to authenticated
  using (has_area('reservas') or is_admin())
  with check (has_area('reservas') or is_admin());

grant select, insert, update on reservation_pricing to authenticated;
