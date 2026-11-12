alter policy categories_select on public.equipment_categories
  using (
    public.has_area('operaciones')
    or public.has_area('reservas')
    or public.is_admin()
  );

alter policy stock_select on public.equipment_stock
  using (
    public.has_area('operaciones')
    or public.has_area('reservas')
    or public.is_admin()
  );
