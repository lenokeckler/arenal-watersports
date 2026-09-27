delete from equipment_stock
 where category_id in (
   select id from equipment_categories
    where name in ('Kayak doble', 'Kayak individual', 'Paddleboard')
 );

alter table equipment_categories disable trigger categories_guard_group_tracking_mode;

update equipment_categories
   set tracking_mode = 'by_unit',
       units_are_interchangeable = true,
       updated_by = (select id from workers where base_role = 'administracion')
 where name in ('Kayak doble', 'Kayak individual', 'Paddleboard');

alter table equipment_categories enable trigger categories_guard_group_tracking_mode;

insert into equipment_units (category_id, code, created_by, updated_by)
select c.id, prefix || lpad(n::text, 2, '0'), admin.id, admin.id
from equipment_categories c
join (values ('Kayak doble', 'KD-', 6), ('Kayak individual', 'KI-', 3), ('Paddleboard', 'PB-', 9))
  as v(category_name, prefix, unit_count) on v.category_name = c.name
cross join lateral generate_series(1, v.unit_count) n
cross join (select id from workers where base_role = 'administracion') admin
on conflict do nothing;
