create unique index extras_name_normalized_key on public.extras (lower(btrim(name)));
