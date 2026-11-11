export const E2E_SESSION_ACTIVITY_SQL = {
  SET_AGE: `insert into public.session_activity (session_id, user_id, last_activity_at)
select id, user_id, now() - :'age'::interval from auth.sessions where user_id = :'uid'
on conflict (session_id) do update set last_activity_at = excluded.last_activity_at`,
  SECONDS_SINCE_LAST: `select coalesce(min(extract(epoch from now() - last_activity_at))::int, -1)
from public.session_activity where user_id = :'uid'`,
  AGE_VARIABLE: "age",
} as const;

export const E2E_SESSION_ACTIVITY_AGE = {
  PAST_ANY_NIGHT: "1 day",
  INSIDE_THE_LIMIT: "10 minutes",
} as const;

export const E2E_SESSION_ACTIVITY_MAX_SECONDS_AFTER_TAP = 60;

export const E2E_SESSION_ACTIVITY_ERROR = {
  SET_OPERATION: "set the session activity age",
  READ_OPERATION: "read the seconds since the last action",
  NOT_AN_INTEGER: (output: string): string =>
    `the seconds since the last action were not an integer: ${output}`,
} as const;
