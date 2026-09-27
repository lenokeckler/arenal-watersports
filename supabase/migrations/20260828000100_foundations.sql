create type work_area          as enum ('administracion', 'reservas', 'operaciones');
create type worker_mark        as enum ('guia', 'encargado_general', 'registro_guias_externos');
create type worker_status      as enum ('active', 'blocked');

create type tracking_mode      as enum ('by_unit', 'by_quantity');
create type usage_metric       as enum ('engine_hours', 'kilometers');
create type category_status    as enum ('active', 'inactive');
create type unit_status        as enum ('available', 'in_maintenance', 'damaged',
                                        'in_repair', 'decommissioned');
create type photo_angle        as enum ('right_side', 'left_side', 'front', 'bottom');
create type damage_cause       as enum ('rollover', 'collision', 'machine_failure', 'other');

create type reservation_type   as enum ('rental', 'tour', 'combo');
create type reservation_status as enum ('scheduled', 'dispatched', 'closed', 'cancelled');

create type currency_code      as enum ('USD', 'CRC');
create type charge_kind        as enum ('tariff', 'extra_time');
create type deposit_status     as enum ('held', 'returned', 'retained', 'partially_retained');

create table workers (
  id                   uuid primary key references auth.users (id) on delete restrict,
  username             text          not null unique,
  full_name            text          not null,
  personal_email       text,
  base_role            work_area     not null,
  is_external_guide    boolean       not null default false,
  national_id          text,
  expires_at           timestamptz,
  status               worker_status not null default 'active',
  failed_attempts      smallint      not null default 0,
  must_change_password boolean       not null default true,
  last_work_area       work_area,
  created_by           uuid references workers (id),
  updated_by           uuid references workers (id),
  created_at           timestamptz   not null default now(),
  updated_at           timestamptz   not null default now(),

  constraint workers_username_format
    check (username = lower(btrim(username)) and length(username) between 3 and 40),

  constraint workers_external_guide_shape
    check (
      not is_external_guide
      or (expires_at is not null and national_id is not null and base_role = 'operaciones')
    ),

  constraint workers_admin_needs_email
    check (base_role <> 'administracion' or personal_email is not null)
);

create unique index workers_single_admin on workers ((true))
  where base_role = 'administracion';

create index workers_status_idx     on workers (status);
create index workers_expires_at_idx on workers (expires_at) where expires_at is not null;

create function guard_admin_account() returns trigger
language plpgsql as $$
begin
  if old.base_role = 'administracion' then
    if tg_op = 'DELETE' then
      raise exception 'La cuenta de administracion no se elimina';
    end if;
    if new.status = 'blocked' then
      raise exception 'La cuenta de administracion no se bloquea';
    end if;
    if new.base_role <> 'administracion' then
      raise exception 'La cuenta de administracion no cambia de rol';
    end if;
  end if;

  return case when tg_op = 'DELETE' then old else new end;
end $$;

create trigger workers_guard_admin
  before update or delete on workers
  for each row execute function guard_admin_account();
