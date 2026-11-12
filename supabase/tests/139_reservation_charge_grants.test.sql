begin;
select plan(3);

select is(
  (select count(*) from (values
     ('private.reservation_catalog_amounts(uuid)'),
     ('public.reservation_charge_proposal(uuid)'),
     ('public.record_reservation_charge(jsonb)'),
     ('private.parse_reservation_charge_currency(text)'),
     ('private.parse_reservation_charge_amount(numeric, currency_code)'),
     ('private.normalize_reservation_charge_payment_method(text)'),
     ('private.assert_reservation_chargeable(reservations)'),
     ('private.record_reservation_charge_pricing(uuid, currency_code, numeric, numeric)')
   ) as fns(signature)
   where has_function_privilege('anon', fns.signature, 'execute')),
  0::bigint,
  'anon cannot execute any charge function'
);

select is(
  (select count(*) from (values
     ('private.reservation_catalog_amounts(uuid)'),
     ('public.reservation_charge_proposal(uuid)'),
     ('public.record_reservation_charge(jsonb)'),
     ('private.parse_reservation_charge_currency(text)'),
     ('private.parse_reservation_charge_amount(numeric, currency_code)'),
     ('private.normalize_reservation_charge_payment_method(text)'),
     ('private.assert_reservation_chargeable(reservations)'),
     ('private.record_reservation_charge_pricing(uuid, currency_code, numeric, numeric)')
   ) as fns(signature)
   where has_function_privilege('authenticated', fns.signature, 'execute')),
  8::bigint,
  'authenticated can execute every charge function'
);

select is(
  (select count(*) from pg_proc proc
   join pg_namespace ns on ns.oid = proc.pronamespace
   where ns.nspname = 'public'
     and proc.proname in (
       'reservation_catalog_amounts', 'parse_reservation_charge_currency',
       'parse_reservation_charge_amount', 'normalize_reservation_charge_payment_method',
       'assert_reservation_chargeable', 'record_reservation_charge_pricing')),
  0::bigint,
  'the helpers live in the private schema only'
);

select * from finish();
rollback;
