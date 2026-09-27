create or replace function category_availability(
  p_category_id         uuid,
  p_starts_at           timestamptz,
  p_ends_at             timestamptz,
  p_exclude_reservation uuid default null
) returns table (usable integer, committed integer, free integer)
language sql stable as $$
  with category as (
    select tracking_mode from equipment_categories where id = p_category_id
  ),
  stock as (

    select case (select tracking_mode from category)
      when 'by_quantity' then coalesce(
        (select quantity_available from equipment_stock where category_id = p_category_id), 0)
      else (
        select count(*) from equipment_units
        where category_id = p_category_id and status = 'available')
    end::integer as usable
  ),
  taken as (
    select
      coalesce((

        select sum(ri.quantity)::integer
        from reservation_items ri
        join reservations r on r.id = ri.reservation_id
        where ri.category_id = p_category_id
          and r.status in ('scheduled', 'dispatched')
          and r.id is distinct from p_exclude_reservation
          and tstzrange(r.starts_at, r.ends_at, '[)')
              && tstzrange(p_starts_at, p_ends_at, '[)')
      ), 0)
      +
      coalesce((

        select count(*)::integer
        from reservation_items ri
        join reservations r on r.id = ri.reservation_id
        join equipment_units u on u.id = ri.unit_id
        where u.category_id = p_category_id
          and r.status in ('scheduled', 'dispatched')
          and r.id is distinct from p_exclude_reservation
          and tstzrange(r.starts_at, r.ends_at, '[)')
              && tstzrange(p_starts_at, p_ends_at, '[)')
      ), 0) as committed
  )
  select stock.usable, taken.committed, stock.usable - taken.committed
  from stock, taken;
$$;
