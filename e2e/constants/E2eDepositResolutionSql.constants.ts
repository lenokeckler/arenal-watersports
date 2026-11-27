export const E2E_DEPOSIT_RESOLUTION_SQL = {
  CLEANUP: `
delete from deposits
where reservation_id in (select id from reservations where created_by = :'uid');`,
  READ: `
select concat_ws('|', deposit.status::text, coalesce(deposit.retained_amount::text, ''),
  coalesce(deposit.retention_reason, ''), (deposit.resolved_by = :'uid')::text)
from deposits deposit
where deposit.id = :'deposit';`,
  SEED: `
with inserted as (
  insert into deposits (reservation_id, amount, currency, created_by)
  values (:'reservation', :'amount'::numeric, 'USD', :'uid')
  returning id
)
select id from inserted;`,
} as const;
