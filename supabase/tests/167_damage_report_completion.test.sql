begin;
select plan(9);

\ir fixtures/damage_report_flow.sql.fixture

select receive_dispatch_unit(
  'bbbbbbbb-0000-0000-0000-000000000002', '2026-09-06 15:00:00+00',
  '{"fuel":3,"usage":11,"damage":{"later":true,"impact_delta":2},"maintenance":true}'::jsonb
);

select throws_ok(
  $$ select complete_damage_report(
       (select id from damage_reports
         where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
       'other', '   ', 2) $$,
  '23514', null,
  'completing needs a description'
);

select complete_damage_report(
  (select id from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'machine_failure', 'No encendia', 4, 'damaged');

select is(
  (select detail_pending::text || ':' || cause::text || ':' || impact_delta::text
     from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'false:machine_failure:4',
  'completing fills the detail'
);

select is(
  (select status::text || ':' || impact_count::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'damaged:5',
  'completing adds only the difference of hits'
);

select is(
  (select completed_by::text || ':' || (completed_at is not null)::text
     from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  '22222222-2222-2222-2222-222222222222:true',
  'completing records who did it and when'
);

select throws_ok(
  $$ select complete_damage_report(
       (select id from damage_reports
         where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
       'other', 'Otra vez', 9) $$,
  '55000', null,
  'a report is completed only once'
);

select is(
  (select impact_count from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  5,
  'a second try adds no hits'
);

select throws_ok(
  $$ select complete_damage_report(gen_random_uuid(), 'other', 'Nada', 1) $$,
  'P0002', null,
  'an unknown report is refused'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select complete_damage_report(gen_random_uuid(), 'other', 'Nada', 1) $$,
  '42501', null,
  'someone without operations cannot complete a report'
);

reset role;

select ok(
  not has_function_privilege('anon', 'complete_damage_report(uuid, damage_cause, text, integer, unit_status, uuid)', 'execute'),
  'visitors cannot call the completion function'
);

select * from finish();
rollback;
