alter table damage_reports
  add column detail_pending boolean not null default false,
  add column completed_by uuid references workers (id),
  add column completed_at timestamptz,
  alter column cause drop not null,
  alter column description drop not null,
  add constraint damage_reports_detail_complete
    check (detail_pending or (cause is not null and description is not null));

create index damage_reports_pending_detail
  on damage_reports (created_at desc)
  where detail_pending;
