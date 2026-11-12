# External guide registration

## Intent

Allow a reservations worker with the administrator-granted mark to register a temporary external guide account for operations.

## Acceptance criteria

- Solo puede hacerlo quien tenga la marca que administración otorga para esto. Sin la marca la opción no aparece.
- Se guardan su nombre y su cédula, nada más.
- La cuenta lleva rol de operaciones y marca de guía, porque el guía externo hace el mismo trabajo.
- La fecha de caducidad es obligatoria.
- Cumplida esa fecha la cuenta queda inhabilitada, no entra más al sistema y no se le puede asignar un tour nuevo.
- El nombre de usuario es la cédula, porque ya está registrada, es única y alguien que viene una semana no va a recordar un usuario inventado.
- El sistema genera una contraseña temporal de un solo uso, igual que cuando administración crea a un trabajador de planta.
- El guía externo cambia esa contraseña en su primer ingreso.
- El correo personal es opcional para el guía externo.
- Reservas puede crear únicamente este tipo de cuenta: no crea trabajadores de planta, no crea cuentas de administración y no cambia roles.
- La cuenta queda registrada a nombre de quien la creó y se identifica como guía externo.

## Scope

The registration screen collects a name, national ID, expiration date, and optional personal email. The service fixes the account role and marks and returns a temporary password shown once. The calendar entry and route require the registration mark.

## Boundaries

Guide assignment and guide lookup are covered by their own stories. Expiration uses the end of the selected date in Costa Rica time.
