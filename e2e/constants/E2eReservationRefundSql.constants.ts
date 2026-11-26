export const E2E_RESERVATION_REFUND_SQL = {
  CLEANUP: `
delete from refunds
where reservation_id in (select id from reservations where created_by = :'uid');`,
  READ: `
with first_refund as (
  select refund.amount::text as amount, refund.currency::text as currency, refund.reason,
    (refund.created_by = :'uid')::text as is_author, worker.full_name
  from refunds refund
  join workers worker on worker.id = refund.created_by
  where refund.reservation_id = :'reservation'
  order by refund.created_at
  limit 1
)
select concat_ws('|',
  (select count(*) from refunds where reservation_id = :'reservation'),
  coalesce(first_refund.amount, ''),
  coalesce(first_refund.currency, ''),
  coalesce(first_refund.reason, ''),
  coalesce(first_refund.is_author, 'false'),
  coalesce(first_refund.full_name, '')
)
from (select 1) base
left join first_refund on true;`,
} as const;
