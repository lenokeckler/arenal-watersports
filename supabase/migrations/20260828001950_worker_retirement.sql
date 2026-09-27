alter table workers
  add column deleted_at timestamptz;

create index workers_active_profile_idx
  on workers (deleted_at)
  where deleted_at is null;

create or replace function guard_admin_account() returns trigger
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
    if new.deleted_at is not null then
      raise exception 'La cuenta de administracion no se elimina';
    end if;
  end if;

  return case when tg_op = 'DELETE' then old else new end;
end $$;

create function guard_worker_stays_deleted() returns trigger
language plpgsql as $$
begin
  if old.deleted_at is not null and new.deleted_at is null then
    raise exception 'Un perfil eliminado no se reactiva: cree una cuenta nueva';
  end if;
  return new;
end $$;

create trigger workers_guard_deleted
  before update on workers
  for each row execute function guard_worker_stays_deleted();
