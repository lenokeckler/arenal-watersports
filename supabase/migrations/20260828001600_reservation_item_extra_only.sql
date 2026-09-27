alter table reservation_items
  drop constraint item_is_unit_or_quantity;

alter table reservation_items
  add constraint item_is_unit_or_quantity
  check (
    (unit_id is not null and category_id is null and quantity is null)
    or
    (unit_id is null and category_id is not null and quantity is not null)
    or
    (unit_id is null and category_id is null and quantity is null
     and extra_id is not null)
  );
