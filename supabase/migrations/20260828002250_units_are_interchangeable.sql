alter table equipment_categories
  add column units_are_interchangeable boolean not null default true;

update equipment_categories
   set units_are_interchangeable = false
 where name = 'Lancha';
