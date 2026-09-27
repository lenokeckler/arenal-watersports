create table equipment_units (
  id                  uuid primary key default gen_random_uuid(),
  category_id         uuid not null references equipment_categories (id) on delete restrict,
  code                text not null unique,
  status              unit_status not null default 'available',

  current_fuel        numeric(5,2),
  usage_total         numeric(12,2) not null default 0,
  next_oil_change_at  numeric(12,2),
  impact_count        integer not null default 0,

  decommissioned_at   timestamptz,
  decommission_reason text,

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint units_decommission_shape
    check ((status = 'decommissioned') = (decommissioned_at is not null)),
  constraint units_decommission_needs_reason
    check (decommissioned_at is null or decommission_reason is not null),
  constraint units_impact_count_positive check (impact_count >= 0),
  constraint units_fuel_range
    check (current_fuel is null or (current_fuel >= 0 and current_fuel <= 100))
);

create index units_category_status_idx on equipment_units (category_id, status);

create table equipment_stock (
  category_id        uuid primary key references equipment_categories (id) on delete restrict,
  quantity_available integer not null default 0 check (quantity_available >= 0),
  quantity_damaged   integer not null default 0 check (quantity_damaged   >= 0),
  quantity_in_repair integer not null default 0 check (quantity_in_repair >= 0),
  expiry_date        date,
  updated_by uuid not null references workers (id),
  updated_at timestamptz not null default now()
);

create table equipment_stock_movements (
  id             uuid primary key default gen_random_uuid(),
  category_id    uuid not null references equipment_categories (id) on delete restrict,
  from_available integer not null, to_available integer not null,
  from_damaged   integer not null, to_damaged   integer not null,
  from_in_repair integer not null, to_in_repair integer not null,
  reason         text not null,
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now()
);

create index stock_movements_category_idx
  on equipment_stock_movements (category_id, created_at desc);
