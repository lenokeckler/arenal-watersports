insert into storage.buckets
  (id, name, public, file_size_limit, allowed_mime_types)
values (
  'unit-condition-photos',
  'unit-condition-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy condition_photos_select on storage.objects
  for select to authenticated
  using (bucket_id = 'unit-condition-photos');

create policy condition_photos_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'unit-condition-photos'
    and (public.has_mark('encargado_general') or public.is_admin())
  );

create policy condition_photos_update on storage.objects
  for update to authenticated
  using (
    bucket_id = 'unit-condition-photos'
    and (public.has_mark('encargado_general') or public.is_admin())
  )
  with check (
    bucket_id = 'unit-condition-photos'
    and (public.has_mark('encargado_general') or public.is_admin())
  );
