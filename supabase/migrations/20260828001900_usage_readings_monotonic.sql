alter table reservation_items
  add constraint reservation_items_usage_never_goes_back
  check (
    usage_out is null
    or usage_in is null
    or usage_in >= usage_out
  );
