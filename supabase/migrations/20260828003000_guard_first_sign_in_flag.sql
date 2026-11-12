create function public.guard_first_sign_in_flag() returns trigger
language plpgsql set search_path = '' as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if not new.must_change_password then
      raise exception 'Solo el servidor marca la contrasena como cambiada'
        using errcode = '42501';
    end if;
  elsif old.must_change_password and not new.must_change_password then
    raise exception 'Solo el servidor marca la contrasena como cambiada'
      using errcode = '42501';
  end if;

  return new;
end $$;

create trigger workers_guard_first_sign_in_flag
  before insert or update on public.workers
  for each row execute function public.guard_first_sign_in_flag();
