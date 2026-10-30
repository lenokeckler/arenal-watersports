grant delete on equipment_categories to authenticated;

create policy categories_delete on equipment_categories
  for delete to authenticated
  using (is_admin());
