alter table deposits  drop constraint deposits_amount_check,  add constraint deposits_amount_check check (amount > 0 and amount <> 'NaN');
