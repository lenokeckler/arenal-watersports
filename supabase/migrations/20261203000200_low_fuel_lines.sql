alter table equipment_categories
  add column low_fuel_lines smallint not null default 1,
  add constraint equipment_categories_low_fuel_lines_positive check (low_fuel_lines >= 1);

alter table equipment_units
  add column low_fuel_lines smallint,
  add constraint equipment_units_low_fuel_lines_positive
    check (low_fuel_lines is null or low_fuel_lines >= 1);

create function assert_unit_low_fuel_within_gauge() returns trigger
language plpgsql set search_path = public
as $$
declare
  v_category_threshold smallint;
begin
  select low_fuel_lines into v_category_threshold
  from equipment_categories
  where id = new.category_id;

  if coalesce(new.low_fuel_lines, v_category_threshold) > new.fuel_max then
    raise exception 'The low fuel warning cannot exceed the lines of the gauge'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

create trigger equipment_units_low_fuel_within_gauge
  before insert or update of fuel_max, low_fuel_lines, category_id on equipment_units
  for each row execute function assert_unit_low_fuel_within_gauge();

create function assert_category_low_fuel_within_units() returns trigger
language plpgsql set search_path = public
as $$
begin
  if exists (
    select 1
    from equipment_units u
    where u.category_id = new.id
      and u.low_fuel_lines is null
      and u.status <> 'decommissioned'
      and u.fuel_max < new.low_fuel_lines
  ) then
    raise exception 'The low fuel warning cannot exceed the lines of the gauge'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

create trigger equipment_categories_low_fuel_within_units
  before update of low_fuel_lines on equipment_categories
  for each row execute function assert_category_low_fuel_within_units();
