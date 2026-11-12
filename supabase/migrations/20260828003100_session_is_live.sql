create function public.session_is_live() returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when auth.jwt() ->> 'session_id' is null then true
    else exists (
      select 1
      from auth.sessions s
      where s.id = (
          select case
            when pg_catalog.pg_input_is_valid(auth.jwt() ->> 'session_id', 'uuid')
              then (auth.jwt() ->> 'session_id')::uuid
          end
        )
        and s.user_id = auth.uid()
        and (s.not_after is null or s.not_after > now())
    )
  end;
$$;

revoke execute on function public.session_is_live() from public, anon, authenticated;
