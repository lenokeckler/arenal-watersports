create policy worker_marks_select_guides on worker_marks
  for select to authenticated
  using (
    (has_area('reservas') or has_area('operaciones'))
    and mark = 'guia'
  );

create policy workers_select_guides on workers
  for select to authenticated
  using (
    (has_area('reservas') or has_area('operaciones'))
    and exists (
      select 1 from worker_marks wm
      where wm.worker_id = workers.id and wm.mark = 'guia'
    )
  );
