<!-- Documento vivo. Nació de Historias_de_Usuario_Completo.docx; el original entregado se guarda fuera del repositorio. Desde entonces se corrigió contra lo que se construyó: ese .docx ya no es la fuente de verdad, este archivo sí. -->

# Historias de Usuario

Sistema interno de operaciones para Arenal Water Sports. Este documento recoge las historias de usuario que salen del documento Flujo del Proyecto, en el mismo orden: primero el acceso, después las pantallas comunes y después cada rol hacia adentro. Cada historia lleva su identificador, la frase de la historia, una descripción del flujo y sus criterios de aceptación. Los requisitos no funcionales van al final, en su propia sección, porque aplican a todas las historias.

## Alcance

| Módulo               | Epics  | Historias | Rango                 |
| -------------------- | ------ | --------- | --------------------- |
| Acceso y Sesión      | 2      | 11        | US-ACC-01 a US-ACC-11 |
| Tablero y Navegación | 6      | 12        | US-TAB-01 a US-TAB-12 |
| Administración       | 6      | 31        | US-ADM-01 a US-ADM-31 |
| Reservas             | 7      | 33        | US-RES-01 a US-RES-33 |
| Operaciones          | 4      | 27        | US-OPE-01 a US-OPE-27 |
| **Total**            | **25** | **114**   |                       |

A los requisitos no funcionales se suman 52, numerados RNF-001 a RNF-052.

### Qué cambió respecto del backlog original

El documento entregado al inicio del curso traía 111 historias. Las tres que se agregaron después salieron de usar la aplicación y son requisitos que el dueño pidió al ver las pantallas, no invenciones del equipo:

| Historia                                             | De dónde salió                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| US-TAB-10 — Consulta de precios desde operaciones    | Diseño del modelo de datos, 2026-08-28. En el muelle preguntan el precio a diario y operaciones no lo tenía. |
| US-TAB-11 — Tema claro para trabajar al sol          | Pruebas en teléfono, 2026-09-01. El tema oscuro no se lee bajo sol directo.                                  |
| US-TAB-12 — Distribución del tablero por dispositivo | Sesión del tablero, 2026-09-07. Cada quien entra a una categoría distinta.                                   |

Además, varias historias cambiaron de regla al construirse. Las correcciones están aplicadas dentro de cada historia y explicadas en el anexo, bajo **Decisiones tomadas durante la construcción**. La de mayor alcance es que **se reserva la categoría y no la unidad**, que corrigió US-RES-07.

## Módulo Acceso y Sesión

Rol: todos los trabajadores. Es la puerta de entrada al sistema. Cada persona entra con su propio usuario, y lo que ve y lo que puede hacer después depende de su rol y del modo con el que trabaje.

### EP-ACC-01 — Ingreso al sistema

#### US-ACC-01 — Ingreso al sistema

**ID:** US-ACC-01

**Nombre de la historia:** Ingreso al sistema

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito ingresar al sistema con mi usuario y mi contraseña,  
con la finalidad de llegar a las pantallas que me corresponden según mi rol.

**Descripción:**

El trabajador abre la aplicación y encuentra el formulario de ingreso con su nombre de usuario y su contraseña. Un ojito permite ver la contraseña mientras se digita, porque en la playa se teclea con las manos mojadas y el error es fácil. Si algo falla, el mensaje aparece en rojo junto al campo que lo provoca.

**Criterios de aceptación:**

- Ingreso por nombre de usuario y contraseña.
- Ojito para ver u ocultar la contraseña.
- Los errores se muestran en mensajes rojos junto al campo que los provoca.
- Autenticación resuelta con Supabase.

---

#### US-ACC-02 — Control de errores del ingreso

**ID:** US-ACC-02

**Nombre de la historia:** Control de errores del ingreso

**Historia de usuario:**

Como un trabajador que no logra entrar,  
necesito recibir un mensaje que explique por qué,  
con la finalidad de saber si me equivoqué de contraseña o si mi cuenta tiene un problema.

**Descripción:**

Cada motivo de rechazo tiene su propio mensaje, para que la persona sepa si vuelve a intentar o si tiene que buscar a administración. Los mensajes nunca revelan cuáles nombres de usuario existen en el sistema.

**Criterios de aceptación:**

- Usuario no registrado.
- Contraseña incorrecta.
- Cuenta bloqueada por intentos fallidos.
- Cuenta bloqueada por administración.
- Sesión cerrada por inactividad.
- El mensaje nunca revela cuáles nombres de usuario existen en el sistema.

---

#### US-ACC-03 — Cambio de contraseña en el primer ingreso

**ID:** US-ACC-03

**Nombre de la historia:** Cambio de contraseña en el primer ingreso

**Historia de usuario:**

Como un trabajador que entra por primera vez,  
necesito cambiar la contraseña temporal que me dieron,  
con la finalidad de que nadie más conozca la clave con la que entro al sistema.

**Descripción:**

Administración crea la cuenta con una contraseña temporal de un solo uso. La primera vez que la persona ingresa, el sistema la detiene antes de cualquier pantalla y le pide confirmar la temporal, escribir la nueva y repetirla. Hasta que no lo complete no avanza a ningún lado.

**Criterios de aceptación:**

- El sistema verifica si es el primer ingreso de esa cuenta.
- Se confirma la contraseña temporal, se escribe la nueva y se repite.
- No se avanza a ninguna pantalla del sistema hasta completarlo.
- La contraseña nueva cumple los requisitos de seguridad.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.

---

#### US-ACC-04 — Cambio de contraseña por decisión propia

**ID:** US-ACC-04

**Nombre de la historia:** Cambio de contraseña por decisión propia

**Historia de usuario:**

Como un trabajador con cuenta activa,  
necesito cambiar mi contraseña cuando yo lo decida,  
con la finalidad de reponerla si creo que alguien más la conoce.

**Descripción:**

Desde su perfil el trabajador confirma la contraseña actual, escribe la nueva y la repite. La nueva cumple los mismos requisitos de seguridad que se exigen al crearla.

**Criterios de aceptación:**

- Se confirma la actual, se escribe la nueva y se repite.
- La contraseña nueva cumple los requisitos de seguridad.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.

---

#### US-ACC-05 — Registro del correo personal

**ID:** US-ACC-05

**Nombre de la historia:** Registro del correo personal

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito registrar mi correo personal en mi cuenta,  
con la finalidad de poder recuperar mi contraseña sin depender de que alguien me la reponga.

**Descripción:**

La empresa no le da correo institucional a nadie, así que cada trabajador registra el suyo. Ese correo es el único destino al que el sistema envía el PIN de recuperación. En la cuenta de administración el correo es obligatorio; en las demás es opcional.

**Criterios de aceptación:**

- La empresa no da correo propio, así que cada trabajador registra el suyo.
- Es el correo al que llega el PIN de recuperación.

---

#### US-ACC-06 — Recuperación de contraseña con PIN

**ID:** US-ACC-06

**Nombre de la historia:** Recuperación de contraseña con PIN

**Historia de usuario:**

Como un trabajador que olvidó su contraseña,  
necesito recuperarla con un PIN que llegue a mi correo personal,  
con la finalidad de volver a entrar sin tener que esperar a que alguien me atienda.

**Descripción:**

El trabajador pide recuperar su contraseña y el sistema envía un PIN de un solo uso al correo personal registrado en la cuenta. Se escribe el PIN en pantalla, después la contraseña nueva, y se repite. Se escogió el PIN sobre el enlace porque en el celular funciona mejor. Si la cuenta no tiene correo registrado, administración le genera una contraseña temporal.

**Criterios de aceptación:**

- El sistema envía un PIN al correo personal registrado en la cuenta.
- Se escribe el PIN en pantalla, después la contraseña nueva, y se repite.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.
- El PIN es de un solo uso y vence a los pocos minutos.
- Si la cuenta no tiene correo registrado, administración genera una contraseña temporal.
- No hay inicio de sesión con Google ni con ningún otro proveedor: el ingreso es siempre por usuario y contraseña.

---

#### US-ACC-07 — Recuperación de la cuenta de administración

**ID:** US-ACC-07

**Nombre de la historia:** Recuperación de la cuenta de administración

**Historia de usuario:**

Como la persona de administración,  
necesito poder recuperar mi contraseña por mi cuenta,  
con la finalidad de no quedarme encerrada fuera del sistema, porque no hay otra cuenta que me desbloquee.

**Descripción:**

El sistema tiene una sola cuenta de administración, así que no puede depender de nadie para volver a entrar. Por eso esa cuenta nunca se bloquea: cuando olvida la clave, o cuando pasa de diez intentos, el sistema le ofrece el proceso de recuperación en vez de cerrarle la puerta. Al terminar el cambio, el contador de intentos vuelve a cero.

**Criterios de aceptación:**

- Aplica cuando olvido la clave y cuando paso de diez intentos de ingreso.
- La cuenta de administración no se bloquea: pasados los diez intentos el sistema ofrece el proceso de recuperación.
- El PIN llega al correo personal de la cuenta de administración, que por eso es obligatorio.
- Al terminar el cambio, el contador de intentos vuelve a cero.
- Es la única salida de la cuenta de administración, porque no hay otra cuenta que la desbloquee.

---

#### US-ACC-08 — Cierre de sesión

**ID:** US-ACC-08

**Nombre de la historia:** Cierre de sesión

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito cerrar mi sesión desde cualquier pantalla,  
con la finalidad de dejar el dispositivo libre cuando se lo paso a un compañero.

**Descripción:**

La opción de salir está disponible en todo momento. Al usarla, el sistema descarta el token de la sesión y devuelve al formulario de ingreso.

**Criterios de aceptación:**

- El sistema descarta el token y devuelve al login.

**Validaciones del ingreso:**

- La contraseña exige mayúscula, minúscula, número y símbolo, con largo mínimo y largo máximo.
- La cuenta de un trabajador se bloquea al llegar a diez intentos fallidos seguidos, y solo administración la desbloquea.
- La cuenta de administración no se bloquea: pasados los diez intentos entra al proceso de recuperación.
- El correo personal es obligatorio en la cuenta de administración y opcional en las demás.
- Nadie digita la contraseña de otro usuario: administración solo genera temporales de un solo uso.
- El nombre de usuario es único en todo el sistema.

### EP-ACC-02 — Sesión y modo de trabajo

#### US-ACC-09 — Sesión abierta durante la jornada

**ID:** US-ACC-09

**Nombre de la historia:** Sesión abierta durante la jornada

**Historia de usuario:**

Como un trabajador que está en el campo,  
necesito que mi sesión siga abierta durante toda la jornada,  
con la finalidad de no escribir mi contraseña cada vez que despacho un equipo.

**Descripción:**

Entre las siete de la mañana y las siete de la noche la sesión no caduca por inactividad. Quien entró a las nueve sigue adentro hasta las siete, aunque pasen horas sin tocar la aplicación. La razón es práctica: el trabajo es de campo y escribir una contraseña con mayúsculas, números y símbolos con las manos mojadas frena la operación.

**Criterios de aceptación:**

- De 7:00 a. m. a 7:00 p. m. la sesión no caduca por inactividad.
- Quien entra a las 9:00 a. m. sigue dentro hasta las 7:00 p. m. sin volver a escribir su contraseña.
- La razón es que el trabajo es de campo y escribir una contraseña con las manos mojadas frena la operación.

---

#### US-ACC-10 — Cierre de sesión por inactividad fuera de horario

**ID:** US-ACC-10

**Nombre de la historia:** Cierre de sesión por inactividad fuera de horario

**Historia de usuario:**

Como la empresa,  
necesito que la sesión se cierre sola cuando queda inactiva fuera del horario de trabajo,  
con la finalidad de que un teléfono olvidado en el muelle no quede abierto toda la noche.

**Descripción:**

De siete de la noche a siete de la mañana aplican treinta minutos seguidos de inactividad. El contador corre desde la última acción en pantalla y cada acción lo reinicia, de modo que quien esté trabajando de noche no se ve afectado. De día el contador no corre: quien quedó quieto desde la tarde empieza a contar a las siete de la noche. Dos minutos antes del cierre aparece un aviso con la cuenta regresiva y dos botones, Seguir trabajando y Cerrar sesión; si nadie responde, la sesión se cierra y el motivo aparece en el login. La franja horaria y el tiempo que queda se calculan en el servidor, porque si se leyeran del reloj del dispositivo bastaría con cambiarle la hora al teléfono para nunca salir.

**Criterios de aceptación:**

- De 7:00 p. m. a 7:00 a. m. aplican treinta minutos seguidos sin actividad.
- El contador corre desde la última acción en pantalla y cada acción lo reinicia.
- A los veintiocho minutos aparece un aviso con la cuenta regresiva y dos botones: Seguir trabajando, que reinicia el contador, y Cerrar sesión.
- Si nadie responde, a los treinta minutos la sesión se cierra y el mensaje de inactividad aparece en el login.
- De día el contador no corre: quien lleva rato sin actividad al llegar las 7:00 p. m. empieza a contar desde esa hora, con el aviso a las 7:28 p. m. y el cierre a las 7:30 p. m.
- Si antes de las 7:00 a. m. no se completan treinta minutos sin actividad, la sesión sigue abierta durante el día y la cuenta vuelve a empezar a las 7:00 p. m.
- Quien esté trabajando de noche sigue dentro mientras siga usando la aplicación.
- La franja horaria y el tiempo que queda se calculan en el servidor y no con el reloj del dispositivo.

---

#### US-ACC-11 — Selección del modo de trabajo

**ID:** US-ACC-11

**Nombre de la historia:** Selección del modo de trabajo

**Historia de usuario:**

Como un trabajador con más de un área habilitada,  
necesito escoger el modo con el que voy a trabajar al entrar,  
con la finalidad de no mezclar en una misma pantalla las funciones de dos áreas distintas.

**Descripción:**

Hay personas que unos días atienden reservas y otros días despachan en la playa. A esas cuentas administración les habilita las dos áreas, y al entrar el sistema les presenta un cuadro grande por área para que escojan. Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área. El cambio de modo está siempre a mano y no obliga a cerrar sesión. Quien tiene una sola área nunca ve esta pantalla.

**Criterios de aceptación:**

- La pantalla aparece solo si administración le habilitó más de un área a esa cuenta.
- Se presenta un cuadro grande por área: Operaciones, Reservas o Administración.
- Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área, para no mezclar pantallas.
- El modo restringe y nunca otorga: estando en un modo la cuenta no alcanza las funciones de sus otras áreas, aunque las tenga habilitadas.
- Se puede cambiar de modo sin cerrar sesión, desde un control visible en la aplicación.
- La aplicación recuerda el último modo usado y entra directo en ese.
- Quien tiene una sola área entra directo a su módulo y nunca ve esta pantalla.

## Módulo Tablero y Navegación

Rol: todos los trabajadores. Es lo que ve cualquier persona apenas entra, sin importar su rol. El contenido cambia según el rol y el modo activo, pero la forma de moverse es la misma para todos.

### EP-TAB-01 — Tablero de equipo

#### US-TAB-01 — Tablero de equipo disponible

**ID:** US-TAB-01

**Nombre de la historia:** Tablero de equipo disponible

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito ver el tablero con el equipo y cuánto hay libre apenas entro,  
con la finalidad de saber de un vistazo qué se puede alquilar en este momento.

**Descripción:**

El tablero es la pantalla de entrada. Muestra una tarjeta por cada categoría reservable del inventario, con cuántas unidades hay libres y cuántas están en uso sobre el total. Saber cuántas quedan no basta: en el muelle la pregunta es también cuánto hay en el agua. Es desde donde se escoge el equipo para una reserva. Los chalecos, los remos y los extintores no salen aquí: viven en el inventario, que es otra pantalla y sirve para contar, no para agendar.

**Criterios de aceptación:**

- Se muestra una tarjeta por cada categoría reservable del inventario.
- Cada tarjeta indica cuántas unidades hay libres y cuántas en uso sobre el total.
- Una unidad despachada nunca cuenta como libre, aunque la hora real de regreso de su salida ya haya vencido. Libres más en uso nunca supera el total.
- Las categorías que administración agrupó se muestran como una sola tarjeta, con los totales sumados y sin fusionarse por dentro.
- En pantalla de celular las tarjetas van de dos en dos, para no obligar a bajar media pantalla por categoría.
- Es la vista que responde de un vistazo qué hay disponible en este momento, y desde donde se escoge el equipo para una reserva.
- Los chalecos, los remos y los extintores no salen aquí: viven en el inventario, que es otra pantalla y sirve para contar, no para agendar.

---

#### US-TAB-02 — Estado de las unidades de una categoría

**ID:** US-TAB-02

**Nombre de la historia:** Estado de las unidades de una categoría

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito entrar a una categoría y ver el estado de cada unidad,  
con la finalidad de saber cuál está libre y a qué hora vuelve la que está afuera.

**Descripción:**

Al abrir una categoría se listan sus unidades con su código y su estado: disponible, ocupada, en mantenimiento o dañada. Cuando está ocupada se muestra la hora a la que regresa, a qué reserva pertenece y quién la lleva, y desde ahí se abre el detalle de la reserva. Reservas usa esta pantalla para contestarle al cliente, pero no despacha desde aquí: despachar es de operaciones.

**Criterios de aceptación:**

- Estado de cada unidad: disponible, ocupada, en mantenimiento o dañada.
- Cuando la unidad está ocupada se muestra la hora a la que regresa, a qué reserva pertenece y quién la lleva.
- Desde ahí se abre el detalle de la reserva.
- El estado ocupada lo calcula el sistema a partir de los despachos, no se digita.
- Reservas consulta esta pantalla para contestarle al cliente, pero no despacha desde aquí: despachar es de operaciones.
- Si una unidad figura en más de un grupo abierto, se muestra la hora y la reserva del que regresa de último.

---

#### US-TAB-03 — Actualización del tablero en tiempo real

**ID:** US-TAB-03

**Nombre de la historia:** Actualización del tablero en tiempo real

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito que el tablero se actualice solo cuando un compañero despacha o cierra,  
con la finalidad de no ofrecerle a un cliente un equipo que otro acaba de sacar al agua.

**Descripción:**

La información se actualiza en todos los dispositivos sin que nadie refresque la pantalla. Si alguien despacha un jet ski desde su teléfono en el muelle, la persona de reservas lo ve en la oficina en ese mismo momento. Es lo que hoy se resuelve mandando mensajes por WhatsApp.

**Criterios de aceptación:**

- La información se actualiza en todos los dispositivos sin refrescar la pantalla.
- Si alguien despacha un jet ski desde su teléfono, el resto del equipo lo ve en ese mismo momento.

### EP-TAB-02 — Navegación y uso en campo

#### US-TAB-04 — Navegación fija inferior

**ID:** US-TAB-04

**Nombre de la historia:** Navegación fija inferior

**Historia de usuario:**

Como un trabajador que usa la aplicación de pie,  
necesito moverme por ella desde una barra fija en la parte de abajo,  
con la finalidad de llegar a cualquier sección con el pulgar y sin buscar menús.

**Descripción:**

La barra queda fija abajo y da acceso al tablero, al calendario, al inventario y al historial. Las opciones que se muestran dependen del rol de la persona y del modo activo, de modo que nadie ve entradas que no le sirven.

**Criterios de aceptación:**

- Da acceso al tablero, al calendario, al inventario y al historial.
- Las opciones que se muestran dependen del rol y del modo activo.

---

#### US-TAB-05 — Uso con una sola mano

**ID:** US-TAB-05

**Nombre de la historia:** Uso con una sola mano

**Historia de usuario:**

Como un trabajador que está en la playa,  
necesito poder usar la aplicación con una sola mano,  
con la finalidad de operarla mientras sostengo un chaleco o amarro un kayak.

**Descripción:**

La aplicación se diseña primero para el celular. Los botones son grandes y están separados entre sí, pensados para dedos mojados y para gente que no se va a detener a leer. Toda la interfaz está en español.

**Criterios de aceptación:**

- Los botones son grandes y están separados entre sí.
- Está pensada para usarse de pie, en la playa o en el muelle, y con las manos mojadas.
- Toda la interfaz está en español.

---

#### US-TAB-06 — Apertura rápida con señal irregular

**ID:** US-TAB-06

**Nombre de la historia:** Apertura rápida con señal irregular

**Historia de usuario:**

Como un trabajador que trabaja a la orilla del lago,  
necesito que la aplicación abra rápido aunque la señal esté mala,  
con la finalidad de no perder tiempo esperando en cada una de las decenas de veces que la abro al día.

**Descripción:**

La señal a la orilla del lago es irregular y la aplicación se abre y se cierra decenas de veces al día. Por eso el arranque rápido pesa más que casi cualquier otra cosa. Trabajar sin conexión y sincronizar después se evaluó y quedó fuera de esta versión, porque complica demasiado el sistema para lo que devuelve.

**Criterios de aceptación:**

- La aplicación se abre y se cierra decenas de veces al día, así que el arranque rápido pesa más que casi cualquier otra cosa.
- Trabajar sin conexión y sincronizar después queda fuera de esta versión.

### EP-TAB-03 — Visibilidad y restricción por rol

#### US-TAB-07 — Visibilidad según el rol y el modo

**ID:** US-TAB-07

**Nombre de la historia:** Visibilidad según el rol y el modo

**Historia de usuario:**

Como la empresa,  
necesito que cada trabajador vea solamente lo que le corresponde,  
con la finalidad de que nadie llegue por accidente a información o a acciones que no son de su área.

**Descripción:**

Lo que no corresponde no se muestra en pantalla. Pero la restricción no se queda ahí: aunque alguien intente la operación por otro camino, el servidor la rechaza. Esconder el botón no es proteger nada. Y cuando hay un modo activo, es el modo el que manda: una cuenta de operaciones con área de reservas habilitada no alcanza nada de reservas mientras trabaje en modo operaciones.

**Criterios de aceptación:**

- Lo que no corresponde no se muestra en pantalla.
- La restricción no se queda en esconder botones: aunque se intente por otro camino, el servidor rechaza la operación.
- Ninguna pantalla decide con las áreas de la cuenta cuando hay un modo activo: decide con el modo. El modo restringe y nunca otorga.
- Operaciones no alcanza el dinero de una reserva por ningún camino, ni siquiera leyendo la fila de la reserva: los montos de una reserva viven aparte, con la misma restricción que los depósitos.

---

#### US-TAB-08 — Listados con filtros y paginación

**ID:** US-TAB-08

**Nombre de la historia:** Listados con filtros y paginación

**Historia de usuario:**

Como un trabajador que consulta listados largos,  
necesito verlos en tabla con filtros y paginación,  
con la finalidad de encontrar lo que busco sin que la pantalla cargue todo el histórico.

**Descripción:**

Aplica al historial, al inventario y a la lista de trabajadores. La paginación se resuelve en el servidor: cada solicitud trae solamente la página que se está viendo y nunca la totalidad de los registros, que es lo que haría lenta la aplicación con mala señal.

**Criterios de aceptación:**

- Aplica al historial, al inventario y a la lista de trabajadores.
- La paginación se resuelve en el servidor y trae solamente la página que se está viendo.

### EP-TAB-04 — Historial de reservas

#### US-TAB-09 — Historial de reservas cerradas

**ID:** US-TAB-09

**Nombre de la historia:** Historial de reservas cerradas

**Historia de usuario:**

Como un trabajador de la empresa,  
necesito consultar el historial de las reservas ya cerradas,  
con la finalidad de revisar qué pasó en una salida anterior sin tener que preguntarle a nadie.

**Descripción:**

Toda reserva cerrada pasa al historial, y de ahí salen las estadísticas. El listado muestra el nombre a que iba la reserva, la fecha, el equipo, el guía y quién la atendió, con filtros por fecha, por tipo de reserva y por equipo. El detalle de cada registro indica quién lo creó y quién lo modificó de último.

**Criterios de aceptación:**

- Toda reserva cerrada pasa al historial, y a partir de ahí se construyen las estadísticas.
- Se muestra el nombre a que iba la reserva, la fecha, el equipo, el guía y quién la atendió.
- Filtros por fecha, por tipo de reserva y por equipo.
- El detalle de cada registro indica quién lo creó y quién lo modificó de último.

### EP-TAB-05 — Consulta de precios en campo

#### US-TAB-10 — Consulta de precios desde operaciones

**ID:** US-TAB-10

**Nombre de la historia:** Consulta de precios desde operaciones

**Historia de usuario:**

Como una persona de operaciones que está en el muelle,  
necesito consultar los precios de rentas, tours y combos,  
con la finalidad de contestarle a quien baja al lago y pregunta cuánto vale una salida, sin tener que subir a la oficina.

**Descripción:**

Buena parte de los clientes llega caminando por el lago y pregunta el precio en el momento. Hoy la persona de operaciones no tiene esa información y tiene que subir a preguntar o llamar por radio. Es una pantalla de solo lectura sobre el catálogo de tarifas, extras y combos que administración ya mantiene: la misma información que está pegada en la oficina, en el teléfono. No se muestra ningún movimiento de dinero. Operaciones sigue sin ver cobros, devoluciones ni depósitos, porque no recibe dinero de nadie.

**Criterios de aceptación:**

- La pantalla lista las tarifas por categoría y por tipo de salida.
- Lista también los precios de los extras y los precios de paquete de los combos, cada uno en la sección de su público.
- Los montos se muestran separados por moneda y nunca se suman.
- Es de solo lectura: desde ahí no se modifica ninguna tarifa.
- No muestra cobros, devoluciones ni depósitos de ninguna reserva.
- Solo aparecen las tarifas, los extras y los combos activos.

### EP-TAB-06 — Preferencias del dispositivo

#### US-TAB-11 — Tema claro para trabajar al sol

**ID:** US-TAB-11

**Nombre de la historia:** Tema claro para trabajar al sol

**Historia de usuario:**

Como un trabajador que está a la orilla del lago al mediodía,  
necesito poder cambiar la aplicación a tema claro,  
con la finalidad de leer la pantalla del teléfono bajo el sol directo.

**Descripción:**

La aplicación nació en tema oscuro, que es el correcto bajo techo y de noche. Al sol es al revés: una pantalla se lee mejor sobre fondo claro, porque su luminancia se suma a la que refleja, mientras que un fondo oscuro solo espeja el brillo. El trabajador escoge el tema desde el panel y la aplicación lo recuerda. La preferencia se guarda en el dispositivo y no en la cuenta, porque la misma persona usa el teléfono en el muelle y la computadora en la oficina, y no quiere la misma pantalla en los dos lados.

**Criterios de aceptación:**

- Se escoge entre tema claro y tema oscuro desde el panel, sin cerrar sesión.
- La preferencia se guarda en el dispositivo y no en la cuenta.
- La aplicación abre con el tema escogido la última vez en ese dispositivo.
- Toda la interfaz responde al tema: no quedan tarjetas, paneles ni modales con bordes o fondos que solo se vean en uno de los dos.
- El contraste del tema claro se calcula por encima del mínimo, apuntando a 6:1 y 7:1, porque hay que leerlo con reflejo de sol y eso no lo modela la norma.

---

#### US-TAB-12 — Distribución del tablero por dispositivo

**ID:** US-TAB-12

**Nombre de la historia:** Distribución del tablero por dispositivo

**Historia de usuario:**

Como un trabajador que siempre alquila lo mismo,  
necesito acomodar el tablero con mis categorías de primero y con las tarjetas del tamaño que me sirve,  
con la finalidad de llegar a lo que uso todos los días sin recorrer la pantalla entera.

**Descripción:**

El tablero es la pantalla de entrada y no todos entran a lo mismo: quien despacha jet skis los quiere de primero y a quien le toca la lancha le estorban. Desde el panel el trabajador escoge cuántas tarjetas van por fila y arrastra las categorías al orden que quiere. Como el tema, es una preferencia del dispositivo y no de la cuenta: quien quiere Jet Ski de primero no está decidiendo por nadie más. El orden guardado es una pista y nunca la verdad sobre qué categorías existen, así que el catálogo puede cambiar sin obligar a nadie a volver a acomodar su tablero.

**Criterios de aceptación:**

- Se escoge cuántas tarjetas van por fila, entre dos y tres.
- Las categorías se reordenan arrastrándolas, con el dedo en el teléfono y con el mouse en la computadora.
- La distribución y el orden se guardan en el dispositivo y no en la cuenta.
- Una categoría que el orden guardado ya no reconoce se ignora, y una que el orden no menciona conserva su posición al final.
- Nadie tiene que volver a guardar su orden porque administración agregó o quitó una categoría.

## Módulo Administración

Rol: administración. Configura el inventario, los extras, los combos, las tarifas y las cuentas de los trabajadores, y es quien mira el negocio con números. Su acceso completo es sobre esta área: para trabajar además en reservas o en operaciones necesita que esas áreas se le habiliten, igual que cualquier otra cuenta. Los epics van en orden de dependencia: sin categorías no hay unidades, y sin unidades ni tarifas no hay reserva que cobrar.

### EP-ADM-01 — Trabajadores, roles y permisos

#### US-ADM-01 — Registro de un trabajador

**ID:** US-ADM-01

**Nombre de la historia:** Registro de un trabajador

**Historia de usuario:**

Como la persona de administración,  
necesito agregar un trabajador y asignarle su rol,  
con la finalidad de que entre al sistema viendo únicamente lo que le toca hacer.

**Descripción:**

Se registran el nombre de la persona y su nombre de usuario, y se le asigna el rol base entre administración, reservas y operaciones. El sistema genera una contraseña temporal de un solo uso que el trabajador cambia en su primer ingreso, de modo que administración nunca conoce la clave con la que esa persona va a entrar.

**Criterios de aceptación:**

- Se registran el nombre de la persona y su nombre de usuario.
- El rol base es administración, reservas u operaciones.
- El sistema genera una contraseña temporal de un solo uso.
- El trabajador cambia esa contraseña en su primer ingreso.

---

#### US-ADM-02 — Habilitación de áreas adicionales

**ID:** US-ADM-02

**Nombre de la historia:** Habilitación de áreas adicionales

**Historia de usuario:**

Como la persona de administración,  
necesito habilitarle áreas adicionales a la cuenta de un trabajador,  
con la finalidad de que quien trabaja en dos lados no necesite dos cuentas distintas.

**Descripción:**

Hay personas que unos días atienden reservas y otros días despachan en la playa. En vez de darles dos cuentas, administración le habilita el área extra a la que ya tienen. Se habilitan áreas completas y no permisos sueltos, porque una lista de veinte casillas se vuelve imposible de auditar. Quien queda con más de un área ve el selector de modo al entrar. Lo que no alcanza para ser un área se resuelve con una marca sobre la cuenta, y las marcas son pocas y con nombre propio.

**Criterios de aceptación:**

- Se habilitan áreas completas, no permisos sueltos.
- Sirve para quien unos días atiende reservas y otros días despacha en la playa.
- Quien queda con más de un área ve el selector de modo al entrar.
- El área se puede quitar en cualquier momento y el acceso se corta de inmediato.

---

#### US-ADM-03 — Marca de guía sobre una cuenta

**ID:** US-ADM-03

**Nombre de la historia:** Marca de guía sobre una cuenta

**Historia de usuario:**

Como la persona de administración,  
necesito marcar a un trabajador como guía,  
con la finalidad de que aparezca en la lista cuando reservas asigne el guía de un tour.

**Descripción:**

El guía no es un rol aparte, porque la misma persona que despacha equipo en la mañana sale de guía en un tour por la tarde. Por eso es una marca sobre la cuenta y no cambia nada más de sus permisos.

**Criterios de aceptación:**

- La marca va sobre la cuenta y no crea un rol nuevo.
- Solo los trabajadores marcados como guía aparecen en la lista al asignar un tour.

---

#### US-ADM-04 — Marca de encargado general

**ID:** US-ADM-04

**Nombre de la historia:** Marca de encargado general

**Historia de usuario:**

Como la persona de administración,  
necesito marcar a alguien de operaciones como encargado general,  
con la finalidad de que solo esa persona pueda cambiar las fotos de estado de las máquinas.

**Descripción:**

Funciona igual que la marca de guía: va sobre la cuenta y no crea un rol nuevo. Lo que habilita es la carga y el reemplazo de las fotos de estado de las máquinas, que son la referencia de cómo está cada una hoy.

**Criterios de aceptación:**

- La marca va sobre la cuenta, igual que la de guía, y no crea un rol nuevo.
- Es quien puede subir y reemplazar las fotos de estado de las máquinas.

---

#### US-ADM-05 — Marca de registro de guías externos

**ID:** US-ADM-05

**Nombre de la historia:** Marca de registro de guías externos

**Historia de usuario:**

Como la persona de administración,  
necesito habilitar a alguien de reservas para que registre guías externos,  
con la finalidad de decidir yo quién puede abrir cuentas y quién no.

**Descripción:**

Crear una cuenta es dar acceso al sistema, así que no puede quedar suelto en manos de cualquiera. Esta es la tercera marca sobre una cuenta, junto con la de guía y la de encargado general, y habilita a esa persona de reservas para crear cuentas temporales de guía externo. Sin la marca no ve la opción, y si lo intenta por otro camino el servidor se lo rechaza. Administración siempre las puede crear, porque es quien crea todas las cuentas.

**Criterios de aceptación:**

- Es una marca sobre la cuenta, igual que la de guía y la de encargado general, y no crea un rol nuevo.
- Sin esa marca, la persona de reservas no ve la opción de crear la cuenta y el servidor le rechaza la operación.
- La marca se puede quitar en cualquier momento.
- Administración siempre puede crear esas cuentas, con marca o sin ella, porque es quien crea todas las cuentas del sistema.

---

#### US-ADM-06 — Desbloqueo de una cuenta

**ID:** US-ADM-06

**Nombre de la historia:** Desbloqueo de una cuenta

**Historia de usuario:**

Como la persona de administración,  
necesito desbloquear la cuenta de un trabajador que se pasó de intentos,  
con la finalidad de devolverlo al trabajo sin tener que crearle una cuenta nueva.

**Descripción:**

La cuenta de un trabajador se bloquea al llegar a diez intentos fallidos seguidos y solo administración la levanta. La cuenta de administración no entra aquí, porque nunca llega a bloquearse: pasados los diez intentos se le ofrece recuperar.

**Criterios de aceptación:**

- Aplica a la cuenta de un trabajador que llegó a los diez intentos fallidos.
- La cuenta de administración no llega a bloquearse, así que no hace falta desbloquearla.
- Administración también puede bloquear a mano una cuenta activa sin darla de baja, y reactivarla después; la persona sigue en el listado.

---

#### US-ADM-07 — Generación de una contraseña temporal

**ID:** US-ADM-07

**Nombre de la historia:** Generación de una contraseña temporal

**Historia de usuario:**

Como la persona de administración,  
necesito generar una contraseña temporal para quien perdió la suya,  
con la finalidad de reponerle el acceso al que no tiene correo personal registrado.

**Descripción:**

La contraseña temporal es de un solo uso y obliga a cambiarla al entrar, así que administración nunca queda conociendo la clave definitiva de nadie. Es la salida para el trabajador que no registró correo y por lo tanto no puede recibir el PIN de recuperación.

**Criterios de aceptación:**

- Aplica al trabajador que perdió la suya y no tiene correo personal registrado.
- La contraseña es de un solo uso y obliga a cambiarla al entrar.

---

#### US-ADM-08 — Bloqueo de la cuenta de quien sale

**ID:** US-ADM-08

**Nombre de la historia:** Bloqueo de la cuenta de quien sale

**Historia de usuario:**

Como la persona de administración,  
necesito bloquear la cuenta de un trabajador que sale de la empresa,  
con la finalidad de cortarle el acceso sin perder el registro de lo que hizo mientras trabajó.

**Descripción:**

La cuenta se bloquea, no se borra. Si se borrara se perderían las reservas que atendió, los despachos que hizo y los conteos que levantó, y el historial dejaría de explicar nada. Al bloquearla, las sesiones que esa persona tenga abiertas se cierran en el momento.

**Criterios de aceptación:**

- La cuenta se bloquea, no se borra, para no perder el historial de lo que hizo. En la aplicación la acción se llama dar de baja.
- Las sesiones abiertas de esa persona se cierran en el momento, y se anula cualquier PIN de recuperación pendiente, porque un PIN vivo dejaría entrar a quien ya no trabaja aquí.
- Se conservan el usuario, el correo, la cédula, las áreas y las marcas: son lo que hace que reactivarla signifique volver a la misma cuenta.
- La persona sale del listado por defecto y se consulta con el filtro de ex trabajadores. Desde ahí lo único que se le ofrece es recontratar.
- La cuenta de administración no se puede dar de baja, porque es la única que puede crear las demás.

---

#### US-ADM-09 — Reactivación de una cuenta

**ID:** US-ADM-09

**Nombre de la historia:** Reactivación de una cuenta

**Historia de usuario:**

Como la persona de administración,  
necesito reactivar la cuenta de un trabajador que vuelve,  
con la finalidad de que retome su trabajo con su mismo usuario y su mismo historial.

**Descripción:**

En una operación de temporada es común que la gente salga y vuelva. La cuenta se reactiva con el mismo usuario, las mismas áreas y las mismas marcas, y conserva todo lo que esa persona registró antes. La contraseña sí es nueva: nadie vuelve con la credencial que tenía el día que se fue.

**Criterios de aceptación:**

- La cuenta vuelve con el mismo usuario, las mismas áreas y las mismas marcas, y conserva su historial.
- Se entrega una contraseña temporal nueva, y la persona pasa por la pantalla de primer ingreso como cualquier cuenta recién creada.
- Recontratar es el inverso exacto de dar de baja: levanta el bloqueo y devuelve la cuenta al listado.

---

#### US-ADM-10 — Extensión de una cuenta temporal

**ID:** US-ADM-10

**Nombre de la historia:** Extensión de una cuenta temporal

**Historia de usuario:**

Como la persona de administración,  
necesito extender o reactivar la caducidad de una cuenta temporal,  
con la finalidad de que un guía externo que sigue trabajando no se quede afuera del sistema.

**Descripción:**

Las cuentas de guía externo nacen con fecha de caducidad. Cuando esa fecha llega, la cuenta queda inhabilitada. Si el guía sigue viniendo, administración le mueve la fecha y la cuenta vuelve a entrar sin necesidad de registrarlo otra vez.

**Criterios de aceptación:**

- Aplica a las cuentas de guía externo que ya vencieron o que están por vencer.
- Al extender la fecha la cuenta vuelve a entrar al sistema.

---

#### US-ADM-11 — Consulta de la lista de trabajadores

**ID:** US-ADM-11

**Nombre de la historia:** Consulta de la lista de trabajadores

**Historia de usuario:**

Como la persona de administración,  
necesito consultar y filtrar la lista de trabajadores,  
con la finalidad de revisar quién tiene acceso al sistema y con qué permisos.

**Descripción:**

El listado muestra nombre, usuario, rol base, áreas adicionales, marcas, fecha de caducidad y estado, con filtros por rol y por estado. Las cuentas temporales de guía externo se identifican como tales y muestran si están vigentes o inhabilitadas.

**Criterios de aceptación:**

- Columnas: nombre, usuario, rol base, áreas adicionales, marcas, fecha de caducidad y estado.
- Filtros por rol y por estado.
- Las cuentas temporales de guía externo se identifican como tales y muestran si están vigentes o inhabilitadas.

**Validaciones del módulo de trabajadores:**

- El sistema tiene una sola cuenta de administración y no se puede bloquear ni eliminar, porque quedaría sin dueño.
- Reservas solo puede crear cuentas temporales de guía externo. Cualquier otra cuenta la crea administración.
- El nombre de usuario es único en todo el sistema.
- Bloquear una cuenta no borra los registros que esa persona creó.

### EP-ADM-02 — Catálogo del inventario

#### US-ADM-12 — Catálogo de categorías del inventario

**ID:** US-ADM-12

**Nombre de la historia:** Catálogo de categorías del inventario

**Historia de usuario:**

Como la persona de administración,  
necesito gestionar las categorías del inventario,  
con la finalidad de tener registrado todo lo que la empresa posee y poder agregar lo que aparezca.

**Descripción:**

Aquí entra todo lo que la empresa tiene: jet skis, lanchas, cuadraciclos, kayaks, tablas, parrillas, remos, chalecos y extintores. El equipo reservable no es un registro aparte, es la parte del inventario marcada como reservable. La lista no queda cerrada de antemano, porque cada temporada aparece algo nuevo que hace falta contar.

**Criterios de aceptación:**

- Aquí entra todo lo que la empresa tiene: jet skis, lanchas, cuadraciclos, kayaks, tablas, parrillas, remos, chalecos y extintores.
- El equipo reservable no es un registro aparte: es la parte del inventario marcada como reservable.
- La lista no queda cerrada de antemano, porque cada temporada aparece algo nuevo que hace falta contar. Si mañana compran drybags, se crea la categoría y se define su comportamiento sin tocar nada más.
- Una categoría que nunca tuvo unidades ni artículos se elimina. Una que ya tuvo se marca inactiva, para no romper el historial.
- Una categoría puede llevar un grupo, opcional. Las que comparten grupo se muestran como una sola tarjeta en el tablero y como un solo bloque al reservar, pero se cuentan y se cobran por separado. Es el caso de los kayaks sencillos y los dobles, y el de los paddleboards cuando hay más de un tipo.
- No se agrupa una categoría que se lleva por unidad con una que se lleva por cantidad: la tarjeta no podría sumar sus propios números.
- Sin grupo, la categoría se muestra sola, que es el caso de la mayoría.

---

#### US-ADM-13 — Comportamiento de una categoría

**ID:** US-ADM-13

**Nombre de la historia:** Comportamiento de una categoría

**Historia de usuario:**

Como la persona de administración,  
necesito definir cómo se comporta cada categoría,  
con la finalidad de que el sistema sepa qué pedir y qué controlar en cada tipo de equipo.

**Descripción:**

El comportamiento de la categoría es lo que hace que un jet ski y un remo se traten distinto sin programar cada caso. Ahí se define si se identifica una por una o se lleva por cantidad, si sus unidades son intercambiables entre sí, si es reservable, si lleva motor y en qué unidad se mide su uso, si consume gasolina, si se puede dañar, si lleva fotos de estado, si solo sale con guía y cuánto dura por defecto una salida.

**Criterios de aceptación:**

- Si se identifica una por una o se lleva por cantidad. Se identifican las que importa saber cuál sale: jet skis, lanchas y cuadraciclos, que llevan motor, gasolina, horas o kilómetros, golpes y fotos, y también kayaks y paddleboards, que llevan su número aunque no tengan motor. El resto se cuenta: tablas, parrillas, remos, chalecos y extintores.
- De un jet ski interesa cuál sale, porque cada uno tiene su historia. Con los kayaks y los paddleboards pasa igual: cada uno lleva su número y operaciones escoge cuál sale, sin gasolina ni horas que registrar.
- Si sus unidades son intercambiables entre sí. Es una pregunta distinta de la anterior: un jet ski se lleva por unidad y aun así cualquiera sirve, mientras que la lancha se lleva por unidad y es una lancha concreta, porque solo la Bennington arrastra y el wakeboard y el tubing dependen de eso. De esta marca depende si Reservas compromete cantidad o unidad.
- Si es reservable. Solo las categorías reservables aparecen en el tablero y se pueden asociar a una reserva.
- Si lleva motor, y si el uso se mide en horas de motor o en kilómetros. El equipo de agua con motor lleva horas; los cuadraciclos llevan kilometraje.
- Si consume gasolina.
- Si se puede dañar.
- Si lleva fotos de estado. Los jet skis las llevan; un kayak no las necesita.
- Si solo se alquila con guía.
- Cuánto dura por defecto una salida.

---

#### US-ADM-14 — Depósito de garantía por categoría

**ID:** US-ADM-14

**Nombre de la historia:** Depósito de garantía por categoría

**Historia de usuario:**

Como la persona de administración,  
necesito definir el depósito de garantía que lleva cada categoría,  
con la finalidad de que el monto salga solo al despachar y no dependa de la memoria de quien atiende.

**Descripción:**

El depósito se registra por categoría, en dólares y en colones, por ejemplo doscientos dólares o cien mil colones para los jet skis. El monto se puede modificar cuando la empresa lo decida, y hay categorías que no llevan depósito. Administración decide a cuáles ponerles, y puede agregárselo también a los cuadraciclos si lo considera.

**Criterios de aceptación:**

- Se registra el monto en dólares y en colones. Por ejemplo doscientos dólares o cien mil colones para los jet skis.
- El monto se puede modificar cuando la empresa lo decida.
- Hay categorías sin depósito. Administración decide a cuáles ponerles, por ejemplo agregárselo también a los cuadraciclos.
- El monto que se le pide al cliente sale de la categoría del equipo que va a salir.

---

#### US-ADM-15 — Configuración de los avisos del inventario

**ID:** US-ADM-15

**Nombre de la historia:** Configuración de los avisos del inventario

**Historia de usuario:**

Como la persona de administración,  
necesito definir qué tipo de aviso lleva cada categoría,  
con la finalidad de que el sistema me avise por lo que de verdad importa en cada cosa.

**Descripción:**

No todo se controla igual. De los chalecos interesa que no bajen de cierta cantidad; de los extintores y del contenido de los botiquines interesa que no se venzan. Por eso el aviso se configura por categoría y puede ser por cantidad, por vencimiento, por ambas cosas o por ninguna. Cada vez que se agrega una categoría nueva, administración decide qué le corresponde.

**Criterios de aceptación:**

- El aviso puede ser por cantidad, por fecha de vencimiento, por ambas cosas o por ninguna.
- Por cantidad se define la cantidad mínima a partir de la cual salta el aviso. Es el caso de los chalecos.
- Por vencimiento se define con cuánta anticipación avisar. Es el caso de los extintores y del contenido de los botiquines.
- Cada vez que se agrega una categoría nueva, administración decide qué aviso le corresponde o si no lleva ninguno.
- Los botiquines solo salen en los tours y no en las rentas, así que no se pierden: su contenido se gasta cuando se usa y además se vence.

**Validaciones del catálogo:**

- No se elimina una categoría que tenga unidades o artículos registrados.
- Una categoría reservable puede llevarse por unidad o por cantidad. Lo que decide si Reservas compromete una unidad concreta no es esa modalidad sino si las unidades de la categoría son intercambiables entre sí.
- La modalidad de una categoría, entre identificada por unidad y llevada por cantidad, no se cambia después de que tenga registros.

### EP-ADM-03 — Unidades y artículos del inventario

#### US-ADM-16 — Unidades identificadas del inventario

**ID:** US-ADM-16

**Nombre de la historia:** Unidades identificadas del inventario

**Historia de usuario:**

Como la persona de administración,  
necesito gestionar las unidades de las categorías que se identifican una por una,  
con la finalidad de saber cuál equipo sale y en qué estado está cada uno, no solo cuántos hay.

**Descripción:**

De un jet ski no da lo mismo cuál sale: cada uno tiene su gasolina, sus horas y sus golpes. Por eso los jet skis, las lanchas y los cuadraciclos llevan una ficha por unidad, con su código propio, su estado, la gasolina actual, las horas o el kilometraje acumulado y el valor al que toca el próximo cambio de aceite. Los kayaks y los paddleboards también llevan ficha por unidad con su número, aunque sin gasolina ni horas. Las tablas y los chalecos no: de esos interesa cuántos hay, así que se llevan por cantidad.

**Criterios de aceptación:**

- Cada unidad lleva su código propio, único dentro de la empresa, por ejemplo la placa del jet ski.
- Estado de la unidad: disponible, ocupado, en mantenimiento, dañado, en reparación o dado de baja.
- Se lleva la gasolina actual, las horas o el kilometraje acumulado, y el valor al que toca el próximo cambio de aceite.
- Cada unidad declara cuántas rayas tiene su medidor de gasolina, porque no toda la flota trae el mismo tablero: los cuadraciclos marcan seis y los jet skis y las lanchas cuatro. La lectura del día se guarda sobre ese máximo.
- Una unidad sin lectura de gasolina todavía no es lo mismo que una unidad en cero.
- Crear, consultar y modificar. Para sacarla del inventario se da de baja, no se elimina.
- El código se recorta de espacios y distingue mayúsculas de minúsculas.
- Una unidad dada de baja no se reactiva.
- El máximo de rayas del medidor se puede cambiar aunque la unidad ya tenga lecturas.
- La gasolina, las horas o el kilometraje y el cambio de aceite solo aplican a categorías con motor.
- Solo administración gestiona las unidades.

---

#### US-ADM-17 — Artículos llevados por cantidad

**ID:** US-ADM-17

**Nombre de la historia:** Artículos llevados por cantidad

**Historia de usuario:**

Como la persona de administración,  
necesito registrar cuántos hay de las categorías que se llevan por cantidad,  
con la finalidad de saber con cuántos remos y cuántos chalecos cuenta la empresa.

**Descripción:**

De un remo no interesa cuál es, interesa cuántos quedan. Estas categorías registran el total y lo separan por estado: disponibles, dañados y en reparación. Un chaleco roto sigue sumando como chaleco si solo se mira el número, y ahí es donde el conteo engaña. Cuando uno se bota o se pierde, simplemente se baja la cantidad: no hay ficha que dar de baja.

**Criterios de aceptación:**

- Se registra cuántos hay en total.
- Se separan por estado: disponibles, dañados y en reparación.
- Cuando se bota o se pierde uno, se baja la cantidad. No hay nada que dar de baja porque no hay ficha por unidad, y el historial de conteos deja ver de cuánto a cuánto bajó y en qué fecha.
- En las categorías con aviso por vencimiento se registra la fecha de vencimiento.

---

#### US-ADM-18 — Baja de una unidad

**ID:** US-ADM-18

**Nombre de la historia:** Baja de una unidad

**Historia de usuario:**

Como la persona de administración,  
necesito dar de baja una unidad sin borrar su historial,  
con la finalidad de sacarla de la disponibilidad conservando lo que costó mantenerla.

**Descripción:**

Cuando una máquina se vende, se pierde o se destruye, se da de baja con su motivo y su fecha. Desaparece del inventario y del tablero: para la operación diaria deja de existir. Lo que se conserva es su registro, para que las reservas viejas, sus reportes de daño y su historial de mantenimiento sigan cuadrando. Si se borrara, el reporte de cuánto costó sostener cada máquina dejaría de tener sentido.

**Criterios de aceptación:**

- Aplica a las categorías identificadas una por una, cuando la máquina se vende, se pierde o se destruye.
- Se registra el motivo de la baja y su fecha.
- La unidad desaparece del inventario, del tablero y de todo lo que se pueda agendar: para la operación diaria deja de existir.
- Su registro se conserva para que las reservas viejas, sus reportes de daño y su historial de mantenimiento sigan cuadrando.
- En las categorías que se llevan por cantidad no aplica: ahí simplemente se baja el número.

**Validaciones de las unidades:**

- El código de una unidad es único dentro de la empresa.
- No se elimina una unidad comprometida en una reserva vigente.
- La cantidad de unidades libres que muestra el tablero sale del estado de cada unidad y no se digita.

### EP-ADM-04 — Extras de las lanchas

#### US-ADM-19 — Catálogo de extras

**ID:** US-ADM-19

**Nombre de la historia:** Catálogo de extras

**Historia de usuario:**

Como la persona de administración,  
necesito gestionar el catálogo de extras,  
con la finalidad de que reservas los pueda agregar a una salida de lancha sin escribirlos a mano.

**Descripción:**

Los extras son lo que se le suma a una salida de lancha: parrilla, tubing, wake y tablas. Se crean, se consultan, se modifican y se eliminan desde administración.

**Criterios de aceptación:**

- Por ejemplo parrilla, tubing, wake y tablas.
- Un extra que nunca se usó en una reserva se elimina. Uno que ya se usó se marca inactivo, para no romper el historial.

---

#### US-ADM-20 — Extras aplicables por embarcación

**ID:** US-ADM-20

**Nombre de la historia:** Extras aplicables por embarcación

**Historia de usuario:**

Como la persona de administración,  
necesito definir a cuál embarcación aplica cada extra,  
con la finalidad de que reservas no le ofrezca al cliente algo que esa lancha no admite.

**Descripción:**

No todas las embarcaciones admiten lo mismo. Al definir qué extra aplica a cuál, el sistema filtra la lista en el momento de armar la reserva y evita el compromiso que después no se puede cumplir.

**Criterios de aceptación:**

- No todas las embarcaciones admiten lo mismo.
- Al agregar extras a una reserva solo se ofrecen los que aplican a esa embarcación.

---

#### US-ADM-21 — Extras que ocupan equipo del inventario

**ID:** US-ADM-21

**Nombre de la historia:** Extras que ocupan equipo del inventario

**Historia de usuario:**

Como la persona de administración,  
necesito indicar cuáles extras ocupan equipo real del inventario,  
con la finalidad de que esos extras descuenten disponibilidad y no se comprometan dos veces.

**Descripción:**

Algunos extras son solamente un cobro adicional y no tocan nada. Otros ocupan equipo real, como las tablas, y en ese caso descuentan de la disponibilidad igual que cualquier otro equipo reservable de la salida.

**Criterios de aceptación:**

- Algunos extras son solamente un cobro adicional.
- Los que ocupan equipo real descuentan de la disponibilidad como cualquier otro equipo.

### EP-ADM-05 — Combos y tarifas

#### US-ADM-22 — Combos predefinidos

**ID:** US-ADM-22

**Nombre de la historia:** Combos predefinidos

**Historia de usuario:**

Como la persona de administración,  
necesito gestionar los combos que se venden seguido,  
con la finalidad de que reservas los arme con un toque en vez de escoger equipo por equipo.

**Descripción:**

Hay paquetes que se repiten todo el tiempo, como lancha con jet ski y paddleboard. Dejarlos armados ahorra tiempo en la oficina y evita que cada quien los componga distinto.

**Criterios de aceptación:**

- Son los paquetes que se venden seguido, por ejemplo lancha con jet ski y paddleboard.
- Se arman escogiendo qué equipos entran, por ejemplo lancha con jet ski y paddleboard, y después reservas solo asocia el grupo al combo ya creado.
- Un combo que nunca se vendió se elimina. Uno que ya se vendió se marca inactivo, para no romper el historial.
- Cada combo se arma para nacionales o para extranjeros, y aparece en la sección de su público.
- El mismo paquete puede existir para los dos públicos: son dos combos distintos, cada uno armado y cotizado en su sección.

---

#### US-ADM-23 — Precio de paquete de un combo

**ID:** US-ADM-23

**Nombre de la historia:** Precio de paquete de un combo

**Historia de usuario:**

Como la persona de administración,  
necesito asignarle a cada combo su propio precio de paquete,  
con la finalidad de venderlo como paquete y no como la suma de las partes.

**Descripción:**

El combo tiene un precio propio, que normalmente es menor que sumar las tarifas individuales, porque de eso se trata vender un paquete. Ese precio se define aquí y es el que reservas usa al cobrarlo. El precio va en la moneda del público del combo: los combos de nacionales se cotizan en colones y los de extranjeros en dólares, y no se mezclan.

**Criterios de aceptación:**

- El combo se vende como paquete y no como la suma de las partes.
- El precio va en la moneda del público del combo: colones para nacionales y dólares para extranjeros.
- Un combo sin precio no se puede guardar, porque sin precio no se puede vender.

---

#### US-ADM-24 — Tarifas por equipo y tipo de salida

**ID:** US-ADM-24

**Nombre de la historia:** Tarifas por equipo y tipo de salida

**Historia de usuario:**

Como la persona de administración,  
necesito definir la tarifa de cada equipo y de cada tipo de salida,  
con la finalidad de que reservas cobre con un precio de referencia y no de memoria.

**Descripción:**

La tarifa se registra en la moneda en que se cobra, por ejemplo ciento veinte dólares o sesenta mil colones la hora de jet ski. Es el precio de lista del que parte reservas, aunque después lo ajuste al momento de cobrar.

**Criterios de aceptación:**

- Por ejemplo ciento veinte dólares o sesenta mil colones la hora de jet ski.
- La tarifa se registra en la moneda en que se cobra.

---

#### US-ADM-25 — Modificación de una tarifa

**ID:** US-ADM-25

**Nombre de la historia:** Modificación de una tarifa

**Historia de usuario:**

Como la persona de administración,  
necesito modificar una tarifa cuando cambia el precio,  
con la finalidad de mantener el catálogo al día sin alterar lo que ya se cobró.

**Descripción:**

Los precios cambian con la temporada. Al modificar una tarifa, las reservas que ya se cobraron conservan el monto con el que se cobraron, porque de lo contrario los reportes de días anteriores cambiarían solos.

**Criterios de aceptación:**

- Las reservas ya cobradas conservan el monto con el que se cobraron.

### EP-ADM-06 — Estadísticas y reportes

#### US-ADM-26 — Ingresos del día

**ID:** US-ADM-26

**Nombre de la historia:** Ingresos del día

**Historia de usuario:**

Como la persona de administración,  
necesito consultar los ingresos del día con sus descuentos y devoluciones,  
con la finalidad de saber cuánto entró de verdad y no cuánto se facturó de lista.

**Descripción:**

El reporte parte de lo cobrado y le resta lo devuelto, de modo que refleje el dinero que realmente quedó. Los montos se muestran separados por moneda y no se suman en un solo total, porque el sistema no maneja tipo de cambio.

**Criterios de aceptación:**

- Los montos se muestran separados por moneda y no se suman en un solo total.

---

#### US-ADM-27 — Movimiento por día y por mes

**ID:** US-ADM-27

**Nombre de la historia:** Movimiento por día y por mes

**Historia de usuario:**

Como la persona de administración,  
necesito ver el movimiento por día y por mes en gráficos,  
con la finalidad de comparar temporadas y saber cuáles días conviene reforzar el equipo.

**Descripción:**

El gráfico muestra la evolución de las salidas y los ingresos a lo largo del tiempo. Sirve para ver de un vistazo cuáles meses cargan la operación y cuáles días de la semana quedan flojos.

**Criterios de aceptación:**

- Permite comparar temporadas y días de la semana.

---

#### US-ADM-28 — Horas de uso por equipo

**ID:** US-ADM-28

**Nombre de la historia:** Horas de uso por equipo

**Historia de usuario:**

Como la persona de administración,  
necesito consultar cuántas horas salió cada equipo,  
con la finalidad de saber cuáles se usan y cuáles están parqueados ocupando espacio.

**Descripción:**

El dato sale del tiempo que cada unidad estuvo despachada. Permite decidir si conviene comprar otro jet ski o si más bien sobra un kayak que casi nadie pide.

**Criterios de aceptación:**

- Permite ver cuáles equipos se usan y cuáles casi no.

---

#### US-ADM-29 — Reservas atendidas por trabajador

**ID:** US-ADM-29

**Nombre de la historia:** Reservas atendidas por trabajador

**Historia de usuario:**

Como la persona de administración,  
necesito consultar qué reservas atendió cada trabajador,  
con la finalidad de saber quién registró cada cosa cuando algo no cuadra.

**Descripción:**

El reporte se construye a partir de la firma que queda en cada reserva. Si una reserva tiene un dato raro, se sabe si la metió una persona u otra sin tener que preguntar en el grupo.

**Criterios de aceptación:**

- Sale de la firma que queda en cada reserva.

---

#### US-ADM-30 — Costo de mantenimiento por máquina

**ID:** US-ADM-30

**Nombre de la historia:** Costo de mantenimiento por máquina

**Historia de usuario:**

Como la persona de administración,  
necesito consultar cuánto se ha gastado en mantener cada máquina,  
con la finalidad de decidir cuándo una máquina deja de salir rentable.

**Descripción:**

Se construye a partir del historial de mantenimiento de cada unidad: cambios de aceite, de llanta, de pieza y todo lo que se le haya hecho. Hoy eso no está anotado en ninguna parte, así que nadie sabe cuánto cuesta sostener cada máquina.

**Criterios de aceptación:**

- Se construye a partir del historial de mantenimiento de la unidad.

---

#### US-ADM-31 — Depósitos pendientes y retenidos

**ID:** US-ADM-31

**Nombre de la historia:** Depósitos pendientes y retenidos

**Historia de usuario:**

Como la persona de administración,  
necesito consultar los depósitos pendientes y los retenidos,  
con la finalidad de que no quede plata de un cliente sin resolver ni dinero retenido sin justificar.

**Descripción:**

Los depósitos pendientes son plata de otra persona que la empresa tiene en la mano, así que no pueden quedar en el aire. Los retenidos son dinero que la empresa se quedó por un daño y entran al reporte de ingresos con su motivo.

**Criterios de aceptación:**

- La finalidad de este epic es que la administración mire el negocio con números y no de memoria.

## Módulo Reservas

Rol: reservas. Trabaja desde la oficina y es quien atiende al cliente. Toda reserva entra por aquí, la que se agenda con días de anticipación y la que se crea con el cliente de pie enfrente. El calendario es su vista principal.

### EP-RES-01 — Calendario

#### US-RES-01 — Vistas del calendario

**ID:** US-RES-01

**Nombre de la historia:** Vistas del calendario

**Historia de usuario:**

Como la persona de reservas,  
necesito consultar el calendario en vista diaria, semanal, mensual y anual,  
con la finalidad de escoger el nivel de detalle que me sirve según lo que esté haciendo.

**Descripción:**

El calendario es la vista principal de quien trabaja en reservas. La vista diaria sirve para operar el día, la semanal para acomodar el fin de semana, y la mensual y la anual para ver cómo viene la temporada. Operaciones ve solamente el día y la semana, porque en la playa no hace falta más.

**Criterios de aceptación:**

- La vista se escoge según lo que se esté haciendo.
- Operaciones ve solamente el día y la semana, porque en la playa no hace falta más.

---

#### US-RES-02 — Información visible en el calendario

**ID:** US-RES-02

**Nombre de la historia:** Información visible en el calendario

**Historia de usuario:**

Como la persona de reservas,  
necesito ver en el calendario qué hay agendado, a qué hora, con qué equipo y a nombre de quién,  
con la finalidad de contestarle al cliente sin abrir una por una las reservas.

**Descripción:**

Cada bloque del calendario muestra lo mínimo que se necesita para responder una llamada: la hora, el equipo comprometido y el nombre a que va la reserva. Es lo que hoy vive repartido entre el calendario de Google y la conversación de WhatsApp.

**Criterios de aceptación:**

- Es la vista principal de quien trabaja en reservas.

---

#### US-RES-03 — Detalle de una reserva

**ID:** US-RES-03

**Nombre de la historia:** Detalle de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito abrir el detalle de una reserva,  
con la finalidad de ver todo lo asociado a esa salida en una sola pantalla.

**Descripción:**

El detalle reúne el equipo comprometido, los extras, los guías asignados y el estado del cobro. Además indica quién creó la reserva y quién la modificó de último, que es lo que permite saber a quién preguntarle cuando algo no cuadra.

**Criterios de aceptación:**

- Se muestra toda la información asociada a la salida.
- Incluye el equipo comprometido, los extras, los guías asignados y el estado del cobro.
- Indica quién creó la reserva y quién la modificó de último.
- Lista cada grupo despachado con su hora real de salida, su hora de regreso y, si ya volvió, su hora de llegada.

### EP-RES-02 — Creación de reservas

#### US-RES-04 — Creación de una reserva

**ID:** US-RES-04

**Nombre de la historia:** Creación de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito crear una reserva con sus datos básicos,  
con la finalidad de dejar comprometido el equipo y que quede visible para todo el equipo de trabajo.

**Descripción:**

Se registran el nombre a que va la reserva, la cantidad de personas, la fecha, la hora, la duración y el equipo que va a ocupar. La duración se pide en horas y no en minutos crudos, porque las rentas se venden por hora y nadie acá cotiza una salida de ciento noventa minutos. Del cliente se guarda solo eso, a propósito: el correo y los demás datos de contacto ya viven en FareHarbor y duplicarlos aquí no aporta nada. La reserva queda visible en el calendario y registrada a nombre de quien la creó.

**Criterios de aceptación:**

- Se registran el nombre a que va la reserva, la cantidad de personas, la fecha, la hora, la duración y el equipo que va a ocupar.
- La duración se escoge en horas, con botones de media hora, una hora, hora y media, dos y tres, y un campo numérico para cualquier otro valor.
- La fecha y la hora se interpretan y se muestran siempre en hora de Costa Rica, sin importar dónde corra el servidor.
- Del cliente se guarda solo eso, a propósito: el correo y los demás datos de contacto viven en FareHarbor.
- La reserva queda visible en el calendario.
- La reserva queda registrada a nombre de quien la creó.

---

#### US-RES-05 — Cliente que llega sin agendar

**ID:** US-RES-05

**Nombre de la historia:** Cliente que llega sin agendar

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar en el momento al cliente que llega sin haber agendado,  
con la finalidad de que toda salida entre por el mismo lugar y operaciones siempre despache contra una reserva.

**Descripción:**

Buena parte de los clientes llega de sorpresa, y ese caso no cambia el flujo: pasa por la oficina y ahí se le crea la reserva con el cliente de pie enfrente. Así operaciones nunca tiene que digitar datos en la playa, porque siempre existe una reserva que seleccionar.

**Criterios de aceptación:**

- Buena parte de los clientes llega sin agendar y ese caso no cambia el flujo.
- Toda reserva entra por el mismo lugar, así que operaciones siempre despacha contra una reserva que ya existe.

---

#### US-RES-06 — Salidas fuera del horario habitual

**ID:** US-RES-06

**Nombre de la historia:** Salidas fuera del horario habitual

**Historia de usuario:**

Como la persona de reservas,  
necesito agendar salidas fuera del horario de nueve a cinco,  
con la finalidad de atender los días en que se trabaja más temprano o más tarde de lo normal.

**Descripción:**

El horario habitual es de nueve a cinco, pero hay días con horas extra y salidas de atardecer. El sistema no lo impide ni pide justificación.

**Criterios de aceptación:**

- Hay días con horas extra y el sistema no lo impide.

---

#### US-RES-07 — Asociación del equipo a la reserva

**ID:** US-RES-07

**Nombre de la historia:** Asociación del equipo a la reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito comprometer el equipo que va a salir en la reserva,  
con la finalidad de que esa disponibilidad quede apartada y no se le prometa a otro cliente.

**Descripción:**

No basta con decir que la salida lleva dos kayaks: la cantidad comprometida baja de la disponibilidad para esa franja horaria. Para el equipo que se cuenta por cantidad — jet skis, cuadraciclos, kayaks y paddleboards incluidos, aunque por dentro se lleven por unidad — Reservas compromete cuántas unidades van, no cuáles: al agendar con horas de anticipación nadie sabe todavía cuál jet ski va a estar libre, cargado y sin golpes a esa hora, y esa decisión es del muelle. Es operaciones quien la toma al despachar, convirtiendo la cantidad comprometida en las unidades concretas que salen. La excepción es la lancha: no es intercambiable (solo la Bennington arrastra, y el wakeboard y el tubing solo se piden con ella), así que ahí Reservas sí elige la unidad concreta desde que agenda. Comprometer el equipo no es despacharlo: la unidad sigue en tierra hasta que operaciones la saque.

**Criterios de aceptación:**

- Cada equipo comprometido baja de la disponibilidad para esa franja horaria.
- El equipo que se cuenta por cantidad (jet skis, cuadraciclos, kayaks, paddleboards) se compromete por cantidad, no por unidad concreta: cuál máquina sale lo decide operaciones al despachar.
- La lancha, que no es intercambiable, se compromete por unidad concreta desde que Reservas agenda.
- Comprometer el equipo no es despacharlo: la unidad sigue en tierra hasta que operaciones la saque.

### EP-RES-03 — Tipo de reserva: renta, tour y combo

#### US-RES-08 — Tipo de reserva

**ID:** US-RES-08

**Nombre de la historia:** Tipo de reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito elegir si la reserva es renta, tour o combo,  
con la finalidad de que el sistema pida lo que corresponde en cada caso.

**Descripción:**

En la renta el cliente se lleva el equipo por su cuenta. El tour va acompañado por un guía, y hay equipo que solo puede salir así, como las lanchas y los cuadraciclos. El combo junta varios equipos distintos en un solo paquete. El tipo escogido define si el sistema pide guía y cómo se cobra.

**Criterios de aceptación:**

- Renta: el cliente se lleva el equipo por su cuenta.
- Tour: la salida va acompañada por un guía.
- Combo: junta varios equipos distintos en un solo paquete.
- Hay equipo que solo puede salir en tour, como las lanchas y los cuadraciclos.

---

#### US-RES-09 — Combo predefinido

**ID:** US-RES-09

**Nombre de la historia:** Combo predefinido

**Historia de usuario:**

Como la persona de reservas,  
necesito elegir un combo predefinido de la lista,  
con la finalidad de armar en un toque los paquetes que se venden todos los días.

**Descripción:**

Son los paquetes que administración dejó armados porque se repiten seguido, como lancha con jet ski y paddleboard. Al escogerlo, el combo entra con su precio de paquete y con todo su equipo asociado de una vez.

**Criterios de aceptación:**

- Son los paquetes que administración dejó armados porque se venden seguido.
- El combo se cobra con su precio de paquete.

---

#### US-RES-10 — Combo a la medida

**ID:** US-RES-10

**Nombre de la historia:** Combo a la medida

**Historia de usuario:**

Como la persona de reservas,  
necesito armar un combo a la medida escogiendo qué equipos entran,  
con la finalidad de atender al cliente que pide una mezcla que no está en la lista.

**Descripción:**

Cuando el cliente quiere algo que no calza con ningún paquete armado, se compone en el momento escogiendo libremente el equipo. Cada equipo del combo queda asociado a la reserva y baja de la disponibilidad igual que si se hubiera reservado por separado. El sistema propone como precio la suma de las tarifas individuales, a diferencia del combo predefinido, que ya trae su precio de paquete fijado por administración.

**Criterios de aceptación:**

- Sirve para atender solicitudes específicas del cliente.
- Cada equipo del combo queda asociado a la reserva y baja de la disponibilidad igual que si se hubiera reservado por separado.
- El sistema propone como precio la suma de las tarifas individuales, y reservas lo ajusta si acordó otro monto.
- A diferencia del combo predefinido, que se vende con su precio de paquete ya fijado por administración.

---

#### US-RES-11 — Extras de una salida de lancha

**ID:** US-RES-11

**Nombre de la historia:** Extras de una salida de lancha

**Historia de usuario:**

Como la persona de reservas,  
necesito agregarle extras a una reserva de lancha,  
con la finalidad de cobrar y comprometer lo que el cliente pidió además de la embarcación.

**Descripción:**

Los extras son lo que se le suma a la salida: parrilla, tubing, wake o tablas. Solo se ofrecen los que aplican a esa embarcación, porque no todas admiten lo mismo. Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad; los que son solamente un cobro adicional no tocan nada.

**Criterios de aceptación:**

- Solo se ofrecen los extras que aplican a esa embarcación.
- Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad.
- Los extras que son solamente un cobro adicional no tocan el inventario.

### EP-RES-04 — Guías de la salida

#### US-RES-12 — Asignación de guías a un tour

**ID:** US-RES-12

**Nombre de la historia:** Asignación de guías a un tour

**Historia de usuario:**

Como la persona de reservas,  
necesito asignar uno o más guías a un tour,  
con la finalidad de dejar registrado quién acompaña la salida antes de que llegue el día.

**Descripción:**

No hay máximo de personas por tour: se llena hasta que se agota el equipo. Cuando el grupo es grande salen dos guías, por ejemplo un tour de ocho cuadraciclos. Solo se listan los trabajadores marcados como guía. Hoy quién lleva cada tour se pregunta por mensaje cada vez.

**Criterios de aceptación:**

- No hay máximo de personas por tour: se llena hasta que se agota el equipo.
- Cuando el grupo es grande salen dos guías, por ejemplo un tour de ocho cuadraciclos.
- Solo se listan los trabajadores marcados como guía.

---

#### US-RES-13 — Cuenta temporal de un guía externo

**ID:** US-RES-13

**Nombre de la historia:** Cuenta temporal de un guía externo

**Historia de usuario:**

Como la persona de reservas,  
necesito crear la cuenta temporal de un guía externo,  
con la finalidad de que quien viene contratado por fuera pueda trabajar sin esperar a administración.

**Descripción:**

Solo puede crear estas cuentas quien tenga la marca que administración otorga para eso: crear una cuenta es dar acceso al sistema y no puede quedar suelto. El guía externo hace el mismo trabajo que operaciones, así que su cuenta lleva ese rol y la marca de guía. Su nombre de usuario es la cédula y el sistema le genera una contraseña temporal que cambia en su primer ingreso, igual que cualquier trabajador de planta. Se guardan su nombre y su cédula, nada más, y la fecha de caducidad es obligatoria. Reservas puede crear únicamente este tipo de cuenta: no crea trabajadores de planta, no crea cuentas de administración y no cambia roles.

**Criterios de aceptación:**

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

---

#### US-RES-14 — Consulta del guía de cada tour

**ID:** US-RES-14

**Nombre de la historia:** Consulta del guía de cada tour

**Historia de usuario:**

Como la persona de reservas,  
necesito ver quién lleva cada tour,  
con la finalidad de saber a quién buscar cuando hay que coordinar algo de esa salida.

**Descripción:**

La información se muestra en el tablero, en el detalle de la reserva y en el historial, e incluye tanto a los guías con cuenta como a los guías externos. Es uno de los datos que hoy se pierde en la conversación de WhatsApp.

**Criterios de aceptación:**

- La información se muestra en el tablero, en el detalle de la reserva y en el historial.
- Hoy eso se pregunta por mensaje cada vez.

### EP-RES-05 — Disponibilidad y advertencias

#### US-RES-15 — Disponibilidad por franja horaria

**ID:** US-RES-15

**Nombre de la historia:** Disponibilidad por franja horaria

**Historia de usuario:**

Como la persona de reservas,  
necesito consultar la disponibilidad de los equipos en una franja horaria concreta,  
con la finalidad de responder si hay campo el sábado a las diez y no solo si hay campo ahora.

**Descripción:**

Como las reservas se hacen con anticipación, la disponibilidad deja de ser una pregunta sobre el presente. El sistema tiene que saber si un kayak está libre el sábado de diez a doce, contando lo que ya está comprometido en esa franja.

**Criterios de aceptación:**

- La pregunta es por franja y no por el instante actual: el sistema tiene que saber si un kayak está libre el sábado de diez a doce.

---

#### US-RES-16 — Advertencia por choque de disponibilidad

**ID:** US-RES-16

**Nombre de la historia:** Advertencia por choque de disponibilidad

**Historia de usuario:**

Como la persona de reservas,  
necesito recibir una advertencia cuando agende equipo que ya está comprometido,  
con la finalidad de conocer el riesgo y decidir yo si sigo adelante.

**Descripción:**

El sistema avisa pero deja seguir, no bloquea. Hay días en que la operación se acomoda sobre la marcha y un bloqueo estorbaría más de lo que ayuda. La advertencia indica con cuál reserva choca, para que la decisión se tome con el dato a la vista.

**Criterios de aceptación:**

- El sistema avisa pero deja seguir. No bloquea.
- Hay días en que la operación se acomoda sobre la marcha y un bloqueo estorbaría más de lo que ayuda.
- La advertencia indica con cuál reserva choca.

---

#### US-RES-17 — Estado del equipo antes de comprometerlo

**ID:** US-RES-17

**Nombre de la historia:** Estado del equipo antes de comprometerlo

**Historia de usuario:**

Como la persona de reservas,  
necesito consultar el estado de los equipos antes de comprometerlos,  
con la finalidad de no agendar una máquina que está en el taller.

**Descripción:**

El sistema no ofrece equipo que esté en mantenimiento, dañado o dado de baja. Si operaciones marca una unidad como dañada durante el conteo, deja de aparecer para reservas en ese mismo momento.

**Criterios de aceptación:**

- No se ofrece equipo que esté en mantenimiento o dado de baja.

### EP-RES-06 — Cambios sobre una reserva

#### US-RES-18 — Modificación de una reserva

**ID:** US-RES-18

**Nombre de la historia:** Modificación de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito modificar una reserva ya agendada,  
con la finalidad de actualizarla cuando cambian las condiciones del cliente.

**Descripción:**

Cambia la cantidad de personas, la hora, el equipo o la duración. Cada cambio queda registrado a nombre de quien lo hizo, de modo que el detalle siempre dice quién tocó la reserva de último.

**Criterios de aceptación:**

- Se actualiza la información cuando cambian las condiciones del cliente.
- El cambio queda registrado a nombre de quien lo hizo.
- El equipo de un combo no se cambia al modificar la reserva: si el paquete cambió, se cancela y se crea una reserva nueva.

---

#### US-RES-19 — División de una reserva en varias salidas

**ID:** US-RES-19

**Nombre de la historia:** División de una reserva en varias salidas

**Historia de usuario:**

Como la persona de reservas,  
necesito partir una reserva en dos o más salidas,  
con la finalidad de manejar al grupo que llega incompleto sin inventar una reserva nueva.

**Descripción:**

Pasa que el grupo se agendó para seis y llegan tres, y los otros tres llegan más tarde. Al partirla se indica qué equipo y cuántas personas van en cada salida. El cobro no se parte: como se cobra por reserva y no por persona, se queda completo en la original, a nombre del mismo cliente, y la segunda salida nace sin cobro propio. El depósito también se queda con la reserva original.

**Criterios de aceptación:**

- Pasa que el grupo llega incompleto y sale en dos tandas.
- El sistema permite dividirla en vez de obligar a inventar una reserva nueva.
- Al partirla se indica qué equipo y cuántas personas van en cada salida.
- El cobro no se parte: se queda completo en la reserva original y a nombre del mismo cliente, porque se cobra por reserva y no por persona.
- La segunda salida nace sin cobro propio.
- El depósito de garantía se queda con la reserva original.
- Cada salida conserva la referencia a la reserva de la que salió.
- En la salida dividida solo se cobra el tiempo adicional que ella misma genere.

---

#### US-RES-20 — Posposición de una reserva

**ID:** US-RES-20

**Nombre de la historia:** Posposición de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito posponer una reserva para otra fecha y hora,  
con la finalidad de reacomodar la salida cuando el clima no deja trabajar.

**Descripción:**

Una reserva que todavía no ha salido se pospone por el motivo que sea. Una que ya fue despachada solo se pospone por clima, cuando empieza a llover muy fuerte o entra una tormenta con la gente en el agua. En ese caso el equipo se cierra y vuelve al tablero registrando lo que sí se usó, pero el cobro y el depósito se conservan para la fecha nueva: al cliente no se le vuelve a cobrar.

**Criterios de aceptación:**

- Una reserva agendada se pospone por el motivo que sea.
- Una reserva que ya fue despachada solo se pospone por clima: lluvia muy fuerte o tormenta.
- Al posponer una despachada, el equipo se cierra y vuelve al tablero, registrando la gasolina y las horas o el kilometraje de lo que sí se usó.
- El cobro se conserva vivo para la fecha nueva: no se le vuelve a cobrar al cliente.
- El depósito de garantía se conserva hasta la salida nueva.
- La reserva vuelve al estado agendada con la fecha y la hora nuevas.
- El motivo de la posposición queda registrado junto con quién la hizo.

---

#### US-RES-21 — Cancelación de una reserva

**ID:** US-RES-21

**Nombre de la historia:** Cancelación de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito cancelar una reserva registrando el motivo,  
con la finalidad de poder revisar después por qué se cae la gente.

**Descripción:**

El motivo es obligatorio, porque sin ese dato el historial no explica nada y no se puede analizar qué está fallando. La reserva queda como cancelada, deja de mostrarse en la aplicación de operaciones y pasa al historial.

**Criterios de aceptación:**

- El motivo es obligatorio, porque sirve para revisar después por qué se cae la gente.
- La reserva queda como cancelada y deja de mostrarse en la aplicación de operaciones.
- El equipo no se libera solo ni se bloquea nada.

---

#### US-RES-22 — Cancelación de una salida en curso

**ID:** US-RES-22

**Nombre de la historia:** Cancelación de una salida en curso

**Historia de usuario:**

Como la persona de reservas,  
necesito cancelar una salida que ya está en curso,  
con la finalidad de registrar desde la oficina lo que operaciones me reporta por radio.

**Descripción:**

Cuando entra mal tiempo o hay un problema durante la salida, operaciones lo reporta por radio porque está ocupado devolviendo gente, y la oficina lo registra. Aunque la reserva quede cancelada, operaciones registra después cómo volvió el equipo, porque si no se perdería el dato de una máquina que sí salió al agua.

**Criterios de aceptación:**

- Cuando operaciones está ocupado lo reportan por radio a la oficina y ahí se registra.
- Aplica a cambios de clima o a problemas durante la salida.
- Aunque la reserva quede cancelada, operaciones registra cómo volvió el equipo: la gasolina, las horas o el kilometraje, y los daños si los hubo.
- Sin ese registro se perdería el dato de una máquina que sí salió al agua.
- El depósito de garantía se resuelve igual que en un cierre normal.
- El equipo vuelve al tablero como disponible, salvo que haya quedado dañado o en mantenimiento.

### EP-RES-07 — Cobros, descuentos y depósitos

#### US-RES-23 — Cobro de una reserva

**ID:** US-RES-23

**Nombre de la historia:** Cobro de una reserva

**Historia de usuario:**

Como la persona de reservas,  
necesito cobrar una reserva aplicando la tarifa correspondiente,  
con la finalidad de dejar constancia de lo que pagó el cliente.

**Descripción:**

El sistema propone el monto multiplicando la tarifa del catálogo por la duración de la salida, y reservas lo ajusta si el precio acordado fue otro. El cobro es por reserva y no por persona: si se agendó una lancha para seis y solo llegan dos, se cobra lo mismo, porque el precio ya se incluyó al comprometer la embarcación. Se puede registrar en cualquier momento, desde que se agenda hasta que se cierra, para cubrir tanto al que paga por adelantado como al que paga al volver.

**Criterios de aceptación:**

- La tarifa sale del catálogo que definió administración.
- El sistema propone el monto multiplicando la tarifa por la duración de la salida, y reservas lo ajusta si el precio acordado fue otro.
- El cobro es por reserva y no por persona: si se agendó una lancha para seis y solo llegan dos, se cobra lo mismo y no se devuelve dinero.
- El cobro se puede registrar en cualquier momento, desde que se agenda hasta que se cierra, para cubrir al que paga por adelantado y al que paga al volver.
- El cobro queda registrado a nombre de quien lo hizo.

---

#### US-RES-24 — Ajuste del precio al cobrar

**ID:** US-RES-24

**Nombre de la historia:** Ajuste del precio al cobrar

**Historia de usuario:**

Como la persona de reservas,  
necesito modificar la tarifa al momento de cobrar,  
con la finalidad de aplicar el precio que de verdad se acordó con el cliente.

**Descripción:**

A veces se juega con el precio para atraer más clientes, así que reservas puede ajustarlo libremente, sin margen ni tope, editándolo directamente desde el resumen de cobro. Lo que se guarda es el monto acordado y no el de la tarifa de lista, para que la cuenta del día refleje lo que entró. Por defecto el acordado se guarda en una sola moneda; un botón agrega el campo de la segunda moneda al lado del primero para el cliente que paga parte en dólares y parte en colones, porque con una sola el cobro mixto nunca llega a saldar.

**Criterios de aceptación:**

- Reservas puede ajustar el precio libremente, sin margen ni tope, porque a veces se juega con el precio para atraer clientes.
- El precio se edita directamente desde el resumen de cobro, sin una sección aparte.
- Queda registrado el monto acordado y no solo el de la tarifa de lista.
- Por defecto el monto acordado se guarda en una sola moneda; un botón agrega el campo de la segunda moneda para el cliente que paga parte en dólares y parte en colones.
- El precio de una reserva no se guarda en la misma fila que la reserva, para que operaciones no lo alcance al leer la reserva.

---

#### US-RES-25 — Registro del cobro por moneda

**ID:** US-RES-25

**Nombre de la historia:** Registro del cobro por moneda

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar el cobro en la moneda en que entró,  
con la finalidad de llevar el ingreso en dólares y en colones por separado.

**Descripción:**

El sistema no convierte ni maneja tipo de cambio, porque eso obligaría a mantener una tasa actualizada y a discutir quién la define. Los montos se acumulan por moneda y nunca se suman entre sí.

**Criterios de aceptación:**

- Dólares o colones.
- El sistema no convierte ni maneja tipo de cambio.
- Los montos se acumulan por moneda y nunca se suman entre sí.

---

#### US-RES-26 — Cobro en dos tractos

**ID:** US-RES-26

**Nombre de la historia:** Cobro en dos tractos

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar el cobro de una reserva en más de un movimiento,  
con la finalidad de atender al cliente que paga una parte en dólares y otra en colones.

**Descripción:**

Una misma reserva se puede pagar en varios movimientos, cada uno con su monto, su moneda y su método de pago. Pasa seguido que el cliente paga una parte en dólares y el resto en colones, y como el sistema no convierte monedas, cada parte se guarda en la suya. La reserva muestra cuánto se ha cobrado y cuánto falta.

**Criterios de aceptación:**

- Una misma reserva se puede pagar en más de un movimiento.
- Cada movimiento lleva su monto, su moneda y su método de pago.
- Un cliente puede pagar una parte en dólares y otra en colones, y cada parte se guarda en su moneda.
- Por defecto el pago se anota en una sola moneda; un botón agrega al lado el monto en la segunda moneda, y las dos partes se registran de una vez.
- La reserva muestra cuánto se ha cobrado y cuánto falta.
- Los movimientos de dinero, cobros y devoluciones, se listan con monto, moneda, concepto, método, fecha y quién los registró; la lista va plegada y se abre con un botón.

---

#### US-RES-27 — Método de pago

**ID:** US-RES-27

**Nombre de la historia:** Método de pago

**Historia de usuario:**

Como la persona de reservas,  
necesito anotar con qué método pagó el cliente,  
con la finalidad de saber después cómo entró cada monto del día.

**Descripción:**

Se anota como texto: efectivo, tarjeta, PayPal, SINPE u otro. El sistema no procesa pagos ni valida tarjetas. Lleva el control del dinero, no el dinero.

**Criterios de aceptación:**

- Efectivo, tarjeta, PayPal, SINPE u otro, como texto.
- El sistema no procesa pagos ni valida tarjetas: lleva el control, no el dinero.

---

#### US-RES-28 — Devolución de dinero al cliente

**ID:** US-RES-28

**Nombre de la historia:** Devolución de dinero al cliente

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar la devolución de dinero al cliente cuando corresponda,  
con la finalidad de que la cuenta del día refleje lo que de verdad quedó.

**Descripción:**

Reservas decide si le devuelve dinero al cliente y cuánto, sin que tenga que ser por cancelar la salida: puede pasar por una lluvia que la cortó a medias o por cualquier otro motivo, en cualquier momento después de haberse cobrado algo. Se anota el monto devuelto, la moneda y el motivo. El criterio de cuánto devolver es del jefe y se resuelve fuera de la aplicación; aquí solo se anota, y el monto no puede superar lo que de verdad quedó cobrado (neto) en esa moneda, para que la cuenta del día refleje lo que de verdad entró.

**Criterios de aceptación:**

- Reservas decide si corresponde devolver dinero y cuánto; puede ser por cancelar la salida, por una salida cortada a medias, u otro motivo.
- Se puede registrar en cualquier momento después de haberse cobrado algo, no solo al cancelar.
- Se indica el monto devuelto, la moneda y el motivo.
- El monto devuelto no puede superar lo que de verdad quedó cobrado (neto) en esa moneda.
- La cuenta del día refleja lo que de verdad entró.
- La devolución se abre con un botón y muestra lo disponible para devolver en cada moneda.

---

#### US-RES-29 — Registro del depósito recibido

**ID:** US-RES-29

**Nombre de la historia:** Registro del depósito recibido

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar el depósito de garantía que recibí del cliente,  
con la finalidad de dejar constancia de una plata que es de él y que la empresa solo está guardando.

**Descripción:**

El depósito lo recibe la oficina cuando el cliente pasa a pagar, así que lo registra reservas. Operaciones no lo ve ni lo cobra, porque no maneja dinero. El sistema propone el monto a partir de la categoría del equipo que va a salir, y reservas indica si en esa salida hubo depósito o no, porque no todas lo llevan. Desde que se registra queda en la lista de pendientes hasta que se resuelva al final de la salida.

**Criterios de aceptación:**

- El depósito lo recibe la oficina cuando el cliente pasa a pagar, así que lo registra reservas. Operaciones no lo ve ni lo cobra.
- El sistema propone el monto a partir de la categoría del equipo que va a salir, por ejemplo doscientos dólares o cien mil colones en un jet ski.
- Reservas indica si en esa salida hubo depósito o no, porque no todas lo llevan.
- Se registra el monto y la moneda en que se recibió.
- Desde ese momento el depósito aparece en la lista de pendientes de resolver.

---

#### US-RES-30 — Resolución del depósito de garantía

**ID:** US-RES-30

**Nombre de la historia:** Resolución del depósito de garantía

**Historia de usuario:**

Como la persona de reservas,  
necesito registrar cuánto se le devuelve al cliente del depósito de garantía,  
con la finalidad de cerrar la plata que la empresa tiene del cliente.

**Descripción:**

Resuelve los depósitos que quedaron pendientes después de que operaciones cerró la salida. Reservas indica cuánto se le devuelve al cliente: todo, cuando el equipo volvió en orden, o un monto puntual (por ejemplo cien o veinte dólares de un depósito de doscientos) cuando hubo daño. El sistema calcula lo que se queda la empresa (el depósito menos lo devuelto), y ese monto entra al reporte de ingresos. El motivo del daño se pide solo cuando no se devuelve todo.

**Criterios de aceptación:**

- Resuelve los depósitos que quedaron pendientes después de que operaciones cerró la salida.
- Reservas indica cuánto se le devuelve al cliente: todo el depósito, o un monto puntual cuando hubo daño.
- El sistema calcula lo que se queda la empresa restando lo devuelto del depósito.
- Lo que se queda la empresa entra al reporte de ingresos.
- El motivo del daño se pide solo cuando no se devuelve todo, queda anotado y se ve en el reporte.
- Al resolverlo, el depósito sale de la lista de pendientes.

---

#### US-RES-31 — Cobro del tiempo adicional

**ID:** US-RES-31

**Nombre de la historia:** Cobro del tiempo adicional

**Historia de usuario:**

Como la persona de reservas,  
necesito cobrar el tiempo adicional de una salida que se pasó de su hora,  
con la finalidad de que ese dinero quede registrado y no se pierda en el cambio de turno.

**Descripción:**

Cuando un cliente se queda treinta minutos de más, ese tiempo se cobra aparte de la tarifa y se registra dentro de la misma reserva como tiempo adicional. Llega por dos vías: las reservas que se pasaron de su hora sin avisar, y las que operaciones extendió sobre la marcha. En ambos casos reservas decide si lo cobra o si va de cortesía.

**Criterios de aceptación:**

- Se registra dentro del cobro de la reserva como tiempo adicional, aparte de la tarifa.
- Por ejemplo el cliente que se queda treinta minutos de más.
- Sale de dos lados: de las reservas que se pasaron de su hora sin avisar, y de las que operaciones extendió sobre la marcha.
- Reservas decide si el tiempo de más se cobra o si va de cortesía.
- Reservas registra el monto acordado por ese tiempo.
- El tiempo adicional se calcula por grupo, contra la hora real de llegada de cada uno, y se suma para la reserva.
- Si la reserva se pospuso después de despachada, solo cuenta la salida nueva; el viaje interrumpido no genera tiempo adicional.

---

#### US-RES-32 — Ingresos del día en reservas

**ID:** US-RES-32

**Nombre de la historia:** Ingresos del día en reservas

**Historia de usuario:**

Como la persona de reservas,  
necesito consultar los ingresos del día y sus gráficos,  
con la finalidad de cerrar la jornada sabiendo cuánto entró.

**Descripción:**

Los montos van separados por moneda y no se suman en un solo total. Operaciones no ve esta información en ninguna pantalla, porque no necesita ver plata para hacer su trabajo.

**Criterios de aceptación:**

- Los montos van separados por moneda y no se suman en un solo total.
- Operaciones no ve esta información, porque no necesita ver plata para hacer su trabajo.

---

#### US-RES-33 — Depósitos pendientes de resolver

**ID:** US-RES-33

**Nombre de la historia:** Depósitos pendientes de resolver

**Historia de usuario:**

Como la persona de reservas,  
necesito consultar qué depósitos siguen pendientes de resolver,  
con la finalidad de no dejar en el aire plata que es de un cliente.

**Descripción:**

Un depósito pendiente es dinero de otra persona que la empresa tiene en la mano. Mientras no se resuelva sigue apareciendo en esta lista, con su monto y con la reserva a la que pertenece.

**Criterios de aceptación:**

- Es plata de otra persona y no puede quedar en el aire.

## Módulo Operaciones

Rol: operaciones. Es quien está en la playa y en el muelle. Despacha contra reservas que ya existen, cierra las salidas y lleva el control de las máquinas y del inventario. No ve información de dinero.

### EP-OPE-01 — Despacho de reservas

#### US-OPE-01 — Reservas pendientes de despachar

**ID:** US-OPE-01

**Nombre de la historia:** Reservas pendientes de despachar

**Historia de usuario:**

Como la persona de operaciones,  
necesito ver las reservas del día que faltan por despachar,  
con la finalidad de saber qué me falta sacar al agua sin preguntarle a la oficina.

**Descripción:**

La lista se limita al día en curso, que es lo único que le sirve a quien está en el muelle. Las reservas canceladas no aparecen, para que nadie despache una salida que la oficina ya dio de baja.

**Criterios de aceptación:**

- La lista se limita al día en curso.
- Las reservas canceladas no aparecen.

---

#### US-OPE-02 — Despacho de una reserva

**ID:** US-OPE-02

**Nombre de la historia:** Despacho de una reserva

**Historia de usuario:**

Como la persona de operaciones,  
necesito despachar una reserva seleccionándola de la lista,  
con la finalidad de sacar el equipo al agua sin volver a escribir datos que ya existen.

**Descripción:**

Es la parte nueva más importante del sistema: la separación entre agendar y despachar. Hoy la misma información se digita dos veces y viaja por WhatsApp, y ahí es donde se pierden nombres y horas. Con esto la reserva ya existe y operaciones solo la selecciona; el equipo queda marcado como ocupado y arranca el conteo hasta la hora de regreso. El despacho es además el momento en que se decide el equipo de verdad: Reservas comprometió cantidades, y es el muelle quien dice cuáles unidades salen y quién corrige lo que el cliente pidió al llegar.

**Criterios de aceptación:**

- No se vuelven a escribir los datos: la reserva ya existe y solo se selecciona.
- El despacho se abre desde la lista del día o desde la tarjeta de la categoría en el tablero, sin dar la vuelta por otra pantalla.
- La hoja de despacho lista el equipo comprometido de esa categoría, tenga motor o no. Una reserva de paddleboards no puede abrirse en blanco.
- Operaciones escoge en ese momento las unidades concretas que salen, entre las libres de la categoría que está despachando.
- Operaciones puede cambiar el equipo si el cliente pidió otra cosa al llegar al muelle, y el precio propuesto se recalcula con lo que de verdad sale. Un cobro ya registrado no se toca.
- Cada categoría de la reserva sale por su lado: si la reserva lleva jet skis y kayaks, se despachan por separado, cada grupo con su propia hora real de salida y su propia duración. Mientras falte un grupo por salir, la reserva sigue apareciendo como pendiente de despachar.
- La hora de salida que queda registrada es la real, la del momento del despacho, no la que se agendó. Se propone esa hora automáticamente, pero operaciones puede ajustarla si el equipo salió antes o después.
- El equipo queda marcado como ocupado y arranca el conteo hasta la hora de regreso de su grupo, calculada desde la hora real de salida más la duración; esa duración también se puede ajustar (US-OPE-06).
- Es la separación entre agendar y despachar, que es la parte nueva más importante del sistema.
- El despacho queda registrado a nombre de quien lo hizo.
- La hoja propone la hora de regreso (salida más duración) y operaciones la puede ajustar; la duración del grupo sale de esas dos horas.
- Una hora de regreso anterior a la de salida se entiende como del día siguiente.
- Se escogen exactamente tantas unidades como las comprometidas en esa categoría.
- Si el despacho falla y se reintenta, ninguna unidad queda comprometida dos veces.
- El equipo de un combo no se cambia al despachar: si el paquete cambió, se cancela y se crea una reserva nueva. Un combo se despacha desde la lista del día y no desde la tarjeta de la categoría.

---

#### US-OPE-03 — Registro de gasolina y horas al despachar

**ID:** US-OPE-03

**Nombre de la historia:** Registro de gasolina y horas al despachar

**Historia de usuario:**

Como la persona de operaciones,  
necesito registrar la gasolina y las horas de motor al momento del despacho,  
con la finalidad de saber después cuánto se consumió en esa salida.

**Descripción:**

Aplica solo a las categorías que llevan motor. El dato de salida es lo que después se compara contra el de regreso, y es lo que alimenta el aviso de cambio de aceite. La gasolina se lee como la lee el muelle: en rayas del medidor, no en porcentaje.

**Criterios de aceptación:**

- Aplica solo a las categorías que llevan motor.
- La gasolina se registra en rayas sobre el máximo del medidor de esa unidad, nunca en porcentaje: en el muelle se lee «3 de 4».
- Hay botones de un cuarto, medio, tres cuartos y lleno, con el medidor dibujado, y también el campo numérico para el valor exacto.
- El despacho escribe la gasolina y las horas en la unidad, no solo en la reserva: mientras la máquina está afuera su ficha tiene que mostrar la lectura de hoy y no la del regreso anterior.

---

#### US-OPE-04 — Tiempo restante del equipo despachado

**ID:** US-OPE-04

**Nombre de la historia:** Tiempo restante del equipo despachado

**Historia de usuario:**

Como la persona de operaciones,  
necesito ver cuánto falta para que vuelva cada equipo que está afuera,  
con la finalidad de estar en el muelle cuando lleguen y organizar la siguiente salida.

**Descripción:**

Es la vista que hoy no existe y que obliga a subir a leer la conversación de WhatsApp para reconstruir qué salió, con quién y a qué hora vuelve. Nadie tiene hoy una vista única de eso. Como cada categoría de una reserva sale por su lado, cada grupo lleva su propia hora de regreso.

**Criterios de aceptación:**

- Es la vista que hoy no existe y obliga a subir a leer la conversación de WhatsApp.
- La hora de regreso de cada grupo se calcula desde su hora real de salida más su duración, no desde la hora agendada.

---

#### US-OPE-05 — Reservas vencidas sin regresar

**ID:** US-OPE-05

**Nombre de la historia:** Reservas vencidas sin regresar

**Historia de usuario:**

Como la persona de operaciones,  
necesito ver marcada la reserva que pasó su hora y no ha vuelto,  
con la finalidad de darle seguimiento en vez de que desaparezca de la pantalla.

**Descripción:**

La reserva no se cierra sola ni se esconde: sigue visible como pendiente hasta que el equipo regrese. El cobro del tiempo de más se decide aparte y lo registra reservas como tiempo adicional.

**Criterios de aceptación:**

- No se cierra sola ni desaparece de la pantalla.
- El cobro del tiempo de más se decide aparte.
- La salida vencida se marca «Por regresar», en color de advertencia, con los minutos de retraso.

---

#### US-OPE-06 — Ajuste de la duración en curso

**ID:** US-OPE-06

**Nombre de la historia:** Ajuste de la duración en curso

**Historia de usuario:**

Como la persona de operaciones,  
necesito extender o recortar la duración de una reserva en curso,  
con la finalidad de ajustar el conteo cuando la salida cambia sobre la marcha.

**Descripción:**

El cliente pide media hora más, o devuelve el equipo antes. La duración se ajusta por grupo: si los kayaks vuelven antes que los jet skis, se recorta solo la de los kayaks. Al ajustar la duración, el conteo hasta la hora de regreso se recalcula y el tablero se actualiza para todos. Si la salida se alargó, la reserva queda marcada para que la oficina decida si cobra esas horas de más: operaciones no decide de plata, solo deja constancia.

**Criterios de aceptación:**

- La duración se ajusta por grupo, sin tocar los demás grupos de la misma reserva.
- El conteo hasta la hora de regreso se recalcula.
- Al extender, la reserva queda marcada para reservas con las horas de más, para que la oficina decida si las cobra o si van de cortesía.
- Operaciones no decide de plata: solo deja constancia de que la salida se alargó.

---

#### US-OPE-07 — Calendario de operaciones

**ID:** US-OPE-07

**Nombre de la historia:** Calendario de operaciones

**Historia de usuario:**

Como la persona de operaciones,  
necesito consultar el calendario del día y de la semana,  
con la finalidad de saber qué viene sin cargar vistas que no me sirven en la playa.

**Descripción:**

A operaciones no le hacen falta las vistas de mes ni de año: su horizonte es lo que va a pasar hoy y en los próximos días. Esas dos vistas son las únicas que se le muestran.

**Criterios de aceptación:**

- No hacen falta las vistas de mes ni de año.

---

#### US-OPE-08 — Guía asignado a cada tour

**ID:** US-OPE-08

**Nombre de la historia:** Guía asignado a cada tour

**Historia de usuario:**

Como la persona de operaciones,  
necesito ver quién lleva cada tour,  
con la finalidad de saber a quién entregarle el equipo cuando salga el grupo.

**Descripción:**

Incluye tanto a los guías con cuenta como a los guías externos. Es un dato que hoy se pregunta por mensaje cada vez que sale un tour.

**Criterios de aceptación:**

- Incluye tanto a los guías con cuenta como a los guías externos registrados por nombre.

### EP-OPE-02 — Cierre de la reserva

#### US-OPE-09 — Cierre de una reserva

**ID:** US-OPE-09

**Nombre de la historia:** Cierre de una reserva

**Historia de usuario:**

Como la persona de operaciones,  
necesito cerrar la reserva registrando cómo volvió el equipo,  
con la finalidad de dejar constancia del estado en que regresó antes de que salga otra vez.

**Descripción:**

Si todo está en orden, queda la constancia. Si no, se levanta el reporte de daño y se actualiza el estado de la unidad; ese reporte es lo que después usa reservas para decidir cuánto del depósito se le devuelve al cliente. En el mismo cierre se registran la gasolina y las horas o el kilometraje con los que volvió. Como cada categoría sale por su lado, cada grupo se cierra cuando vuelve, con su hora real de llegada; la reserva queda cerrada cuando el último grupo regresa. La reserva cerrada pasa al historial y de ahí salen las estadísticas.

**Criterios de aceptación:**

- Si todo está en orden, queda constancia.
- Si no, se levanta el reporte de daño correspondiente y se actualiza el estado de la unidad.
- El reporte de daño es lo que después usa reservas para decidir cuánto del depósito se le devuelve al cliente. Operaciones no ve ni toca el depósito, porque no recibe dinero.
- Se registra la gasolina y las horas de motor con las que volvió.
- Cada grupo se cierra por separado, con su hora real de llegada. La reserva queda cerrada cuando se cierra el último grupo.
- La hora de llegada se propone como la hora actual al abrir el cierre, pero operaciones puede ajustarla si el equipo llegó antes o después.
- La reserva cerrada pasa al historial.
- Si queda equipo comprometido por unidad sin despachar, la reserva no se cierra aunque los grupos despachados ya hayan vuelto; ese equipo se quita al despachar o la reserva se modifica.
- La hora de llegada no puede ser anterior a la hora de salida del grupo.
- La lectura de horas o kilometraje al cerrar no puede ser menor que la de salida; la pantalla muestra con qué lectura salió cada unidad.

### EP-OPE-03 — Máquinas y mantenimiento

#### US-OPE-10 — Gasolina de salida y de regreso

**ID:** US-OPE-10

**Nombre de la historia:** Gasolina de salida y de regreso

**Historia de usuario:**

Como la persona de operaciones,  
necesito registrar la gasolina con la que sale y con la que vuelve una unidad,  
con la finalidad de saber cuánto consumió cada salida y detectar un consumo raro.

**Descripción:**

Aplica a las categorías marcadas como que consumen gasolina. La diferencia entre la salida y el regreso es lo que después permite estimar el gasto de combustible por máquina. El nivel se lleva en rayas del medidor, sobre el máximo que declara cada unidad.

**Criterios de aceptación:**

- Aplica a las categorías marcadas como que consumen gasolina.
- El nivel se registra en rayas sobre el máximo del medidor de la unidad: seis en los cuadraciclos, cuatro en los jet skis y las lanchas.
- Una unidad sin lectura todavía no es lo mismo que una unidad en cero.

---

#### US-OPE-11 — Horas de motor acumuladas

**ID:** US-OPE-11

**Nombre de la historia:** Horas de motor acumuladas

**Historia de usuario:**

Como la persona de operaciones,  
necesito registrar las horas de motor acumuladas de una unidad,  
con la finalidad de que el sistema sepa cuándo toca el próximo cambio de aceite.

**Descripción:**

Las horas se llevan en el equipo de agua con motor, como las lanchas y los jet skis. En los cuadraciclos el mismo control se lleva por kilometraje. De cualquiera de los dos sale el aviso de mantenimiento.

**Criterios de aceptación:**

- De ahí sale el aviso de cambio de aceite.

---

#### US-OPE-12 — Aviso de cambio de aceite

**ID:** US-OPE-12

**Nombre de la historia:** Aviso de cambio de aceite

**Historia de usuario:**

Como la persona de operaciones,  
necesito recibir el aviso de cambio de aceite cuando una unidad llega a sus horas,  
con la finalidad de darle mantenimiento antes de que la máquina se dañe.

**Descripción:**

El umbral se define en la ficha de la unidad. Cuando las horas o el kilometraje acumulado lo alcanzan, el sistema avisa para que se programe el cambio en vez de que se descubra tarde.

**Criterios de aceptación:**

- El umbral se define en la ficha de la unidad.
- La pantalla de mantenimiento reúne las máquinas que llegaron a su cambio de aceite, con cuánto se pasaron, y las que están fuera de servicio.

---

#### US-OPE-13 — Reporte de daño

**ID:** US-OPE-13

**Nombre de la historia:** Reporte de daño

**Historia de usuario:**

Como la persona de operaciones,  
necesito levantar un reporte de daño cuando algo le pasa a una máquina,  
con la finalidad de documentar qué ocurrió y cuánto subió el conteo de golpes.

**Descripción:**

La causa se elige entre vuelco, choque, falla de máquina u otra, y se escribe una descripción de lo ocurrido. Se indica además cuánto subió el conteo de golpes de esa máquina, que es el número que la empresa lleva para saber cómo está cada jet ski. El reporte queda a nombre de quien lo levantó.

**Criterios de aceptación:**

- La causa se elige entre vuelco, choque, falla de máquina u otra.
- Se escribe una descripción de lo ocurrido.
- Se indica cuánto subió el conteo de golpes de esa máquina.
- El reporte queda a nombre de quien lo levantó.

---

#### US-OPE-14 — Consulta de reportes de daño

**ID:** US-OPE-14

**Nombre de la historia:** Consulta de reportes de daño

**Historia de usuario:**

Como la persona de operaciones,  
necesito consultar los reportes de daño anteriores de una unidad,  
con la finalidad de entender el historial de esa máquina antes de decidir qué hacer con ella.

**Descripción:**

Los reportes se consultan después, no solamente se registran. Ver los anteriores permite saber si una máquina se golpea seguido o si fue un incidente aislado.

**Criterios de aceptación:**

- Los reportes se consultan después, no solamente se registran.

---

#### US-OPE-15 — Fotos de estado de una máquina

**ID:** US-OPE-15

**Nombre de la historia:** Fotos de estado de una máquina

**Historia de usuario:**

Como el encargado general de operaciones,  
necesito subir y reemplazar las fotos de estado de una máquina,  
con la finalidad de tener una referencia visual de cómo está hoy y de dónde tiene los daños.

**Descripción:**

Se guardan varias fotos por máquina, una por ángulo: costado derecho, costado izquierdo y frente, y opcionalmente una por debajo. Se reemplazan cuando cambia el estado. Solo puede subirlas quien tenga la marca de encargado general, además de administración. No se guarda una foto por salida porque ocupa demasiado espacio y no compensa: para una discusión puntual con un cliente basta con la foto que el trabajador toma en el momento con su propio celular.

**Criterios de aceptación:**

- Se guardan varias fotos por máquina, una por ángulo: costado derecho, costado izquierdo y frente, y opcionalmente una por debajo.
- Sirven para ver el detalle de los daños y tener una referencia de cómo está la máquina hoy.
- Se reemplazan cuando cambia el estado de la máquina.
- Solo puede subirlas quien tenga la marca de encargado general, además de administración.
- No se guarda una foto por salida, porque ocupa demasiado espacio y no compensa. Para una discusión puntual con un cliente basta con la foto que el trabajador toma en el momento con su propio celular.

---

#### US-OPE-16 — Consulta de las fotos de una máquina

**ID:** US-OPE-16

**Nombre de la historia:** Consulta de las fotos de una máquina

**Historia de usuario:**

Como la persona de operaciones,  
necesito ver las fotos actualizadas de una máquina junto a su número de golpes,  
con la finalidad de comparar cómo está hoy contra cómo vuelve de una salida.

**Descripción:**

Las fotos se muestran junto al conteo de golpes acumulados. El resto de operaciones las ve pero no las cambia: cambiarlas es del encargado general.

**Criterios de aceptación:**

- El resto de operaciones las ve pero no las cambia.

---

#### US-OPE-17 — Unidad en mantenimiento

**ID:** US-OPE-17

**Nombre de la historia:** Unidad en mantenimiento

**Historia de usuario:**

Como la persona de operaciones,  
necesito marcar una unidad como en mantenimiento,  
con la finalidad de sacarla de la disponibilidad para que nadie la agende mientras está en el taller.

**Descripción:**

La unidad sale de la disponibilidad sin borrarse y deja de aparecer en el tablero. Se puede marcar en el momento de recibir el equipo, cuando se detecta el problema.

**Criterios de aceptación:**

- La unidad sale de la disponibilidad sin borrarse.
- Se puede marcar al momento de recibir el equipo.
- Desde la ficha de la máquina se devuelve la unidad a servicio y vuelve a aparecer en el tablero.

---

#### US-OPE-18 — Registro de un trabajo de mantenimiento

**ID:** US-OPE-18

**Nombre de la historia:** Registro de un trabajo de mantenimiento

**Historia de usuario:**

Como la persona de operaciones,  
necesito registrar cada trabajo de mantenimiento que se le hace a una máquina,  
con la finalidad de conservar el historial de todo lo que se le ha invertido.

**Descripción:**

Cambio de llanta, cambio de pieza, cambio de aceite y en general todo lo que se le haga al equipo, con su fecha. Hoy esto no está anotado en ninguna parte, y es justamente lo que permitiría saber cuánto cuesta sostener cada máquina.

**Criterios de aceptación:**

- Cambio de llanta, cambio de pieza, cambio de aceite y en general todo lo que se le haga al equipo, con su fecha.
- Hoy esto no está anotado en ninguna parte.
- Se registra el costo del trabajo con su moneda; queda vacío si no costó nada.
- Se indica si lo hizo un taller externo, aparte del costo.
- Si el trabajo fue un cambio de aceite, se define ahí el nuevo umbral del próximo aviso.

---

#### US-OPE-19 — Historial de mantenimiento

**ID:** US-OPE-19

**Nombre de la historia:** Historial de mantenimiento

**Historia de usuario:**

Como la persona de operaciones,  
necesito consultar el historial de mantenimiento de una máquina,  
con la finalidad de saber qué se le ha hecho antes de mandarla al taller otra vez.

**Descripción:**

El historial reúne todos los trabajos registrados con su fecha. Es la base del reporte de costo de mantenimiento que consulta administración.

**Criterios de aceptación:**

- Es lo que permite saber cuánto cuesta sostener cada máquina.

---

#### US-OPE-20 — Corrección de datos fuera de una salida

**ID:** US-OPE-20

**Nombre de la historia:** Corrección de datos fuera de una salida

**Historia de usuario:**

Como la persona de operaciones,  
necesito corregir la gasolina, las horas, los golpes o el estado de una unidad sin abrir una reserva,  
con la finalidad de ajustar lo que pasa fuera de una salida y mantener el dato al día.

**Descripción:**

Pasa seguido que alguien echa gasolina, cambia el aceite o encuentra un golpe cuando no hay ninguna reserva de por medio. Sin esta pantalla el dato se desactualiza y deja de servir. La corrección queda registrada a nombre de quien la hizo.

**Criterios de aceptación:**

- Pasa seguido que alguien echa gasolina, cambia el aceite o encuentra un golpe fuera de una salida.
- La pantalla de máquinas tiene entrada propia desde el panel: se usa de pie junto a la máquina y no puede quedar a cuatro toques de distancia.
- La lista de máquinas muestra, sin abrir ninguna, la gasolina en rayas, las horas o los kilómetros según la métrica de cada una, y si tiene el aceite vencido o está fuera de servicio.
- Solo aparecen las unidades con motor: un kayak no tiene medidor que leer.
- La corrección queda registrada a nombre de quien la hizo.
- La corrección permite ajustar también cuántas rayas tiene el medidor de la unidad.

### EP-OPE-04 — Inventario

#### US-OPE-21 — Consulta del inventario

**ID:** US-OPE-21

**Nombre de la historia:** Consulta del inventario

**Historia de usuario:**

Como la persona de operaciones,  
necesito consultar el inventario por categoría,  
con la finalidad de saber qué tiene la empresa y en qué estado está cada cosa.

**Descripción:**

El inventario cubre todo lo que la empresa tiene, incluidos los jet skis y las lanchas. Al entrar a una categoría identificada una por una se ven sus unidades con su código y su estado, por ejemplo los cuatro o cinco jet skis que haya. Al entrar a una categoría llevada por cantidad se ve cuántos hay y cuántos están disponibles, dañados o en reparación.

**Criterios de aceptación:**

- El inventario cubre todo lo que la empresa tiene, incluidos los jet skis y las lanchas.
- Al entrar a una categoría identificada una por una se ven sus unidades con su código y su estado, por ejemplo los cuatro o cinco jet skis que haya.
- Al entrar a una categoría llevada por cantidad se ve cuántos hay y cuántos están disponibles, dañados o en reparación.

---

#### US-OPE-22 — Marcado de estado de un artículo

**ID:** US-OPE-22

**Nombre de la historia:** Marcado de estado de un artículo

**Historia de usuario:**

Como la persona de operaciones,  
necesito marcar una unidad o un artículo como dañado,  
con la finalidad de que el conteo diga cuántos sirven y no solamente cuántos hay.

**Descripción:**

Los estados son disponible, dañado o en reparación, los mismos que usa el resto del inventario. Un chaleco roto sigue sumando como chaleco si solo se mira el número, y ahí es donde el conteo engaña. Al marcar dañada una unidad de una categoría reservable, el tablero deja de ofrecerla en ese mismo momento.

**Criterios de aceptación:**

- Los estados son disponible, dañado o en reparación, los mismos que usa el resto del inventario.
- Un chaleco roto sigue sumando como chaleco si solo se mira el número, y ahí es donde el conteo engaña.
- Al marcar dañada una unidad de una categoría reservable, el tablero deja de ofrecerla en ese mismo momento.

---

#### US-OPE-23 — Levantamiento de un conteo

**ID:** US-OPE-23

**Nombre de la historia:** Levantamiento de un conteo

**Historia de usuario:**

Como la persona de operaciones,  
necesito levantar un conteo de inventario cuando nosotros lo decidamos,  
con la finalidad de dejar registrado qué había y en qué estado en esa fecha.

**Descripción:**

El conteo cubre todo el inventario, categoría por categoría. En las identificadas una por una se confirma cada unidad y su estado; en las llevadas por cantidad se anota cuántos hay de cada estado. En teoría es mensual, pero no siempre se puede, así que operaciones escoge cuándo hacerlo.

**Criterios de aceptación:**

- El conteo cubre todo el inventario, categoría por categoría.
- En las categorías identificadas una por una se confirma cada unidad y su estado.
- En las categorías llevadas por cantidad se anota cuántos hay de cada estado.
- En teoría es mensual, pero no siempre se puede, así que operaciones escoge cuándo hacerlo.
- El conteo admite notas libres.

---

#### US-OPE-24 — Historial de conteos

**ID:** US-OPE-24

**Nombre de la historia:** Historial de conteos

**Historia de usuario:**

Como la persona de operaciones,  
necesito consultar los conteos de inventario del último año,  
con la finalidad de ver cómo ha cambiado el inventario y desde cuándo falta algo.

**Descripción:**

Cada conteo guarda su fecha y el nombre de quien lo levantó. Comparar dos conteos es lo que permite ver si se perdió algo y en qué momento.

**Criterios de aceptación:**

- Cada conteo guarda su fecha y el nombre de quien lo levantó.
- Cada conteo guarda lo que el sistema tenía registrado en ese momento, y el detalle muestra cuánto faltaba o sobraba en esa fecha.

---

#### US-OPE-25 — Modificación del inventario con firma

**ID:** US-OPE-25

**Nombre de la historia:** Modificación del inventario con firma

**Historia de usuario:**

Como la persona de operaciones,  
necesito poder modificar el inventario quedando registrado a mi nombre,  
con la finalidad de que cualquiera del equipo pueda ajustarlo sin que se pierda quién lo hizo.

**Descripción:**

Cualquier persona de operaciones puede modificar el inventario, con la condición de que cada cambio quede registrado. Es lo que permite trabajar rápido sin perder el control de quién tocó qué.

**Criterios de aceptación:**

- Cualquier persona de operaciones puede modificarlo, con la condición de que cada cambio quede registrado.
- Cada ajuste de cantidades pide su motivo, y la categoría muestra los ajustes anteriores con fecha, motivo y quién lo hizo.

---

#### US-OPE-26 — Aviso por cantidad mínima

**ID:** US-OPE-26

**Nombre de la historia:** Aviso por cantidad mínima

**Historia de usuario:**

Como la persona de operaciones,  
necesito recibir un aviso cuando un artículo baja de su cantidad mínima,  
con la finalidad de reponerlo antes de que haga falta en una salida.

**Descripción:**

Aplica solo a las categorías que administración configuró con aviso por cantidad. Perder un chaleco no ha pasado, pero se está pendiente de eso todo el tiempo, y el aviso es lo que convierte esa preocupación en un dato.

**Criterios de aceptación:**

- Aplica solo a las categorías que administración configuró con aviso por cantidad.
- Perder un chaleco no ha pasado, pero se está pendiente de eso todo el tiempo.

---

#### US-OPE-27 — Aviso por vencimiento

**ID:** US-OPE-27

**Nombre de la historia:** Aviso por vencimiento

**Historia de usuario:**

Como la persona de operaciones,  
necesito recibir un aviso cuando un artículo se acerca a su fecha de vencimiento,  
con la finalidad de reponerlo antes de que quede inservible sin que nadie se dé cuenta.

**Descripción:**

Aplica solo a las categorías configuradas con aviso por vencimiento, como los extintores y el contenido de los botiquines. Los botiquines solo salen en tours y no se pierden, pero su contenido se gasta cuando se usa y además se vence, así que el aviso es por reposición.

**Criterios de aceptación:**

- Aplica solo a las categorías que administración configuró con aviso por vencimiento, como los extintores y el contenido de los botiquines.
- La anticipación del aviso sale de la configuración de la categoría.

---

## Requisitos no funcionales

Reglas que aplican a todo el sistema. Se listan aquí una sola vez en lugar de repetirlas dentro de cada historia.

### Seguridad y sesión

| ID      | Requisito                                                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-001 | Autenticación resuelta con Supabase. Cada persona entra con su propio usuario y nadie digita la contraseña de otro.                                                                                     |
| RNF-002 | La contraseña exige mayúscula, minúscula, número y símbolo, con largo mínimo y largo máximo. Las reglas se muestran desde antes de escribirla donde se escoge una contraseña nueva.                     |
| RNF-003 | La cuenta de un trabajador se bloquea al llegar a diez intentos fallidos seguidos y solo administración la desbloquea.                                                                                  |
| RNF-004 | La recuperación de contraseña se hace con un PIN de un solo uso enviado al correo personal, para todos los roles. No hay inicio de sesión con Google ni con otro proveedor.                             |
| RNF-005 | El sistema tiene una sola cuenta de administración. No se bloquea nunca: pasados los diez intentos entra al proceso de recuperación, que es su única salida.                                            |
| RNF-006 | Si se pierde el acceso a esa cuenta y a su correo, la única vía que queda es reponer la contraseña desde la consola de Supabase, por fuera de la aplicación. Hay que tener claro quién tiene esa llave. |
| RNF-007 | De 7:00 a. m. a 7:00 p. m. la sesión no caduca por inactividad. De 7:00 p. m. a 7:00 a. m. se cierra a los treinta minutos sin actividad, contados desde la última acción.                              |
| RNF-008 | La franja horaria se evalúa en el servidor y no con el reloj del dispositivo.                                                                                                                           |
| RNF-009 | No se guardan llaves sensibles en el dispositivo del trabajador, y las operaciones delicadas se resuelven fuera del celular.                                                                            |

### Roles y permisos

| ID      | Requisito                                                                                                                                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-010 | Lo que cada persona ve y puede hacer depende de su rol base, de sus áreas adicionales y del modo activo.                                                                                                                        |
| RNF-011 | La restricción nunca se queda en esconder botones: el servidor rechaza la operación aunque se intente por otro camino.                                                                                                          |
| RNF-012 | El sistema tiene una sola cuenta de administración y no se puede bloquear ni eliminar.                                                                                                                                          |
| RNF-013 | Las marcas sobre una cuenta son independientes del rol y se ponen y se quitan por aparte. Hoy son tres: guía, encargado general y registro de guías externos.                                                                   |
| RNF-014 | Las áreas se habilitan completas y los permisos sueltos no existen. Lo que no es un área es una marca, y las marcas son pocas y con nombre propio.                                                                              |
| RNF-048 | El modo de trabajo restringe, nunca otorga. Estando en modo operaciones la cuenta no alcanza nada de reservas aunque tenga esa área habilitada, y ninguna pantalla decide con las áreas de la cuenta cuando hay un modo activo. |

Sobre RNF-013, el alcance de cada marca:

- La marca de guía no otorga permisos: solo hace que la persona aparezca en la lista al asignar un tour.
- La de encargado general habilita subir las fotos de estado de las máquinas.
- La de registro de guías externos habilita a alguien de reservas para crear esas cuentas temporales.

### Estados de una reserva

| ID      | Requisito                                                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-015 | Agendada: la reserva existe en el calendario y el equipo queda comprometido para su franja horaria.                                                                  |
| RNF-016 | Despachada: salió al menos un grupo de su equipo y corre el conteo hasta la hora de regreso de cada grupo.                                                           |
| RNF-017 | Cerrada: volvió el último grupo, se registró cómo volvió y la reserva pasa al historial.                                                                             |
| RNF-018 | Cancelada: la reserva se anuló con su motivo, deja de mostrarse en la aplicación de operaciones y pasa al historial.                                                 |
| RNF-019 | Posponer no es un estado. La reserva vuelve a agendada con la fecha nueva y queda el rastro del cambio.                                                              |
| RNF-020 | Una reserva se puede cancelar tanto desde agendada como desde despachada.                                                                                            |
| RNF-021 | Solo las reservas cerradas y las canceladas salen del trabajo diario y viven en el historial.                                                                        |
| RNF-049 | Una unidad despachada nunca cuenta como libre, aunque la hora real de regreso de su salida ya haya vencido. Libres más en uso nunca supera el total de la categoría. |

### Trazabilidad

| ID      | Requisito                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-022 | Toda reserva, despacho, cierre, cobro, conteo de inventario, reporte de daño y trabajo de mantenimiento guarda quién lo creó y quién lo modificó de último, con su fecha. |
| RNF-023 | Esa firma se muestra en el detalle del registro y en el historial, para saber si el dato lo metió una persona u otra.                                                     |
| RNF-024 | Los ajustes de inventario y los movimientos de dinero quedan siempre a nombre de quien los hizo.                                                                          |

### Tiempo real y rendimiento

| ID      | Requisito                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-025 | La información se actualiza sola en todos los dispositivos, sin refrescar la pantalla.                                                |
| RNF-026 | La aplicación tiene que abrir rápido incluso con señal mala, porque se abre y se cierra decenas de veces al día a la orilla del lago. |
| RNF-027 | La paginación se resuelve en el servidor y es obligatoria en todos los listados.                                                      |
| RNF-028 | El estado ocupada de una unidad y la disponibilidad por franja horaria los calcula el sistema, no se digitan.                         |

### Fecha y hora

| ID      | Requisito                                                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-050 | Toda fecha y toda hora se calculan y se muestran en hora de Costa Rica, sin importar el reloj ni la zona horaria del servidor donde corra la aplicación.             |
| RNF-051 | El hoy del calendario, de la lista de despacho y de los reportes se arma con esa misma hora, para que el muelle no deje de ver las salidas del día al caer la tarde. |

### Sin borrado físico

| ID      | Requisito                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------- |
| RNF-029 | La cuenta de un trabajador se bloquea, no se borra, para no perder el historial de lo que hizo. |
| RNF-030 | Una unidad se da de baja y conserva sus reportes de daño y su historial de mantenimiento.       |
| RNF-031 | Una reserva cancelada queda como cancelada y pasa al historial con su motivo.                   |

### Retención de datos

| ID      | Requisito                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| RNF-032 | El historial de conteos de inventario se conserva un año hacia atrás.                                                               |
| RNF-033 | El historial de reservas se conserva cinco años. Si el plan de Supabase contratado no alcanza para ese volumen, se baja a dos años. |

### Dinero

| ID      | Requisito                                                                                                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-034 | El sistema lleva el control del dinero pero no lo mueve: no procesa pagos, no valida tarjetas y no convierte monedas.                                                                               |
| RNF-035 | Los montos en dólares y en colones se muestran separados y nunca se suman en un solo total.                                                                                                         |
| RNF-036 | Una reserva se puede cobrar en dos tractos, con una parte en dólares y otra en colones. Cada parte se guarda en su moneda.                                                                          |
| RNF-037 | Reservas ajusta el precio libremente al momento de cobrar, sin margen ni tope. El monto acordado se guarda por moneda, porque un cobro mixto necesita un acordado en cada una para llegar a saldar. |
| RNF-038 | Operaciones no ve información de dinero de ninguna reserva: ni cobros, ni devoluciones, ni depósitos. Sí consulta el catálogo de precios, que es otra cosa.                                         |

### Móvil primero y español

| ID      | Requisito                                                                                                                                                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-039 | La aplicación se diseña primero para el celular, porque quien la usa está de pie en la playa o en el muelle.                                                                                                                     |
| RNF-040 | Los botones son grandes y separados, pensados para usarse con una mano y con las manos mojadas.                                                                                                                                  |
| RNF-041 | Toda la interfaz está en español.                                                                                                                                                                                                |
| RNF-052 | Las preferencias de presentación se guardan en el dispositivo y no en la cuenta: el mismo trabajador usa el teléfono al sol y la computadora bajo techo. Hoy son el tema, la vista del calendario y la distribución del tablero. |

### Infraestructura

| ID      | Requisito                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------- |
| RNF-042 | El proyecto corre sobre el plan de Supabase de veinticinco dólares.                               |
| RNF-043 | El plazo de cinco años del historial de reservas depende de que ese plan alcance para el volumen. |

### Fuera de esta versión

| ID      | Requisito                                                                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-044 | Modo sin conexión para registrar despachos y cierres sin señal, con sincronización posterior. Complica demasiado el sistema para lo que devuelve y queda anotado como mejora posterior. |
| RNF-045 | Foto del estado del equipo en cada salida y cada regreso. Se descarta por espacio y se mantiene solamente la foto actualizada por jet ski.                                              |
| RNF-046 | Integración automática con FareHarbor. Por ahora los dos sistemas conviven sin hablarse.                                                                                                |
| RNF-047 | El sitio público de marketing, que es un proyecto aparte y donde sí entra el cliente final.                                                                                             |

---

## Anexo. Decisiones del proyecto

Las decisiones las toma el dueño del repositorio y el resto del equipo las lee. Todas las de esta lista están cerradas y bajadas a regla dentro del documento. No queda ninguna decisión abierta.

### Decisiones tomadas antes de construir

- **La sesión no caduca por inactividad durante la jornada, de 7:00 a. m. a 7:00 p. m.**
  - El trabajo es de campo y obligar a escribir una contraseña con las manos mojadas frena la operación.
  - Fuera de ese horario aplican treinta minutos de inactividad.
  - Se acepta que un dispositivo desatendido quede abierto durante la jornada, considerando que el equipo es de seis personas conocidas y el teléfono es personal.
  - No se pide PIN ni huella para volver: el trabajador guarda su usuario y su contraseña en el teléfono y entra con un clic.
- **Ninguna operación vuelve a pedir la contraseña estando la sesión activa.**
  - El sistema lleva el control del dinero pero no mueve dinero real, así que no hace falta una segunda confirmación.
- **Las capacidades que no son un área completa se resuelven con marcas sobre la cuenta. Hoy son tres.**
  - La marca de guía habilita a la persona para que se le asigne un tour.
  - La marca de encargado general habilita a la persona para subir las fotos de estado de las máquinas.
  - La marca de registro de guías externos habilita a alguien de reservas para crear esas cuentas temporales.
  - Se escogió la marca en vez de una lista de permisos sueltos, para no terminar con veinte casillas que nadie puede auditar.
- **Administración habilita áreas adicionales sobre una cuenta, y quien tenga más de un área escoge el modo al entrar.**
  - Se habilitan áreas completas y no permisos sueltos.
  - Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área, para no mezclar pantallas.
- **La trazabilidad se resuelve con la firma en cada registro y no con una pantalla de bitácora.**
  - Cada registro guarda quién lo creó y quién lo modificó de último.
  - Con eso se sabe si la reserva la metió una persona u otra, que es lo que se necesita.
- **Del cliente se guarda solamente el nombre a que va la reserva y la cantidad de personas.**
  - El correo y los demás datos de contacto ya viven en FareHarbor.
- **La advertencia por choque de disponibilidad avisa pero no bloquea.**
- **El sistema no maneja tipo de cambio y los montos van separados por moneda.**
  - Una misma reserva se puede cobrar en dos tractos, con una parte en dólares y otra en colones.
  - Cada parte se guarda en su moneda y los totales nunca se suman entre sí.
- **Reservas ajusta el precio al momento de cobrar, sin margen ni tope.**
  - A veces se juega con el precio para atraer más clientes.
- **La devolución de dinero al cliente la anota reservas y nadie la autoriza dentro del sistema.**
  - En la práctica el criterio es del jefe, pero eso queda fuera de la aplicación.
  - Como no se mueve dinero real, el registro sirve solamente para llevar el control.
- **Cada artículo de inventario define su propio aviso.**
  - Puede ser por cantidad, por fecha de vencimiento, por ambas cosas o por ninguna.
  - Los chalecos avisan por cantidad y los extintores por vencimiento.
  - Cuando se agrega un artículo nuevo, administración decide qué aviso le corresponde o si no lleva ninguno.
- **El historial de reservas se conserva cinco años.**
  - Si el plan de Supabase contratado no alcanza para ese volumen, se baja a dos años.
  - El historial de conteos de inventario ya estaba definido en un año.
- **Las fotos de estado de una máquina son varias y las sube el encargado general.**
  - Una por ángulo: costado derecho, costado izquierdo y frente, y opcionalmente una por debajo.
  - Sirven para ver el detalle de los daños y tener una referencia de cómo está la máquina hoy.
  - El resto de operaciones las ve pero no las cambia.
- **Del guía externo se guardan solo el nombre y la cédula, y su registro lleva fecha de caducidad.**
  - Cumplida la fecha queda inhabilitado y administración lo ve así en su lista.
- **El uso se mide en horas de motor para el equipo de agua y en kilometraje para los cuadraciclos.**
  - Las lanchas y los jet skis llevan horas de motor.
  - Los cuadraciclos llevan kilometraje.
  - De cualquiera de los dos sale el aviso del próximo cambio de aceite.
- **Una reserva tiene cuatro estados: agendada, despachada, cerrada y cancelada.**
  - Posponer no es un estado: la reserva vuelve a agendada con la fecha nueva.
  - Se puede cancelar tanto desde agendada como desde despachada.
- **El cobro es por reserva y no por persona.**
  - Si se agendó una lancha para seis y solo llegan dos, se cobra lo mismo y no se devuelve dinero, porque el precio ya se incluyó.
  - Por eso al partir una reserva el cobro no se parte: se queda completo en la original, a nombre del mismo cliente.
  - El cobro se puede registrar en cualquier momento, desde que se agenda hasta que se cierra.
  - El tiempo que el cliente se pase de su hora se cobra aparte, como tiempo adicional dentro de la misma reserva.
- **Una reserva ya despachada solo se pospone por clima: lluvia muy fuerte o tormenta.**
  - El equipo se cierra y vuelve al tablero con la gasolina y las horas de lo que sí se usó.
  - El cobro y el depósito se conservan para la fecha nueva, sin volver a cobrarle al cliente.
  - Una reserva que todavía no ha salido se pospone por el motivo que sea.
- **El depósito de garantía se configura por categoría.**
  - Doscientos dólares o cien mil colones en los jet skis, y el monto se puede modificar.
  - Hay categorías sin depósito, y administración le puede agregar uno a otras, como los cuadraciclos.
  - Al cerrar, reservas indica cuánto del depósito se le devuelve al cliente: todo si el equipo volvió en orden, o un monto puntual si hubo daño, anotando qué se dañó; el resto se lo queda la empresa.
  - Lo retenido entra al reporte de ingresos.
- **El inventario es un solo registro de todo lo que la empresa tiene.**
  - Ahí entran los jet skis, las lanchas y los cuadraciclos igual que los remos, los chalecos y los extintores.
  - El equipo reservable no es un registro aparte: es la parte del inventario cuya categoría está marcada como reservable.
  - El conteo que levanta operaciones cubre todo, y al entrar a la categoría de jet skis salen los cuatro o cinco que haya.
  - El tablero y el inventario son dos pantallas distintas sobre ese mismo registro: el tablero filtra lo reservable y sirve para agendar y despachar; el inventario lo muestra todo y sirve para contar y marcar estado.
  - Así una unidad se registra una sola vez, y si operaciones la marca dañada en el conteo, el tablero deja de ofrecerla en el momento.
- **El proyecto corre sobre el plan de Supabase de veinticinco dólares.**
  - El responsable del mantenimiento del sistema es quien prueba la restauración del respaldo.
- **La recuperación de contraseña se hace con un PIN al correo personal, para todos los roles.**
  - Se descartó el enlace de un solo uso: en celular el PIN funciona mejor y es un solo mecanismo que programar.
  - No se usa inicio de sesión con Google ni con otro proveedor, aunque Supabase lo soporta, porque en este sistema se entra por nombre de usuario y no por correo.
- **El bloqueo por intentos fallidos es a los diez, para todos.**
- **El sistema tiene una sola cuenta de administración y nunca se bloquea.**
  - Pasados los diez intentos entra al proceso de recuperación en vez de bloquearse, porque no hay otra cuenta que la desbloquee.
  - Por eso su correo personal es obligatorio, mientras que en las demás cuentas es opcional.
  - La consola de Supabase queda como salida de emergencia si se pierde también el correo.
- **El guía externo tiene cuenta temporal con rol de operaciones y marca de guía.**
  - Hace el mismo trabajo que operaciones, así que ve lo mismo.
  - La puede crear reservas, pero solo si administración le puso la marca que lo habilita.
  - Reservas solo puede crear este tipo de cuenta, ninguna otra.
  - La cuenta se identifica como guía externo y queda firmada por quien la creó.
- **Los extras que ocupan equipo real se comprometen por franja igual que cualquier otra unidad.**
  - Fue la última decisión de esta lista en cerrarse.
  - Al quedar el inventario como un solo registro, un extra reservable no necesita un mecanismo aparte.

### Decisiones tomadas durante la construcción

Estas salieron de construir el sistema y de probarlo en un teléfono, no de las reuniones iniciales. Cada una corrigió una regla que el documento daba por buena, y cada una ya está aplicada en las historias de arriba.

- **Se reserva la categoría, no la unidad.** Palabras del dueño: _en reservaciones no se aparta un jet ski, solo menciona que viene un jet ski. No cuál_.
  - Al agendar con horas de anticipación nadie sabe cuál jet ski estará libre, cargado y sin golpes. Esa decisión es del muelle y se toma al despachar.
  - La regla no es cómo se inventaría una categoría sino **si sus unidades son intercambiables**, que es otra pregunta. Un jet ski se lleva uno por uno y sigue siendo cualquier jet ski; una lancha se lleva una por una y es una lancha concreta, porque solo la Bennington arrastra y el wakeboard y el tubing dependen de eso.
  - Obligó a corregir US-RES-07, que decía lo contrario.
- **La gasolina se lee en rayas, no en porcentaje.** Ningún medidor de estos habla en porcentajes: tienen rayas. El nivel se registra sobre el máximo de rayas de la unidad, que son seis en los cuadraciclos y cuatro en jet skis y lanchas.
- **La duración se pide en horas, no en minutos crudos.** Las rentas se venden por hora y ciento noventa minutos no es una unidad que nadie use acá. Botones de media hora, una, hora y media, dos y tres horas, con escape numérico.
- **Todo el tiempo se calcula en hora de Costa Rica.** Sin fijarla, la aplicación usaba la zona del proceso: en una laptop tica se veía bien, y en el servidor, que corre en UTC, el muelle dejaba de ver las salidas de hoy a partir de las siete de la noche.
- **El modo de trabajo restringe, nunca otorga.** El calendario decidía con las áreas de la cuenta y no con el modo activo, así que alguien de operaciones con permiso de reservas podía crear reservas desde el modo operaciones.
- **Las preferencias de presentación se guardan por dispositivo.** El tema, la vista del calendario y la distribución del tablero viven en el dispositivo y no en la cuenta, porque el mismo trabajador usa el teléfono al sol y la computadora bajo techo. Quien quiere Jet Ski de primero no está decidiendo por nadie más.
- **El tema claro es el de sol, no el de interiores.** Al aire libre una pantalla de teléfono se lee mejor sobre fondo claro, porque su luminancia se suma a la reflejada mientras que un fondo oscuro solo espeja el brillo. Por eso la paleta apunta a 6:1 y 7:1 de contraste en vez del mínimo de 4.5:1.
- **Una unidad despachada nunca cuenta como libre**, aunque su franja horaria ya haya vencido. Antes los libres se calculaban por ventana horaria y los en uso por estado de la reserva, así que una salida pasada de hora liberaba equipo que seguía en el lago.
- **El precio se acuerda por moneda.** Una reserva que se cobra parte en dólares y parte en colones necesita un monto acordado en cada moneda; con uno solo, un cobro mixto nunca llegaba a saldar.
- **Los combos se venden con precio nacional y precio extranjero.** Es la práctica de la empresa y no se resolvía con un solo precio de paquete.
- **Administración agrupa categorías para el tablero.** Los kayaks sencillos y los dobles son dos categorías y se muestran como una sola tarjeta, sin fusionarse por dentro, porque en el muelle se pregunta cuántos kayaks hay.
- **Operaciones consulta precios sin ver dinero de reservas.** Son dos cosas distintas: el catálogo de tarifas es información del negocio que se pregunta a diario en el muelle; los cobros, devoluciones y depósitos de una reserva no.
- **Las unidades las gestiona solo administración, y una baja no se revierte.** Decisión de Kendall (responsable de la historia US-ADM-16): el código distingue mayúsculas, las rayas del medidor se pueden corregir aunque haya lecturas, los campos de motor solo existen en categorías con motor y una unidad dada de baja no se reactiva, porque su historial de mantenimiento y de reservas debe seguir cuadrando.
