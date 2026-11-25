alter table reservation_dispatches
  add column radio_channel smallint,
  add constraint reservation_dispatches_radio_channel_range
    check (radio_channel is null or radio_channel between 1 and 99);
