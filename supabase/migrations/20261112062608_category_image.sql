alter table equipment_categories add column image_path text;

alter table equipment_categories
  add constraint categories_image_path_prefix
  check (image_path is null or image_path like id::text || '/%');

insert into storage.buckets
  (id, name, public, file_size_limit, allowed_mime_types)
values (
  'category-images',
  'category-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy category_images_select on storage.objects
  for select to authenticated
  using (bucket_id = 'category-images');

create policy category_images_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'category-images' and public.is_admin());

create policy category_images_update on storage.objects
  for update to authenticated
  using (bucket_id = 'category-images' and public.is_admin())
  with check (bucket_id = 'category-images' and public.is_admin());

create policy category_images_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'category-images' and public.is_admin());

create or replace view board_category_summary with (security_invoker = true) as
select
  c.id as category_id,
  c.name as category_name,
  c.group_name,
  coalesce(counts.free_count, 0)::integer as free_count,
  coalesce(counts.in_use_count, 0)::integer as in_use_count,
  coalesce(counts.total_count, 0)::integer as total_count,
  c.image_path as image_path
from equipment_categories c
left join lateral (
  select
    count(*) filter (where s.effective_status = 'available') as free_count,
    count(*) filter (where s.effective_status = 'occupied') as in_use_count,
    count(*) as total_count
  from unit_current_state s
  where s.category_id = c.id
    and s.recorded_status <> 'decommissioned'
) counts on true
where c.is_reservable
  and c.status = 'active'
  and c.tracking_mode = 'by_unit';
