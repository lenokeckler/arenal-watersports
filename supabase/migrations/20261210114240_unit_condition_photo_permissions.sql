create function public.can_manage_unit_photos()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_admin()
    or (
      public.has_area('operaciones')
      and exists (
        select 1
          from public.workers w
         where w.id = auth.uid()
           and not w.is_external_guide
      )
    );
$$;

revoke all on function public.can_manage_unit_photos() from public, anon;
grant execute on function public.can_manage_unit_photos() to authenticated;

grant delete on public.unit_condition_photos to authenticated;

drop policy if exists photos_insert on public.unit_condition_photos;
create policy photos_insert on public.unit_condition_photos
  for insert to authenticated
  with check (public.can_manage_unit_photos());

drop policy if exists photos_update on public.unit_condition_photos;
create policy photos_update on public.unit_condition_photos
  for update to authenticated
  using (public.can_manage_unit_photos())
  with check (public.can_manage_unit_photos());

drop policy if exists photos_delete on public.unit_condition_photos;
create policy photos_delete on public.unit_condition_photos
  for delete to authenticated
  using (public.can_manage_unit_photos());

drop policy if exists condition_photos_insert on storage.objects;
create policy condition_photos_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'unit-condition-photos'
    and public.can_manage_unit_photos()
  );

drop policy if exists condition_photos_update on storage.objects;

drop policy if exists condition_photos_delete on storage.objects;
create policy condition_photos_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'unit-condition-photos'
    and public.can_manage_unit_photos()
    and not exists (
      select 1
        from public.unit_condition_photos p
       where p.storage_path = objects.name
    )
  );

create table public.unit_condition_photo_changes (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null
    references public.equipment_units (id) on delete cascade,
  angle public.photo_angle not null,
  action text not null
    check (action in ('uploaded', 'replaced', 'deleted')),
  changed_by uuid references public.workers (id) on delete set null,
  changed_at timestamptz not null default clock_timestamp()
);

create index unit_condition_photo_changes_unit_idx
  on public.unit_condition_photo_changes (unit_id, changed_at desc);

alter table public.unit_condition_photo_changes enable row level security;

revoke all on public.unit_condition_photo_changes from anon, authenticated;
grant select on public.unit_condition_photo_changes to authenticated;

create policy unit_condition_photo_changes_select
  on public.unit_condition_photo_changes
  for select to authenticated
  using (
    public.is_admin()
    or (public.has_area('operaciones') and public.has_mark('encargado_general'))
  );

create function public.log_unit_condition_photo_change()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if tg_op = 'DELETE' then
    insert into public.unit_condition_photo_changes
      (unit_id, angle, action, changed_by)
    values (old.unit_id, old.angle, 'deleted', auth.uid());

    return old;
  end if;

  insert into public.unit_condition_photo_changes
    (unit_id, angle, action, changed_by)
  values (
    new.unit_id,
    new.angle,
    case tg_op when 'INSERT' then 'uploaded' else 'replaced' end,
    auth.uid()
  );

  return new;
end;
$$;

revoke all on function public.log_unit_condition_photo_change()
  from public, anon, authenticated;

create trigger unit_condition_photos_log_change
  after insert or update or delete on public.unit_condition_photos
  for each row execute function public.log_unit_condition_photo_change();

create function public.keep_unit_condition_photo_slot()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  raise exception 'A photo stays on its machine and angle'
    using errcode = '23514';
end;
$$;

revoke all on function public.keep_unit_condition_photo_slot()
  from public, anon, authenticated;

create trigger unit_condition_photos_keep_slot
  before update on public.unit_condition_photos
  for each row
  when (
    old.unit_id is distinct from new.unit_id
    or old.angle is distinct from new.angle
  )
  execute function public.keep_unit_condition_photo_slot();
