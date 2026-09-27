create type combo_audience as enum ('national', 'foreign');

alter table combos
  add column audience combo_audience;

update combos
   set audience = case
     when package_price_crc is not null then 'national'
     else 'foreign'
   end::combo_audience;

alter table combos
  alter column audience set not null;

alter table combos drop constraint combos_name_key;
alter table combos
  add constraint combos_name_per_audience_key unique (name, audience);

alter table combos
  add constraint combos_price_matches_audience
  check (
    (audience = 'national'
      and package_price_crc is not null
      and package_price_usd is null)
    or
    (audience = 'foreign'
      and package_price_usd is not null
      and package_price_crc is null)
  );
