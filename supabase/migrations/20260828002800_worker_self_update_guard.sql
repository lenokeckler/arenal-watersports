drop trigger workers_guard_lockout_fields on workers;
drop function guard_lockout_fields();

create function guard_worker_self_update() returns trigger
language plpgsql set search_path = public as $$
declare
  self_editable_columns constant text[] := array['personal_email', 'last_work_area'];
  update_refused_message constant text :=
    'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo';
  insert_refused_message constant text :=
    'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente';
begin
  if auth.uid() is null or is_admin() then
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if (to_jsonb(new) - self_editable_columns) is distinct from (to_jsonb(old) - self_editable_columns) then
      raise exception '%', update_refused_message using errcode = '42501';
    end if;
  elsif not (
    new.must_change_password
    and coalesce(new.created_by, auth.uid()) = auth.uid()
    and new.status = 'active'
    and new.blocked_reason is null
    and new.failed_attempts = 0
    and new.deleted_at is null
    and new.last_work_area is null
    and coalesce(new.updated_by, auth.uid()) = auth.uid()
  ) then
    raise exception '%', insert_refused_message using errcode = '42501';
  end if;

  return new;
end $$;

create trigger workers_guard_self_update
  before insert or update on workers
  for each row execute function guard_worker_self_update();
