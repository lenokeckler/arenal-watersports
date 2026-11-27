begin;
select plan(16);

\ir fixtures/damage_report_flow.sql.fixture

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000001', 1, 'collision', 'Golpe', 'damaged') $$,
  '55000', null,
  'a unit on the water cannot change its state from a report'
);

select receive_dispatch_unit(
  'bbbbbbbb-0000-0000-0000-000000000001', '2026-09-06 15:00:00+00',
  '{"fuel":3,"usage":11,"damage":{"cause":"collision","description":"Golpe en la proa","impact_delta":3},"maintenance":true}'::jsonb
);

select is(
  (select impact_count from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  5,
  'receiving with damage adds the new hits to the unit'
);

select receive_dispatch_unit(
  'bbbbbbbb-0000-0000-0000-000000000002', '2026-09-06 15:00:00+00',
  '{"fuel":3,"usage":11,"damage":{"later":true,"impact_delta":2},"maintenance":true}'::jsonb
);

select is(
  (select detail_pending::text || ':' || coalesce(cause::text, '-') || ':' || coalesce(description, '-') || ':' || impact_delta::text
     from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'true:-:-:2',
  'a damage can be left to detail later'
);

select is(
  (select status::text || ':' || impact_count::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'in_maintenance:3',
  'the unit does not go back to service while the detail is missing'
);

select throws_ok(
  $$ select create_damage_report('bbbbbbbb-0000-0000-0000-000000000003', 1) $$,
  '23514', null,
  'a complete report needs its cause and its description'
);

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000003', -1, 'collision', 'Golpe') $$,
  '23514', null,
  'the hits cannot be negative'
);

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000003', 1, 'collision', 'Golpe', 'available') $$,
  '23514', null,
  'a report cannot return a unit to service'
);

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000003', 1, 'collision', 'Golpe', null,
       'dddddddd-0000-0000-0000-000000000001') $$,
  '23514', null,
  'the trip must have taken the unit'
);

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000003', 1, 'collision', repeat('a', 2001)) $$,
  '23514', null,
  'the description has a limit'
);

select create_damage_report(
  'bbbbbbbb-0000-0000-0000-000000000003', 2, 'rollover', '  Manillar doblado  ', 'damaged');

select is(
  (select status::text || ':' || impact_count::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  'damaged:2',
  'a report on its own updates the state and the hits'
);

select is(
  (select description || ':' || created_by::text || ':' || detail_pending::text
     from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  'Manillar doblado:22222222-2222-2222-2222-222222222222:false',
  'the report stays in the name of who raised it'
);

select create_damage_report(
  'bbbbbbbb-0000-0000-0000-000000000001', 1, null, null, null,
  'dddddddd-0000-0000-0000-000000000001', true);

select is(
  (select status::text || ':' || impact_count::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'in_maintenance:6',
  'a report can keep the state of the unit'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000003', 1, 'collision', 'Golpe') $$,
  '42501', null,
  'someone without operations cannot raise a report'
);

reset role;

select ok(
  not has_function_privilege('anon', 'create_damage_report(uuid, integer, damage_cause, text, unit_status, uuid, boolean)', 'execute'),
  'visitors cannot call the report function'
);

select throws_ok(
  $$ insert into damage_reports (unit_id, impact_delta, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000003', 0, '22222222-2222-2222-2222-222222222222') $$,
  '23514', null,
  'a finished report cannot lose its detail'
);

select is(
  (select count(*)::integer from damage_reports),
  4,
  'only the accepted reports were saved'
);

select * from finish();
rollback;
