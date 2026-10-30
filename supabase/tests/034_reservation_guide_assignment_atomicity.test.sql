begin;
select plan(4);

insert into auth.users (id, email) values
  ('e3400000-0000-4000-8000-000000000001', 'res12-atomicity@arenal.local'),
  ('e3400000-0000-4000-8000-000000000002', 'res12-atomicity-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3400000-0000-4000-8000-000000000001', 'res12-atomicity', 'RES12 Atomicity', 'reservas'),
  ('e3400000-0000-4000-8000-000000000002', 'res12-atomicity-guide', 'RES12 Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e3400000-0000-4000-8000-000000000002', 'guia', 'e3400000-0000-4000-8000-000000000001');
insert into equipment_categories (id, name, tracking_mode, is_reservable, units_are_interchangeable,
  default_duration_minutes, created_by, updated_by)
values ('e3400000-0000-4000-8000-000000000101', 'RES12 Atomicity ATV', 'by_quantity', true, true,
  60, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3400000-0000-4000-8000-000000000101', 1, 'e3400000-0000-4000-8000-000000000001');

create function reject_res12_guide_assignment()
returns trigger
language plpgsql
as $$
begin
  if new.worker_id = 'e3400000-0000-4000-8000-000000000002' then
    raise exception 'Injected reservation guide assignment failure';
  end if;
  return new;
end;
$$;
create trigger reject_res12_guide_assignment
before insert on reservation_guides
for each row execute function reject_res12_guide_assignment();

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3400000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Late assignment failure', 'people_count', 1, 'date', '2035-12-11',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3400000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3400000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Injected reservation guide assignment failure', 'late guide insertion failure aborts creation');
select is((select count(*)::integer from reservations
  where customer_name = 'RES12 Late assignment failure'), 0, 'the reservation row is rolled back');
select is((select count(*)::integer from reservation_items i join reservations r on r.id = i.reservation_id
  where r.customer_name = 'RES12 Late assignment failure'), 0, 'the equipment item is rolled back');
select is((select count(*)::integer from reservation_guides g join reservations r on r.id = g.reservation_id
  where r.customer_name = 'RES12 Late assignment failure'), 0, 'the guide relation is rolled back');

reset role;
drop trigger reject_res12_guide_assignment on reservation_guides;
drop function reject_res12_guide_assignment();
select * from finish();
rollback;
