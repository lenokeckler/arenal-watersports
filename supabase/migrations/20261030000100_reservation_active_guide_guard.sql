create or replace function private.is_active_guide(
  target_worker_id uuid
) returns boolean
language sql stable security definer set search_path = public
as $$
  select (has_area('reservas') or has_area('operaciones'))
    and exists (
      select 1 from workers as worker
      join worker_marks as mark on mark.worker_id = worker.id
      where worker.id = target_worker_id
        and worker.status = 'active'
        and worker.deleted_at is null
        and (worker.expires_at is null or worker.expires_at > now())
        and mark.mark = 'guia'
    );
$$;
revoke all on function private.is_active_guide(uuid) from public, anon;
grant execute on function private.is_active_guide(uuid) to authenticated;

create or replace function validate_reservation_guide_assignments(
  p_payload jsonb,
  p_reservation_type reservation_type
) returns uuid[]
language plpgsql security invoker set search_path = public
as $$
declare
  selected_guide_ids uuid[];
begin
  if p_payload ? 'guide_ids' and jsonb_typeof(p_payload->'guide_ids') <> 'array' then
    raise exception 'Guide identifiers must be an array';
  end if;
  if exists (select 1 from jsonb_array_elements(coalesce(p_payload->'guide_ids', '[]'::jsonb)) as input(guide_id)
    where jsonb_typeof(input.guide_id) = 'null') then
    raise exception 'Guide identifiers must be UUID values';
  end if;
  begin
    select coalesce(array_agg(distinct guide_id::uuid), '{}'::uuid[]) into selected_guide_ids
    from jsonb_array_elements_text(coalesce(p_payload->'guide_ids', '[]'::jsonb)) as input(guide_id);
  exception when invalid_text_representation then
    raise exception 'Guide identifiers must be UUID values';
  end;
  if cardinality(selected_guide_ids) > 0 and p_reservation_type <> 'tour' then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if exists (select 1 from unnest(selected_guide_ids) as selected(guide_id)
    where not private.is_active_guide(selected.guide_id)) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
  return selected_guide_ids;
end;
$$;
revoke all on function validate_reservation_guide_assignments(jsonb, reservation_type) from public, anon;
grant execute on function validate_reservation_guide_assignments(jsonb, reservation_type) to authenticated;

create or replace function validate_reservation_guide_assignment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  assigned_reservation_type reservation_type;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then return new; end if;
  select reservation.type into assigned_reservation_type
  from reservations as reservation where reservation.id = new.reservation_id for update;
  if not found or assigned_reservation_type <> 'tour' then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if new.assigned_by is distinct from auth.uid() then
    raise exception 'Assignment author must match the authenticated worker';
  end if;
  if not private.is_active_guide(new.worker_id) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
  return new;
end;
$$;
revoke all on function validate_reservation_guide_assignment() from public, anon;

drop policy worker_marks_select_guides on worker_marks;
create policy worker_marks_select_guides on worker_marks
  for select to authenticated
  using (mark = 'guia' and private.is_active_guide(worker_id));

drop policy workers_select_guides on workers;
create policy workers_select_guides on workers
  for select to authenticated
  using (private.is_active_guide(id));
