alter table combos
  add constraint combos_package_price_positive
  check (
    (package_price_usd is null or package_price_usd > 0)
    and (package_price_crc is null or package_price_crc > 0)
  );
