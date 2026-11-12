import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { runWorkerSql } from "./runWorkerSql";

const RESERVATION_CLEANUP_OPERATION =
  "remove reservations created by the E2E worker";

const RESERVATION_CLEANUP_QUERY = `
begin;
create temporary table e2e_reservation_cleanup_ids on commit drop as
select id from reservations where created_by = :'uid';
delete from reservation_items
where reservation_id in (select id from e2e_reservation_cleanup_ids);
delete from reservations
where id in (select id from e2e_reservation_cleanup_ids);
commit;
`;

export const removeReservationsForWorker = (
  activeWorker: ActiveWorker
): Promise<string> =>
  runWorkerSql(
    RESERVATION_CLEANUP_OPERATION,
    RESERVATION_CLEANUP_QUERY,
    activeWorker.id
  );
