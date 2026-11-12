create or replace function public.grantable_worker_marks() returns public.worker_mark[]
language sql immutable set search_path = '' as $$
  select array['guia', 'encargado_general', 'registro_guias_externos']::public.worker_mark[];
$$;
