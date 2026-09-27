alter table reservations
  add constraint reservations_split_child_no_charge
  check (
    parent_reservation_id is null
    or (list_amount_usd is null and list_amount_crc is null
        and agreed_amount_usd is null and agreed_amount_crc is null)
  );
