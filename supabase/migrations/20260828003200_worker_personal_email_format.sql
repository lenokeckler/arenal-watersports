alter table workers
  add constraint workers_personal_email_format
  check (
    personal_email is null
    or (
      personal_email = lower(btrim(personal_email))
      and char_length(personal_email) <= 254
      and char_length(split_part(personal_email, '@', 1)) <= 64
      and personal_email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
    )
  ) not valid;

alter table workers validate constraint workers_personal_email_format;
