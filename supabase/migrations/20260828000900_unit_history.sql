create table unit_condition_photos (
  id           uuid primary key default gen_random_uuid(),
  unit_id      uuid not null references equipment_units (id) on delete restrict,
  angle        photo_angle not null,
  storage_path text not null,
  uploaded_by  uuid not null references workers (id),
  uploaded_at  timestamptz not null default now(),
  unique (unit_id, angle)
);

create table damage_reports (
  id             uuid primary key default gen_random_uuid(),
  unit_id        uuid not null references equipment_units (id) on delete restrict,
  reservation_id uuid references reservations (id),
  cause          damage_cause not null,
  description    text not null,
  impact_delta   integer not null default 0 check (impact_delta >= 0),
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now()
);

create index damage_reports_unit_idx on damage_reports (unit_id, created_at desc);

create table maintenance_records (
  id            uuid primary key default gen_random_uuid(),
  unit_id       uuid not null references equipment_units (id) on delete restrict,
  work_type     text not null,
  description   text,

  is_external   boolean not null,
  cost_amount   numeric(12,2),
  cost_currency currency_code,
  performed_at  date not null,
  created_by    uuid not null references workers (id),
  updated_by    uuid references workers (id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint maintenance_cost_is_complete
    check ((cost_amount is null) = (cost_currency is null)),
  constraint maintenance_cost_positive
    check (cost_amount is null or cost_amount > 0)
);

create index maintenance_unit_idx on maintenance_records (unit_id, performed_at desc);

create table inventory_counts (
  id         uuid primary key default gen_random_uuid(),
  counted_at timestamptz not null default now(),
  notes      text,
  created_by uuid not null references workers (id),
  created_at timestamptz not null default now()
);

create table inventory_count_lines (
  id          uuid primary key default gen_random_uuid(),

  count_id    uuid not null references inventory_counts (id) on delete cascade,
  category_id uuid not null references equipment_categories (id) on delete restrict,

  unit_id            uuid references equipment_units (id),
  confirmed_status   unit_status,

  quantity_available integer,
  quantity_damaged   integer,
  quantity_in_repair integer,

  constraint count_line_is_one_shape
    check (
      (unit_id is not null and confirmed_status is not null
        and quantity_available is null and quantity_damaged is null
        and quantity_in_repair is null)
      or
      (unit_id is null and confirmed_status is null
        and quantity_available is not null and quantity_damaged is not null
        and quantity_in_repair is not null)
    )
);

create index count_lines_count_idx on inventory_count_lines (count_id);
