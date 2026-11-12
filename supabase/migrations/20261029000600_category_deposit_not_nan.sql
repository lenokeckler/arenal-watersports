update equipment_categories set deposit_usd = null where deposit_usd = 'NaN';

update equipment_categories set deposit_crc = null where deposit_crc = 'NaN';

alter table equipment_categories
  drop constraint categories_deposit_positive,
  add constraint categories_deposit_positive
    check ((deposit_usd is null or (deposit_usd > 0 and deposit_usd <> 'NaN'))
       and (deposit_crc is null or (deposit_crc > 0 and deposit_crc <> 'NaN')));
