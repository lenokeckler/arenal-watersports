create unique index workers_national_id_unique
  on public.workers (lower(btrim(national_id)))
  where national_id is not null;
