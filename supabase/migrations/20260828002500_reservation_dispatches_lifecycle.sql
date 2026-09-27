alter table reservation_dispatches
  drop constraint reservation_dispatches_one_group_per_category;

create unique index reservation_dispatches_one_open_group_per_category
  on reservation_dispatches (reservation_id, category_id)
  where closed_at is null;

create or replace function sync_reservation_status_from_dispatches() returns trigger
language plpgsql as $$
declare
  v_reservation_id uuid := coalesce(new.reservation_id, old.reservation_id);
  v_all_groups_closed boolean;
  v_has_undispatched_by_unit_item boolean;
  v_closed_at timestamptz;
begin
  if tg_op = 'INSERT' then
    update reservations
       set status = 'dispatched',
           dispatched_at = coalesce(dispatched_at, new.dispatched_at),
           updated_by = new.created_by
     where id = v_reservation_id
       and status = 'scheduled';
  end if;

  if tg_op = 'UPDATE' and new.closed_at is not null and old.closed_at is null then
    select bool_and(closed_at is not null) into v_all_groups_closed
    from reservation_dispatches
    where reservation_id = v_reservation_id;

    select exists (
      select 1
      from reservation_items ri
      left join equipment_units u on u.id = ri.unit_id
      join equipment_categories ec on ec.id = coalesce(u.category_id, ri.category_id)
      where ri.reservation_id = v_reservation_id
        and ec.tracking_mode = 'by_unit'
        and ri.dispatch_id is null
    ) into v_has_undispatched_by_unit_item;

    if v_all_groups_closed and not v_has_undispatched_by_unit_item then
      select max(closed_at) into v_closed_at
      from reservation_dispatches
      where reservation_id = v_reservation_id;

      update reservations
         set status = 'closed',
             closed_at = v_closed_at,
             updated_by = new.updated_by
       where id = v_reservation_id
         and status = 'dispatched';
    end if;
  end if;

  update reservations r
     set extra_time_minutes = (
           select coalesce(sum(rd.extra_time_minutes), 0)::integer
           from reservation_dispatches rd
           where rd.reservation_id = v_reservation_id
         )
   where r.id = v_reservation_id;

  return new;
end;
$$;
