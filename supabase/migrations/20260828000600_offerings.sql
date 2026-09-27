create table extras (
  id     uuid primary key default gen_random_uuid(),
  name   text not null unique,
  status category_status not null default 'active',

  price_usd numeric(12,2),
  price_crc numeric(14,2),

  occupies_category_id uuid references equipment_categories (id),
  occupies_quantity    integer check (occupies_quantity > 0),

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint extras_occupies_shape
    check ((occupies_category_id is null) = (occupies_quantity is null))
);

create table extra_compatibility (
  extra_id uuid not null references extras (id) on delete restrict,
  unit_id  uuid not null references equipment_units (id) on delete restrict,
  primary key (extra_id, unit_id)
);

create table combos (
  id     uuid primary key default gen_random_uuid(),
  name   text not null unique,
  status category_status not null default 'active',
  package_price_usd numeric(12,2),
  package_price_crc numeric(14,2),
  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table combo_items (
  combo_id    uuid not null references combos (id) on delete restrict,
  category_id uuid not null references equipment_categories (id) on delete restrict,
  quantity    integer not null check (quantity > 0),
  primary key (combo_id, category_id)
);

create table tariffs (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references equipment_categories (id) on delete restrict,
  type        reservation_type not null,
  amount_usd  numeric(12,2),
  amount_crc  numeric(14,2),
  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (category_id, type),
  constraint tariffs_has_some_price
    check (amount_usd is not null or amount_crc is not null),

  constraint tariffs_not_for_combo check (type <> 'combo')
);
