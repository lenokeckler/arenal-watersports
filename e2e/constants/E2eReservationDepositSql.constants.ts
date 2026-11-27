export const E2E_RESERVATION_DEPOSIT_SQL = {
  CLEANUP: `
delete from deposit_declinations
where reservation_id in (select id from reservations where created_by = :'uid');
delete from deposits
where reservation_id in (select id from reservations where created_by = :'uid');`,
  READ: `
with first_deposit as (
  select deposit.amount::text as amount, deposit.currency::text as currency,
    deposit.status::text as status, (deposit.created_by = :'uid')::text as is_author
  from deposits deposit
  where deposit.reservation_id = :'reservation'
  order by deposit.created_at
  limit 1
)
select concat_ws('|',
  (select count(*) from deposits where reservation_id = :'reservation'),
  (select count(*) from deposit_declinations where reservation_id = :'reservation'),
  coalesce(first_deposit.amount, ''),
  coalesce(first_deposit.currency, ''),
  coalesce(first_deposit.status, ''),
  coalesce(first_deposit.is_author, 'false')
)
from (select 1) base
left join first_deposit on true;`,
  SET_CATEGORY_DEPOSIT: `
update equipment_categories
set deposit_usd = nullif(:'usd', '')::numeric, deposit_crc = nullif(:'crc', '')::numeric
where id = (select category_id from equipment_units where code = :'unit');`,
} as const;
