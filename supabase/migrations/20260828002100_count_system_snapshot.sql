alter table inventory_count_lines
  add column system_quantity_available integer,
  add column system_quantity_damaged integer,
  add column system_quantity_in_repair integer;
