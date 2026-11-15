begin;
select plan(3);
\ir fixtures/reservation_charge.sql.fixture

create function public.refuse_colon_charge() returns trigger language plpgsql as $$
begin
  if new.currency = 'CRC' then
    raise exception 'Colon charge refused';
  end if;
  return new;
end;
$$;

create trigger refuse_colon_charge before insert on public.reservation_charges
  for each row execute function public.refuse_colon_charge();

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":50},{"currency":"CRC","amount":20000}]'::jsonb)),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":70},{"currency":"CRC","amount":20000}]'::jsonb)) $$,
  'P0001', 'Colon charge refused', 'a second part that fails after the first is written raises'
);

reset role;
drop trigger refuse_colon_charge on public.reservation_charges;

select results_eq(
  $$ select (select count(*) from reservation_charges
             where reservation_id in ('e2c20000-0000-4000-8000-000000000309', 'e2c20000-0000-4000-8000-000000000305')),
            (select count(*) from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000309') $$,
  $$ values (0::bigint, 0::bigint) $$,
  'the failed mixed charge leaves no charge and no pricing row behind'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000305' $$,
  $$ values (100::numeric, 50000::numeric, 80::numeric, null::numeric) $$,
  'the failed mixed charge leaves the existing pricing row unchanged'
);

select * from finish();
rollback;
