alter table refunds
  drop constraint refunds_percentage_check,
  drop column percentage;
