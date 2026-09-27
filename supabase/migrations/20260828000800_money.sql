create table reservation_charges (
  id             uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations (id) on delete restrict,
  kind           charge_kind not null,
  amount         numeric(14,2) not null check (amount > 0),
  currency       currency_code not null,
  payment_method text not null,
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now()
);

create index charges_reservation_idx on reservation_charges (reservation_id);
create index charges_day_idx         on reservation_charges (created_at);

create table refunds (
  id             uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations (id) on delete restrict,
  percentage     numeric(5,2) not null check (percentage > 0 and percentage <= 100),
  amount         numeric(14,2) not null check (amount > 0),
  currency       currency_code not null,
  reason         text not null,
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now()
);

create table deposits (
  id               uuid primary key default gen_random_uuid(),
  reservation_id   uuid not null references reservations (id) on delete restrict,
  amount           numeric(14,2) not null check (amount > 0),
  currency         currency_code not null,
  status           deposit_status not null default 'held',
  retained_amount  numeric(14,2),
  retention_reason text,
  resolved_by      uuid references workers (id),
  resolved_at      timestamptz,
  created_by       uuid not null references workers (id),
  created_at       timestamptz not null default now(),

  constraint deposits_resolution_shape
    check (
      (status = 'held' and resolved_at is null and retained_amount is null)
      or
      (status <> 'held' and resolved_at is not null and resolved_by is not null)
    ),
  constraint deposits_retention_needs_reason
    check (status not in ('retained', 'partially_retained')
           or (retained_amount is not null and retention_reason is not null)),
  constraint deposits_retained_within_amount
    check (retained_amount is null or retained_amount <= amount)
);

create index deposits_pending_idx on deposits (created_at) where status = 'held';

create function freeze_resolved_deposit() returns trigger
language plpgsql as $$
begin
  if old.status <> 'held' and new.status is distinct from old.status then
    raise exception 'Un deposito ya resuelto no cambia de estado';
  end if;
  return new;
end $$;

create trigger deposits_freeze_resolution
  before update on deposits
  for each row execute function freeze_resolved_deposit();
