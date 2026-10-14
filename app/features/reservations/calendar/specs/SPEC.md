# US-RES-01 — Calendar views

## Intent

La persona de Reservas puede escoger el nivel de detalle del calendario según la tarea que realiza.

## In scope

- Vistas diaria, semanal, mensual y anual para Reservas.
- Preferencia de vista guardada en el dispositivo según RNF-052.
- Política pura que ofrece a Operaciones únicamente las vistas diaria y semanal.

## Out of scope

- Rutas experimentales o previews con políticas de trabajo simuladas.
- Autenticación, autorización y selección del área activa, dependientes de US-ACC-11 y US-TAB-07.
- Carga de reservas y contenido de calendario.

## Requirements

- La selección de vista modifica el periodo mostrado y persiste localmente.
- Las vistas diaria y semanal respetan las reglas civiles de calendario y la hora de Costa Rica (RNF-050 y RNF-051).
- Reservas dispone de día, semana, mes y año.
- Operaciones dispone de día y semana cuando la integración proporcione un área activa verificada.

## Edge cases & errors

- Una preferencia guardada inválida o restringida cae en día sin sobrescribir el valor hasta que se escoja una vista disponible.
- Si el almacenamiento local falla, la interacción sigue disponible y se informa el error en español.
- Fechas civiles inválidas y periodos fuera de límites se rechazan.

## Constraints

- La feature y sus componentes, hooks, modelos, servicios, estado, estilos, utilidades y pruebas viven bajo `app/features/reservations/calendar/`.
- La política de áreas no autentica ni autoriza.
- La ruta espera la migración de `app/(roles)/reservas/` al árbol de rutas definido por `route-structure`.
- Skills: component-architecture, route-structure, redux-store-architecture, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [x] La vista se escoge según lo que se esté haciendo.
- [ ] Operaciones ve solamente el día y la semana, porque en la playa no hace falta más. La política pura está lista; falta integrarla con el área activa autenticada de US-ACC-11 y US-TAB-07.
