create table equipment_categories (
  id                       uuid primary key default gen_random_uuid(),
  name                     text not null unique,
  status                   category_status not null default 'active',

  tracking_mode            tracking_mode not null,
  is_reservable            boolean not null default false,

  has_motor                boolean not null default false,
  usage_metric             usage_metric,
  consumes_fuel            boolean not null default false,
  can_be_damaged           boolean not null default true,
  has_condition_photos     boolean not null default false,
  guide_only               boolean not null default false,
  default_duration_minutes integer,

  deposit_usd              numeric(12,2),
  deposit_crc              numeric(14,2),

  alert_min_quantity       integer,
  alert_expiry_days        integer,

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint categories_motor_needs_metric
    check (not has_motor or usage_metric is not null),
  constraint categories_metric_needs_motor
    check (usage_metric is null or has_motor),
  constraint categories_photos_need_units
    check (not has_condition_photos or tracking_mode = 'by_unit'),
  constraint categories_reservable_needs_duration
    check (not is_reservable or default_duration_minutes is not null),
  constraint categories_alert_quantity_positive
    check (alert_min_quantity is null or alert_min_quantity > 0),
  constraint categories_alert_expiry_positive
    check (alert_expiry_days is null or alert_expiry_days > 0),
  constraint categories_deposit_positive
    check ((deposit_usd is null or deposit_usd > 0)
       and (deposit_crc is null or deposit_crc > 0))
);
