create sequence reservation_code_seq;

create function next_reservation_code() returns text
language sql volatile as $$
  select 'R-' || lpad(nextval('reservation_code_seq')::text, 6, '0');
$$;

create table reservations (
  id                    uuid primary key default gen_random_uuid(),
  code                  text not null unique default next_reservation_code(),
  customer_name         text not null,
  people_count          integer not null check (people_count > 0),

  type                  reservation_type not null,
  combo_id              uuid references combos (id),

  starts_at             timestamptz not null,
  duration_minutes      integer not null check (duration_minutes > 0),

  ends_at               timestamptz generated always as
                          ((starts_at at time zone 'UTC'
                              + make_interval(mins => duration_minutes)) at time zone 'UTC') stored,

  status                reservation_status not null default 'scheduled',

  parent_reservation_id uuid references reservations (id),

  cancellation_reason   text,
  dispatched_at         timestamptz,
  closed_at             timestamptz,
  extra_time_minutes    integer not null default 0 check (extra_time_minutes >= 0),

  list_amount_usd       numeric(12,2),
  list_amount_crc       numeric(14,2),
  agreed_amount_usd     numeric(12,2),
  agreed_amount_crc     numeric(14,2),

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint reservations_cancel_needs_reason
    check (status <> 'cancelled' or cancellation_reason is not null),
  constraint reservations_combo_shape
    check (combo_id is null or type = 'combo'),
  constraint reservations_not_own_parent
    check (parent_reservation_id is distinct from id)
);

create index reservations_window_idx on reservations (starts_at, ends_at)
  where status in ('scheduled', 'dispatched');
create index reservations_status_idx on reservations (status, starts_at);

create table reservation_items (
  id             uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations (id) on delete restrict,

  unit_id        uuid references equipment_units (id),
  category_id    uuid references equipment_categories (id),
  quantity       integer check (quantity > 0),

  extra_id       uuid references extras (id),

  fuel_out       numeric(5,2),
  usage_out      numeric(12,2),
  fuel_in        numeric(5,2),
  usage_in       numeric(12,2),

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint item_is_unit_or_quantity
    check (
      (unit_id is not null and category_id is null and quantity is null)
      or
      (unit_id is null and category_id is not null and quantity is not null)
    )
);

create index items_unit_idx        on reservation_items (unit_id) where unit_id is not null;
create index items_category_idx    on reservation_items (category_id) where category_id is not null;
create index items_reservation_idx on reservation_items (reservation_id);

create table reservation_guides (
  reservation_id uuid not null references reservations (id) on delete restrict,
  worker_id      uuid not null references workers (id) on delete restrict,
  assigned_by    uuid not null references workers (id),
  assigned_at    timestamptz not null default now(),
  primary key (reservation_id, worker_id)
);
