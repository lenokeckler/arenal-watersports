begin;
select plan(28);

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
  not has_function_privilege('authenticated', 'public.session_idle_deadline(timestamptz)', 'execute'),
  'authenticated no ejecuta session_idle_deadline'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.session_idle_deadline(timestamptz)'::regprocedure),
  array['search_path=""'],
  'session_idle_deadline fija el search_path vacio'
);

select is(
  public.session_idle_deadline('2026-10-24 15:00:00-06'),
  '2026-10-24 19:30:00-06'::timestamptz,
  'quieto desde las 3:00 p. m.: la noche cuenta desde las 7:00 p. m. y cierra a las 7:30 p. m.'
);
select is(
  public.session_idle_deadline('2026-10-24 18:20:00-06'),
  '2026-10-24 19:30:00-06'::timestamptz,
  'quieto desde las 6:20 p. m.: no cierra de golpe a las 7:00 p. m., cierra a las 7:30 p. m.'
);
select is(
  public.session_idle_deadline('2026-10-24 19:00:00-06'),
  '2026-10-24 19:30:00-06'::timestamptz,
  'una accion justo a las 7:00 p. m. cierra a las 7:30 p. m.'
);
select is(
  public.session_idle_deadline('2026-10-24 21:10:00-06'),
  '2026-10-24 21:40:00-06'::timestamptz,
  'de noche cierra treinta minutos despues de la ultima accion'
);
select is(
  public.session_idle_deadline('2026-10-24 23:50:00-06'),
  '2026-10-25 00:20:00-06'::timestamptz,
  'la cuenta sigue al pasar la medianoche'
);
select is(
  public.session_idle_deadline('2026-10-25 06:00:00-06'),
  '2026-10-25 06:30:00-06'::timestamptz,
  'de madrugada cierra si completa treinta minutos antes de las 7:00 a. m.'
);
select is(
  public.session_idle_deadline('2026-10-25 06:30:00-06'),
  '2026-10-25 07:00:00-06'::timestamptz,
  'treinta minutos que terminan justo a las 7:00 a. m. cuentan como noche'
);
select is(
  public.session_idle_deadline('2026-10-25 06:45:00-06'),
  '2026-10-25 19:30:00-06'::timestamptz,
  'sin treinta minutos antes de las 7:00 a. m. sigue todo el dia y la cuenta vuelve a empezar a las 7:00 p. m.'
);
select is(
  public.session_idle_deadline('2026-10-24 09:00:00-06'),
  '2026-10-24 19:30:00-06'::timestamptz,
  'quien entra de dia cierra como pronto a las 7:30 p. m.'
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
  not public.session_idle_expired('2026-10-24 18:20:00-06', '2026-10-24 19:00:00-06'),
  'a las 7:00 p. m. ya no cierra de una a quien lleva mas de treinta minutos sin actividad'
);
select ok(
  not public.session_idle_expired('2026-10-24 18:20:00-06', '2026-10-24 19:30:00-06'),
  'quieto desde la tarde sigue dentro hasta las 7:30 p. m. justas'
);
select ok(
  public.session_idle_expired('2026-10-24 18:20:00-06', '2026-10-24 19:30:01-06'),
  'quieto desde la tarde sale pasadas las 7:30 p. m.'
);
select ok(
  not public.session_idle_expired('2026-10-24 18:50:00-06', '2026-10-24 19:20:01-06'),
  'quien estuvo activo a las 6:50 p. m. sigue dentro a las 7:20 p. m.'
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
  not public.session_idle_expired('2026-10-25 06:45:00-06', '2026-10-25 12:00:00-06'),
  'quince minutos sin actividad antes de las 7:00 a. m. no cierran la sesion durante el dia'
);
select ok(
  public.session_idle_expired('2026-10-24 17:00:00-06', '2026-10-25 09:00:00-06'),
  'una sesion dejada de un dia para otro se cierra aunque se vuelva dentro de la jornada'
);
select ok(
  public.session_idle_expired('2026-10-24 18:40:00-06', '2026-10-25 07:00:00-06'),
  'una sesion que paso la noche sin actividad esta cerrada a las 7:00 a. m.'
);
select ok(
  not public.session_idle_expired('2026-10-24 12:00:00-06', '2026-10-24 11:00:00-06'),
  'una ultima actividad posterior al momento evaluado no cierra la sesion'
);

select * from finish();
rollback;
