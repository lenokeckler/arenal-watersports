create function create_damage_report(
  p_unit_id uuid,
  p_impact_delta integer,
  p_cause damage_cause default null,
  p_description text default null,
  p_unit_status unit_status default null,
  p_reservation_id uuid default null,
  p_detail_later boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_description text := nullif(btrim(coalesce(p_description, '')), '');
  v_report_id uuid;
begin
  if auth.uid() is null or not (is_admin() or has_area('operaciones')) then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  perform check_damage_report_input(
    p_unit_id, p_impact_delta, v_description, p_unit_status, p_reservation_id
  );

  if not coalesce(p_detail_later, false)
     and (p_cause is null or v_description is null) then
    raise exception 'The report needs a cause and a description'
      using errcode = '23514';
  end if;

  perform apply_damage_to_unit(p_unit_id, p_impact_delta, p_unit_status);

  insert into damage_reports (
    unit_id, reservation_id, cause, description,
    impact_delta, detail_pending, created_by
  )
  values (
    p_unit_id, p_reservation_id, p_cause, v_description,
    p_impact_delta, coalesce(p_detail_later, false), auth.uid()
  )
  returning id into v_report_id;

  return v_report_id;
end;
$$;

revoke all on function create_damage_report(uuid, integer, damage_cause, text, unit_status, uuid, boolean)
  from public, anon;
grant execute on function create_damage_report(uuid, integer, damage_cause, text, unit_status, uuid, boolean)
  to authenticated;

create function complete_damage_report(
  p_report_id uuid,
  p_cause damage_cause,
  p_description text,
  p_impact_delta integer,
  p_unit_status unit_status default null,
  p_reservation_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_description text := nullif(btrim(coalesce(p_description, '')), '');
  v_report damage_reports%rowtype;
begin
  if auth.uid() is null or not (is_admin() or has_area('operaciones')) then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  select * into v_report
  from damage_reports
  where id = p_report_id
  for update;

  if not found then
    raise exception 'Report not found' using errcode = 'P0002';
  end if;

  if not v_report.detail_pending then
    raise exception 'The report is already complete' using errcode = '55000';
  end if;

  perform check_damage_report_input(
    v_report.unit_id, p_impact_delta, v_description,
    p_unit_status, p_reservation_id
  );

  if p_cause is null or v_description is null then
    raise exception 'The report needs a cause and a description'
      using errcode = '23514';
  end if;

  perform apply_damage_to_unit(
    v_report.unit_id,
    p_impact_delta - v_report.impact_delta,
    p_unit_status
  );

  update damage_reports
     set cause = p_cause,
         description = v_description,
         impact_delta = p_impact_delta,
         reservation_id = coalesce(p_reservation_id, reservation_id),
         detail_pending = false,
         completed_by = auth.uid(),
         completed_at = now()
   where id = p_report_id;
end;
$$;

revoke all on function complete_damage_report(uuid, damage_cause, text, integer, unit_status, uuid)
  from public, anon;
grant execute on function complete_damage_report(uuid, damage_cause, text, integer, unit_status, uuid)
  to authenticated;
