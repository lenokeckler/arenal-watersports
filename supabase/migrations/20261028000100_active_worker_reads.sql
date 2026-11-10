create function public.is_active_worker() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.workers w
    where w.id = auth.uid()
      and w.status = 'active'
      and w.deleted_at is null
      and (w.expires_at is null or w.expires_at > now())
      and coalesce((auth.jwt() ->> 'must_change_password')::boolean, false) = false
      and public.session_is_live()
  );
$$;

revoke execute on function public.is_active_worker() from public, anon;
grant execute on function public.is_active_worker() to authenticated;

alter policy categories_select on public.equipment_categories using (public.is_active_worker());
alter policy units_select on public.equipment_units using (public.is_active_worker());
alter policy stock_select on public.equipment_stock using (public.is_active_worker());
alter policy stock_movements_select on public.equipment_stock_movements using (public.is_active_worker());
alter policy photos_select on public.unit_condition_photos using (public.is_active_worker());
alter policy damage_select on public.damage_reports using (public.is_active_worker());
alter policy maintenance_select on public.maintenance_records using (public.is_active_worker());
alter policy counts_select on public.inventory_counts using (public.is_active_worker());
alter policy count_lines_select on public.inventory_count_lines using (public.is_active_worker());
alter policy tariffs_select on public.tariffs using (public.is_active_worker());
alter policy extras_select on public.extras using (public.is_active_worker());
alter policy extra_compat_select on public.extra_compatibility using (public.is_active_worker());
alter policy combos_select on public.combos using (public.is_active_worker());
alter policy combo_items_select on public.combo_items using (public.is_active_worker());
