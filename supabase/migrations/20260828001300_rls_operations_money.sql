alter table reservations        enable row level security;
alter table reservation_items   enable row level security;
alter table reservation_guides  enable row level security;
alter table extras              enable row level security;
alter table extra_compatibility enable row level security;
alter table combos              enable row level security;
alter table combo_items         enable row level security;
alter table tariffs             enable row level security;
alter table reservation_charges enable row level security;
alter table refunds             enable row level security;
alter table deposits            enable row level security;

create policy tariffs_select on tariffs
  for select to authenticated using (true);
create policy tariffs_insert on tariffs
  for insert to authenticated
  with check (is_admin());
create policy tariffs_update on tariffs
  for update to authenticated
  using (is_admin()) with check (is_admin());

create policy extras_select on extras
  for select to authenticated using (true);
create policy extras_insert on extras
  for insert to authenticated
  with check (is_admin());
create policy extras_update on extras
  for update to authenticated
  using (is_admin()) with check (is_admin());

create policy extra_compat_select on extra_compatibility
  for select to authenticated using (true);
create policy extra_compat_insert on extra_compatibility
  for insert to authenticated
  with check (is_admin());
create policy extra_compat_update on extra_compatibility
  for update to authenticated
  using (is_admin()) with check (is_admin());

create policy combos_select on combos
  for select to authenticated using (true);
create policy combos_insert on combos
  for insert to authenticated
  with check (is_admin());
create policy combos_update on combos
  for update to authenticated
  using (is_admin()) with check (is_admin());

create policy combo_items_select on combo_items
  for select to authenticated using (true);
create policy combo_items_insert on combo_items
  for insert to authenticated
  with check (is_admin());
create policy combo_items_update on combo_items
  for update to authenticated
  using (is_admin()) with check (is_admin());

create policy reservations_select on reservations
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());

create policy reservations_insert on reservations
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

create policy reservations_update on reservations
  for update to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin())
  with check (has_area('reservas') or has_area('operaciones') or is_admin());

create policy items_select on reservation_items
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());
create policy items_insert on reservation_items
  for insert to authenticated
  with check (has_area('reservas') or has_area('operaciones') or is_admin());
create policy items_update on reservation_items
  for update to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin()) with check (has_area('reservas') or has_area('operaciones') or is_admin());

create policy guides_select on reservation_guides
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());
create policy guides_insert on reservation_guides
  for insert to authenticated
  with check (has_area('reservas') or is_admin());
create policy guides_update on reservation_guides
  for update to authenticated
  using (has_area('reservas') or is_admin()) with check (has_area('reservas') or is_admin());

create policy charges_select on reservation_charges
  for select to authenticated using (has_area('reservas') or is_admin());
create policy charges_insert on reservation_charges
  for insert to authenticated with check (has_area('reservas') or is_admin());

create policy refunds_select on refunds
  for select to authenticated using (has_area('reservas') or is_admin());
create policy refunds_insert on refunds
  for insert to authenticated with check (has_area('reservas') or is_admin());

create policy deposits_select on deposits
  for select to authenticated using (has_area('reservas') or is_admin());
create policy deposits_insert on deposits
  for insert to authenticated
  with check (has_area('reservas') or is_admin());
create policy deposits_update on deposits
  for update to authenticated
  using (has_area('reservas') or is_admin()) with check (has_area('reservas') or is_admin());
