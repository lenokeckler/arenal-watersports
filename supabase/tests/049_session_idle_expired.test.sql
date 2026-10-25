begin;
select plan(15);

select ok(
  not has_function_privilege('authenticated', 'public.session_idle_expired(timestamptz, timestamptz)', 'execute'),
  'authenticated no ejecuta session_idle_expired'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.session_idle_expired(timestamptz, timestamptz)'::regprocedure),
  array['search_path=""'],
  'session_idle_expired fija el search_path vacio'
);

select ok(
  not public.session_idle_expired('2026-10-24 09:00:00-06', '2026-10-24 18:59:59-06'),
  'quien entra a las 9:00 a. m. sigue dentro a las 6:59 p. m. sin tocar nada'
);
select ok(
  not public.session_idle_expired('2026-10-24 07:00:00-06', '2026-10-24 18:59:59-06'),
  'toda la jornada sin actividad no cierra la sesion'
);
select ok(
  not public.session_idle_expired('2026-10-24 06:50:00-06', '2026-10-24 12:00:00-06'),
  'diez minutos sin actividad antes de las 7:00 a. m. no cierran la sesion'
);

select ok(
  public.session_idle_expired('2026-10-24 18:20:00-06', '2026-10-24 19:00:00-06'),
  'a las 7:00 p. m. cierra de una a quien lleva mas de treinta minutos sin actividad'
);
select ok(
  not public.session_idle_expired('2026-10-24 18:50:00-06', '2026-10-24 19:20:00-06'),
  'quien estuvo activo a las 6:50 p. m. sigue dentro a las 7:20 p. m.'
);
select ok(
  public.session_idle_expired('2026-10-24 18:50:00-06', '2026-10-24 19:20:01-06'),
  'quien estuvo activo a las 6:50 p. m. sale pasados treinta minutos'
);
select ok(
  not public.session_idle_expired('2026-10-24 22:00:00-06', '2026-10-24 22:30:00-06'),
  'de noche treinta minutos justos no cierran la sesion'
);
select ok(
  public.session_idle_expired('2026-10-24 22:00:00-06', '2026-10-24 22:30:01-06'),
  'de noche pasados treinta minutos la sesion se cierra'
);
select ok(
  not public.session_idle_expired('2026-10-24 23:50:00-06', '2026-10-25 00:15:00-06'),
  'quien trabaja de noche sigue dentro al pasar la medianoche'
);
select ok(
  public.session_idle_expired('2026-10-24 06:00:00-06', '2026-10-24 07:30:00-06'),
  'treinta minutos sin actividad de madrugada no se perdonan al abrir la jornada'
);
select ok(
  public.session_idle_expired('2026-10-24 17:00:00-06', '2026-10-25 09:00:00-06'),
  'una sesion dejada de un dia para otro se cierra aunque se vuelva dentro de la jornada'
);
select ok(
  public.session_idle_expired('2026-10-24 18:40:00-06', '2026-10-25 07:00:00-06'),
  'una sesion que paso la noche sin actividad se cierra a las 7:00 a. m.'
);
select ok(
  not public.session_idle_expired('2026-10-24 12:00:00-06', '2026-10-24 11:00:00-06'),
  'una ultima actividad posterior al momento evaluado no cierra la sesion'
);

select * from finish();
rollback;
