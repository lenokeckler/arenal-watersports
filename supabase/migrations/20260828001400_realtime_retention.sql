alter publication supabase_realtime add table reservations;
alter publication supabase_realtime add table reservation_items;
alter publication supabase_realtime add table equipment_units;
alter publication supabase_realtime add table equipment_stock;

create extension if not exists pg_cron with schema extensions;

create function purge_expired_history() returns void
language plpgsql security definer set search_path = public as $$
declare
  reservation_cutoff timestamptz := now() - interval '5 years';
  count_cutoff       timestamptz := now() - interval '1 year';
  expired            uuid[];
begin
  select array_agg(id) into expired
  from reservations
  where status in ('closed', 'cancelled')
    and ends_at < reservation_cutoff;

  if expired is not null then

    update damage_reports set reservation_id = null
      where reservation_id = any(expired);

    update reservations set parent_reservation_id = null
      where parent_reservation_id = any(expired)
        and not (id = any(expired));

    delete from reservation_charges where reservation_id = any(expired);
    delete from refunds             where reservation_id = any(expired);
    delete from deposits            where reservation_id = any(expired);
    delete from reservation_guides  where reservation_id = any(expired);
    delete from reservation_items   where reservation_id = any(expired);
    delete from reservations        where id = any(expired);
  end if;

  delete from inventory_counts where counted_at < count_cutoff;
end $$;

select cron.schedule(
  'purge-expired-history',
  '0 3 1 * *',
  $$ select purge_expired_history(); $$
);
