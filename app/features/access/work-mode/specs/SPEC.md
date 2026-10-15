# Work mode selection

Source: US-ACC-11, `docs/proyecto/historias-de-usuario.md`.

## Acceptance criteria

- La pantalla aparece solo si administración le habilitó más de un área a esa cuenta.
- Se presenta un cuadro grande por área: Operaciones, Reservas o Administración.
- Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área, para no mezclar pantallas.
- El modo restringe y nunca otorga: estando en un modo la cuenta no alcanza las funciones de sus otras áreas, aunque las tenga habilitadas.
- Se puede cambiar de modo sin cerrar sesión, desde un control visible en la aplicación.
- La aplicación recuerda el último modo usado y entra directo en ese.
- Quien tiene una sola área entra directo a su módulo y nunca ve esta pantalla.

## Session context boundary

Authenticated RPCs resolve or select a mode for the caller's live auth session.
Worker eligibility, current grants and pending-password state are checked in the database.
Selection atomically confirms the session area, increments its revision and remembers
the area in the existing worker preference. Failure rolls back every change.

A new session uses a currently granted remembered area or its sole available area.
Existing sessions retain their own confirmed mode when another device changes the
worker preference. Revoked modes clear; a sole remaining area is confirmed automatically.
An unresolved session never inherits a later preference from another device.

Clients can read only their own session metadata and cannot write it directly.
Metadata and the discovery grant array are not authorization capabilities.
RPCs lock the worker, session and existing grants while resolving context.

## Pending integration

All acceptance criteria remain partial until application entry and UI integration.
Existing area predicates still use account grants in this initial data increment.
Activation of mode guards, domain server checks, selector tiles, visible switching,
realtime invalidation, authenticated routes and real screenshots remain pending.
US-TAB-07 separately audits business policies, reports, storage and monetary isolation.

Related requirements: RNF-001, RNF-009 through RNF-014 and RNF-048.
Transactional SQL tests cover session identity, eligibility, grant revocation,
session isolation, denied direct writes and atomic preference failure.
