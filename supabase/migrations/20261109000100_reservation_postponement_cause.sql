create type reservation_postponement_cause as enum ('heavy_rain', 'storm', 'other');

alter table reservation_postponements
  add column cause reservation_postponement_cause,
  add column was_dispatched boolean;

update reservation_postponements
   set cause = 'other',
       was_dispatched = false;

alter table reservation_postponements
  alter column cause set not null,
  alter column was_dispatched set not null,
  alter column reason drop not null;

alter table reservation_postponements
  add constraint reservation_postponements_other_needs_reason
    check (cause <> 'other' or length(btrim(coalesce(reason, ''))) > 0) not valid,
  add constraint reservation_postponements_weather_has_no_reason
    check (cause = 'other' or reason is null) not valid,
  add constraint reservation_postponements_reason_length
    check (reason is null or char_length(reason) <= 300) not valid,
  add constraint reservation_postponements_dispatched_is_weather
    check (not was_dispatched or cause <> 'other');
