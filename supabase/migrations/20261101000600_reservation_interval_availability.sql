create or replace function category_availability(
  p_category_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid default null
) returns table (usable integer, committed integer, free integer)
language sql stable security invoker set search_path = public
as $$
  with stock as (
    select case (
      select category.tracking_mode from equipment_categories as category
      where category.id = p_category_id
    )
      when 'by_quantity' then coalesce((
        select quantity_available from equipment_stock
        where category_id = p_category_id
      ), 0)
      else (
        select count(*) from equipment_units
        where category_id = p_category_id and status = 'available'
      )
    end::integer as usable
  ), taken as (
    select private.reservation_category_peak_commitment(
      p_category_id, p_starts_at, p_ends_at, p_exclude_reservation
    ) as committed
  )
  select stock.usable, taken.committed, stock.usable - taken.committed
  from stock, taken;
$$;
