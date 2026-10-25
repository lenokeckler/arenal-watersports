begin;
select plan(12);

select ok(
  not has_function_privilege('authenticated', 'public.workday_contains(timestamptz)', 'execute'),
  'authenticated no ejecuta workday_contains'
);
select ok(
  not has_function_privilege('anon', 'public.workday_contains(timestamptz)', 'execute'),
  'anon no ejecuta workday_contains'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.workday_contains(timestamptz)'::regprocedure),
  array['search_path=""'],
  'workday_contains fija el search_path vacio'
);

select ok(not public.workday_contains('2026-10-24 06:59:59-06'), 'las 6:59:59 a. m. quedan fuera de la jornada');
select ok(public.workday_contains('2026-10-24 07:00:00-06'), 'las 7:00 a. m. abren la jornada');
select ok(public.workday_contains('2026-10-24 09:00:00-06'), 'las 9:00 a. m. estan dentro de la jornada');
select ok(public.workday_contains('2026-10-24 18:59:59-06'), 'las 6:59:59 p. m. siguen dentro de la jornada');
select ok(not public.workday_contains('2026-10-24 19:00:00-06'), 'las 7:00 p. m. cierran la jornada');
select ok(not public.workday_contains('2026-10-24 23:30:00-06'), 'la noche queda fuera de la jornada');

select ok(public.workday_contains('2026-10-24 13:00:00+00'), 'las 13:00 UTC son las 7:00 a. m. en Costa Rica');
select ok(not public.workday_contains('2026-10-25 01:00:00+00'), 'la 1:00 UTC es la 7:00 p. m. del dia anterior en Costa Rica');

set local timezone to 'Asia/Tokyo';
select ok(public.workday_contains('2026-10-24 09:00:00-06'), 'la zona horaria de la sesion no cambia la jornada');

select * from finish();
rollback;
