drop policy if exists stock_movements_select on public.equipment_stock_movements;
create policy stock_movements_select on public.equipment_stock_movements
  for select to authenticated
  using (has_area('operaciones') or is_admin());

drop policy if exists damage_select on public.damage_reports;
create policy damage_select on public.damage_reports
  for select to authenticated
  using (has_area('operaciones') or is_admin());

drop policy if exists maintenance_select on public.maintenance_records;
create policy maintenance_select on public.maintenance_records
  for select to authenticated
  using (has_area('operaciones') or is_admin());

drop policy if exists counts_select on public.inventory_counts;
create policy counts_select on public.inventory_counts
  for select to authenticated
  using (has_area('operaciones') or is_admin());

drop policy if exists count_lines_select on public.inventory_count_lines;
create policy count_lines_select on public.inventory_count_lines
  for select to authenticated
  using (has_area('operaciones') or is_admin());

drop policy if exists photos_insert on public.unit_condition_photos;
create policy photos_insert on public.unit_condition_photos
  for insert to authenticated
  with check (
    (has_area('operaciones') and has_mark('encargado_general'))
    or is_admin()
  );

drop policy if exists photos_update on public.unit_condition_photos;
create policy photos_update on public.unit_condition_photos
  for update to authenticated
  using (
    (has_area('operaciones') and has_mark('encargado_general'))
    or is_admin()
  )
  with check (
    (has_area('operaciones') and has_mark('encargado_general'))
    or is_admin()
  );

drop policy if exists condition_photos_insert on storage.objects;
create policy condition_photos_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'unit-condition-photos'
    and (
      (public.has_area('operaciones') and public.has_mark('encargado_general'))
      or public.is_admin()
    )
  );

drop policy if exists condition_photos_update on storage.objects;
create policy condition_photos_update on storage.objects
  for update to authenticated
  using (
    bucket_id = 'unit-condition-photos'
    and (
      (public.has_area('operaciones') and public.has_mark('encargado_general'))
      or public.is_admin()
    )
  )
  with check (
    bucket_id = 'unit-condition-photos'
    and (
      (public.has_area('operaciones') and public.has_mark('encargado_general'))
      or public.is_admin()
    )
  );
