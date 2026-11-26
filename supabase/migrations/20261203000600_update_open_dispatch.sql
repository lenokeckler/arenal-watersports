create function update_open_dispatch(
  p_dispatch_id uuid,
  p_dispatched_at timestamptz,
  p_returns_at timestamptz,
  p_radio_channel smallint default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_closed_at timestamptz;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  if p_dispatched_at is null
     or p_returns_at is null
     or p_returns_at <= p_dispatched_at
     or p_dispatched_at > now() + interval '5 minutes' then
    raise exception 'The times are not valid' using errcode = '22023';
  end if;

  if p_radio_channel is not null and p_radio_channel not between 1 and 99 then
    raise exception 'The radio channel must be between 1 and 99' using errcode = '22023';
  end if;

  select closed_at into v_closed_at
  from reservation_dispatches
  where id = p_dispatch_id
  for update;

  if not found then
    raise exception 'Dispatch not found' using errcode = 'P0002';
  end if;

  if v_closed_at is not null then
    raise exception 'The group already came back' using errcode = '55000';
  end if;

  update reservation_dispatches
     set dispatched_at = p_dispatched_at,
         duration_minutes = ceil(extract(epoch from (p_returns_at - p_dispatched_at)) / 60)::integer,
         radio_channel = p_radio_channel
   where id = p_dispatch_id;
end;
$$;

revoke all on function update_open_dispatch(uuid, timestamptz, timestamptz, smallint) from public, anon;
grant execute on function update_open_dispatch(uuid, timestamptz, timestamptz, smallint) to authenticated;
