create or replace function validate_reservation_guide_only_equipment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := new.category_id;
  selected_reservation_type reservation_type;
  selected_combo_id uuid;
  is_guide_only boolean;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.unit_id is not null then
    select unit.category_id into committed_category_id
    from equipment_units as unit
    where unit.id = new.unit_id;
  end if;
  select reservation.type, reservation.combo_id, category.guide_only
  into selected_reservation_type, selected_combo_id, is_guide_only
  from reservations as reservation
  join equipment_categories as category
    on category.id = committed_category_id
  where reservation.id = new.reservation_id;
  if found and is_guide_only
    and selected_reservation_type <> 'tour'
    and not (selected_reservation_type = 'combo'
      and selected_combo_id is null) then
    raise exception 'Guide-only equipment requires a tour reservation';
  end if;
  return new;
end;
$$;

create or replace function validate_reservation_guide_assignment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  assigned_reservation_type reservation_type;
  assigned_combo_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  select reservation.type, reservation.combo_id
    into assigned_reservation_type, assigned_combo_id
  from reservations as reservation
  where reservation.id = new.reservation_id
  for update;
  if not found or not (
    assigned_reservation_type = 'tour'
    or (assigned_reservation_type = 'combo'
      and assigned_combo_id is null
      and exists (
        select 1
        from reservation_items as item
        join equipment_categories as category
          on category.id = item.category_id
        where item.reservation_id = new.reservation_id
          and category.guide_only
      ))
  ) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if new.assigned_by is distinct from auth.uid() then
    raise exception 'Assignment author must match the authenticated worker';
  end if;
  if not exists (
    select 1 from worker_marks as mark
    where mark.worker_id = new.worker_id and mark.mark = 'guia'
  ) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
  return new;
end;
$$;

create or replace function validate_reservation_type_for_guides()
returns trigger
language plpgsql security invoker set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.type = 'tour' then
    return new;
  end if;
  if new.type = 'combo' and new.combo_id is null and exists (
    select 1
    from reservation_items as item
    join equipment_categories as category
      on category.id = item.category_id
    where item.reservation_id = new.id and category.guide_only
  ) then
    return new;
  end if;
  if exists (
    select 1 from reservation_guides as assignment
    where assignment.reservation_id = new.id
  ) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  return new;
end;
$$;

create or replace function validate_reservation_guide_only_type()
returns trigger
language plpgsql security invoker set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.type is not distinct from old.type or new.type = 'tour'
    or (new.type = 'combo' and new.combo_id is null) then
    return new;
  end if;
  if exists (
    select 1
    from reservation_items as item
    left join equipment_units as unit on unit.id = item.unit_id
    join equipment_categories as category
      on category.id = coalesce(item.category_id, unit.category_id)
    where item.reservation_id = new.id and category.guide_only
  ) then
    raise exception 'Guide-only equipment requires a tour reservation';
  end if;
  return new;
end;
$$;
