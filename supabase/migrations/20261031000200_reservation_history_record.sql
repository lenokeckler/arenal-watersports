create function public.get_reservation_history_record(p_reservation_id uuid)
returns table (
  id                  uuid,
  customer_name       text,
  starts_at           timestamptz,
  status              public.reservation_status,
  cancellation_reason text,
  equipment_names     text[],
  guide_names         text[],
  created_by_name     text,
  created_at          timestamptz,
  updated_by_name     text,
  updated_at          timestamptz
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  if not (public.has_area('reservas') or public.has_area('operaciones') or public.is_admin()) then
    raise exception using errcode = '42501';
  end if;

  return query
  select
    r.id,
    r.customer_name,
    r.starts_at,
    r.status,
    r.cancellation_reason,
    public.reservation_history_equipment_names(r.id),
    public.reservation_history_guide_names(r.id),
    creator.full_name,
    r.created_at,
    modifier.full_name,
    r.updated_at
  from public.reservations r
  left join public.workers creator on creator.id = r.created_by
  left join public.workers modifier on modifier.id = r.updated_by
  where r.id = p_reservation_id
    and r.status in ('closed', 'cancelled');
end $$;

revoke all on function public.get_reservation_history_record(uuid) from public, anon;
grant execute on function public.get_reservation_history_record(uuid) to authenticated;
