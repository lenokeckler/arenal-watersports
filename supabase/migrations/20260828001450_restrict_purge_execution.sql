revoke execute on function purge_expired_history() from public;
revoke execute on function purge_expired_history() from anon;
revoke execute on function purge_expired_history() from authenticated;
grant execute on function purge_expired_history() to service_role;
