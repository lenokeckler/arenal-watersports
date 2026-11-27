drop policy if exists damage_insert on public.damage_reports;

revoke insert on public.damage_reports from authenticated, anon;
