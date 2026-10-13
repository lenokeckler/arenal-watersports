<!-- Documento vivo. Nació de Flujo_Proyecto_Ordenado.docx; el original entregado se guarda fuera del repositorio. Desde entonces se corrigió contra lo que se construyó: ese .docx ya no es la fuente de verdad, este archivo sí. -->

# Flujo del Proyecto

Sistema interno de operaciones para Arenal Water Sports. Este documento describe el flujo completo de la aplicación en orden de uso, desde el ingreso al sistema hasta el trabajo diario de cada rol. Es el insumo directo del que salieron las historias de usuario y el Product Backlog: cada encabezado de epic corresponde a un item del backlog, y cada historia lleva el mismo identificador que en `historias-de-usuario.md`. La aplicación reemplaza el agendado en Google Calendar y la coordinación por WhatsApp por un lugar único donde la información vive y se consulta. No es la página pública de la empresa: el cliente final no entra aquí, los usuarios son los trabajadores, y por eso la aplicación se piensa primero para el celular.

Los tres documentos de `docs/proyecto/` se leen juntos y dicen lo mismo: este describe el flujo, `historias-de-usuario.md` lleva el detalle y los criterios de aceptación de cada historia, y `product-backlog.md` lleva el dueño y el estado. Cubren 25 epics y 114 historias, y las reglas que cambiaron mientras se construía están corregidas en los tres, con su explicación en el anexo.

## Actores del sistema

Tres roles cubren la operación. El guía no es un rol aparte y las áreas adicionales permiten que una misma persona trabaje en más de un lado.

- Roles del sistema
  - Administración
    - Configura el equipo disponible, define las tarifas, da de alta y de baja a los trabajadores y decide qué se lleva en el inventario.
    - Su acceso completo es sobre el área de administración. Para trabajar además en reservas o en operaciones necesita que esas áreas se le habiliten, igual que cualquier otra cuenta.
    - Es la única cuenta que puede habilitar áreas, poner marcas y crear cuentas de planta.
  - Reservas
    - Trabaja desde la oficina y es quien atiende al cliente.
    - Agenda, consulta el calendario, cobra, modifica y cancela.
  - Operaciones
    - Es quien está en la playa.
    - Despacha equipo, cierra reservas y registra gasolina, horas de motor, daños y mantenimiento.
  - Guía
    - No es un rol separado sino una marca sobre la cuenta de un trabajador.
    - La misma persona puede estar en operaciones y salir de guía en un tour.
  - Encargado general
    - Tampoco es un rol separado, sino otra marca sobre la cuenta de una persona de operaciones.
    - Es quien puede subir y reemplazar las fotos de estado de las máquinas.
  - Registro de guías externos
    - Tercera marca, esta vez sobre una cuenta de reservas.
    - Habilita a esa persona para crear cuentas temporales de guía externo.
    - Sin la marca, reservas no puede crear ninguna cuenta: es administración quien decide a quién se lo permite.
  - Guía externo
    - Persona contratada por fuera que acompaña un tour y hace el mismo trabajo de operaciones.
    - Tiene una cuenta temporal con rol de operaciones y marca de guía, así que ve y hace lo mismo que el resto de operaciones.
    - Se registra por nombre y cédula, con fecha de caducidad obligatoria.
    - Cumplida esa fecha la cuenta queda inhabilitada y no entra más al sistema.
- Áreas adicionales sobre una cuenta
  - Administración habilita áreas adicionales sobre la cuenta de cualquier trabajador
    - Se habilitan áreas completas, no permisos sueltos.
    - Sirve para quien unos días atiende reservas y otros días despacha en la playa.
    - Quien queda con más de un área escoge el modo con el que va a trabajar al entrar.
    - El área se puede quitar en cualquier momento.

## Módulo Acceso y Sesión

Rol: todos los trabajadores. Es la puerta de entrada al sistema. Cada persona entra con su propio usuario, y lo que ve y lo que puede hacer después depende de su rol y del modo con el que trabaje.

### EP-ACC-01 — Ingreso al sistema

**US-ACC-01 — Como trabajador ingreso al sistema con mi usuario y contraseña**

- Ingreso por nombre de usuario y contraseña.
- Ojito para ver u ocultar la contraseña.
- Los errores se muestran en mensajes rojos junto al campo que los provoca.
- Autenticación resuelta con Supabase.

**US-ACC-02 — Como trabajador recibo un mensaje claro cuando no logro entrar**

- Usuario no registrado.
- Contraseña incorrecta.
- Cuenta bloqueada por intentos fallidos.
- Cuenta bloqueada por administración.
- Sesión cerrada por inactividad.
- El mensaje nunca revela cuáles nombres de usuario existen en el sistema.

**US-ACC-03 — Como trabajador cambio mi contraseña la primera vez que ingreso**

- El sistema verifica si es el primer ingreso de esa cuenta.
- Se confirma la contraseña temporal, se escribe la nueva y se repite.
- No se avanza a ninguna pantalla del sistema hasta completarlo.
- La contraseña nueva cumple los requisitos de seguridad.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.

**US-ACC-04 — Como trabajador cambio mi contraseña cuando yo quiera**

- Se confirma la actual, se escribe la nueva y se repite.
- La contraseña nueva cumple los requisitos de seguridad.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.

**US-ACC-05 — Como trabajador registro mi correo personal en mi cuenta**

- La empresa no da correo propio, así que cada trabajador registra el suyo.
- Es el correo al que llega el enlace de recuperación.

**US-ACC-06 — Como trabajador recupero mi contraseña con el PIN que llega a mi correo**

- El sistema envía un PIN al correo personal registrado en la cuenta.
- Se escribe el PIN en pantalla, después la contraseña nueva, y se repite.
- Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar.
- El PIN es de un solo uso y vence a los pocos minutos.
- Si la cuenta no tiene correo registrado, administración genera una contraseña temporal.
- No hay inicio de sesión con Google ni con ningún otro proveedor: el ingreso es siempre por usuario y contraseña.

**US-ACC-07 — Como administración recupero mi contraseña sin depender de nadie**

- Aplica cuando olvido la clave y cuando paso de diez intentos de ingreso.
- La cuenta de administración no se bloquea: pasados los diez intentos el sistema ofrece el proceso de recuperación.
- El PIN llega al correo personal de la cuenta de administración, que por eso es obligatorio.
- Al terminar el cambio, el contador de intentos vuelve a cero.
- Es la única salida de la cuenta de administración, porque no hay otra cuenta que la desbloquee.

**US-ACC-08 — Como trabajador cierro sesión desde cualquier pantalla**

- El sistema descarta el token y devuelve al login.

**Validaciones del ingreso**

- La contraseña exige mayúscula, minúscula, número y símbolo, con largo mínimo y largo máximo.
- La cuenta de un trabajador se bloquea al llegar a diez intentos fallidos seguidos, y solo administración la desbloquea.
- La cuenta de administración no se bloquea: pasados los diez intentos entra al proceso de recuperación.
- El correo personal es obligatorio en la cuenta de administración y opcional en las demás.
- Nadie digita la contraseña de otro usuario: administración solo genera temporales de un solo uso.
- El nombre de usuario es único en todo el sistema.

### EP-ACC-02 — Sesión y modo de trabajo

**US-ACC-09 — Como trabajador mantengo la sesión abierta durante toda la jornada**

- De 7:00 a. m. a 7:00 p. m. la sesión no caduca por inactividad.
- Quien entra a las 9:00 a. m. sigue dentro hasta las 7:00 p. m. sin volver a escribir su contraseña.
- La razón es que el trabajo es de campo y escribir una contraseña con las manos mojadas frena la operación.

**US-ACC-10 — Como trabajador se me cierra la sesión por inactividad fuera del horario de trabajo**

- De 7:00 p. m. a 7:00 a. m. aplican treinta minutos sin actividad.
- El contador corre desde la última acción en pantalla y cada acción lo reinicia.
- No hay aviso previo: la sesión se cierra y el mensaje de inactividad aparece en el login.
- Al llegar las 7:00 p. m. el sistema evalúa cuánto lleva la persona sin actividad, y si ya pasó de treinta minutos cierra la sesión de una.
- Quien esté trabajando de noche sigue dentro mientras siga usando la aplicación.
- La franja horaria se evalúa en el servidor y no con el reloj del dispositivo.

**US-ACC-11 — Como trabajador con más de un área escojo el modo con el que voy a trabajar**

- La pantalla aparece solo si administración le habilitó más de un área a esa cuenta.
- Se presenta un cuadro grande por área: Operaciones, Reservas o Administración.
- Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área, para no mezclar pantallas.
- El modo restringe y nunca otorga: estando en un modo la cuenta no alcanza las funciones de sus otras áreas.
- Se puede cambiar de modo sin cerrar sesión, desde un control visible en la aplicación.
- La aplicación recuerda el último modo usado y entra directo en ese.
- Quien tiene una sola área entra directo a su módulo y nunca ve esta pantalla.

## Módulo Tablero y Navegación

Rol: todos los trabajadores. Es lo que ve cualquier persona apenas entra, sin importar su rol. El contenido cambia según el rol y el modo activo, pero la forma de moverse es la misma para todos.

### EP-TAB-01 — Tablero de equipo

**US-TAB-01 — Como trabajador veo el tablero como pantalla de entrada**

- Se muestra una tarjeta por cada categoría reservable del inventario.
- Cada tarjeta indica cuántas unidades hay libres y cuántas están en uso sobre el total: en el muelle la pregunta es también cuánto hay en el agua.
- Una unidad despachada nunca cuenta como libre, aunque la hora real de regreso de su salida ya haya vencido.
- Las categorías que administración agrupó se muestran como una sola tarjeta, con los totales sumados y sin fusionarse por dentro.
- En pantalla de celular las tarjetas van de dos en dos.
- Es la vista que responde de un vistazo qué hay disponible en este momento, y desde donde se escoge el equipo para una reserva.
- Los chalecos, los remos y los extintores no salen aquí: viven en el inventario, que es otra pantalla y sirve para contar, no para agendar.

**US-TAB-02 — Como trabajador entro a una categoría y veo el estado de cada unidad**

- Estado de cada unidad: disponible, ocupada, en mantenimiento o dañada.
- Cuando la unidad está ocupada se muestra la hora a la que regresa, a qué reserva pertenece y quién la lleva.
- Desde ahí se abre el detalle de la reserva.
- El estado ocupada lo calcula el sistema a partir de los despachos, no se digita.
- Reservas consulta esta pantalla para contestarle al cliente, pero no despacha desde aquí: despachar es de operaciones.
- Operaciones sí despacha desde aquí, sin dar la vuelta por la lista del día.

**US-TAB-03 — Como trabajador veo el tablero actualizarse solo cuando un compañero despacha o cierra una reserva**

- La información se actualiza en todos los dispositivos sin refrescar la pantalla.
- Si alguien despacha un jet ski desde su teléfono, el resto del equipo lo ve en ese mismo momento.

### EP-TAB-02 — Navegación y uso en campo

**US-TAB-04 — Como trabajador me muevo por la aplicación desde la navegación fija de la parte de abajo**

- Da acceso al tablero, al calendario, al inventario y al historial.
- Las opciones que se muestran dependen del rol y del modo activo.

**US-TAB-05 — Como trabajador uso la aplicación desde el celular con una sola mano**

- Los botones son grandes y están separados entre sí.
- Está pensada para usarse de pie, en la playa o en el muelle, y con las manos mojadas.
- Toda la interfaz está en español.

**US-TAB-06 — Como trabajador abro la aplicación con señal mala y carga rápido**

- La aplicación se abre y se cierra decenas de veces al día, así que el arranque rápido pesa más que casi cualquier otra cosa.
- Trabajar sin conexión y sincronizar después queda fuera de esta versión.

### EP-TAB-03 — Visibilidad y restricción por rol

**US-TAB-07 — Como trabajador veo solo las opciones que me corresponden por mi rol y por mi modo**

- Lo que no corresponde no se muestra en pantalla.
- La restricción no se queda en esconder botones: aunque se intente por otro camino, el servidor rechaza la operación.
- El modo restringe y nunca otorga: ninguna pantalla decide con las áreas de la cuenta cuando hay un modo activo.
- Operaciones no alcanza el dinero de una reserva por ningún camino, ni siquiera leyendo la fila de la reserva.

**US-TAB-08 — Como trabajador consulto los listados en tablas con filtros y paginación**

- Aplica al historial, al inventario y a la lista de trabajadores.
- La paginación se resuelve en el servidor y trae solamente la página que se está viendo.

### EP-TAB-04 — Historial de reservas

**US-TAB-09 — Como trabajador consulto el historial de reservas cerradas**

- Toda reserva cerrada pasa al historial, y a partir de ahí se construyen las estadísticas.
- Se muestra el nombre a que iba la reserva, la fecha, el equipo, el guía y quién la atendió.
- Filtros por fecha, por tipo de reserva y por equipo.
- El detalle de cada registro indica quién lo creó y quién lo modificó de último.

### EP-TAB-05 — Consulta de precios en campo

**US-TAB-10 — Como operaciones consulto los precios de rentas, tours y combos**

- La pantalla lista las tarifas por categoría y por tipo de salida.
- Lista también los precios de los extras y los precios de paquete de los combos, cada uno en la sección de su público.
- Los montos se muestran separados por moneda y nunca se suman.
- Es de solo lectura: desde ahí no se modifica ninguna tarifa.
- No muestra cobros, devoluciones ni depósitos de ninguna reserva, porque operaciones no recibe dinero de nadie.
- Solo aparecen las tarifas, los extras y los combos activos.
- Existe porque en el muelle preguntan el precio a diario, y hoy operaciones tiene que subir a la oficina o llamar por radio para contestar.

### EP-TAB-06 — Preferencias del dispositivo

**US-TAB-11 — Como trabajador escojo el tema con el que leo la aplicación**

- Se escoge entre tema claro y tema oscuro desde el panel, sin cerrar sesión.
- El tema claro es el de sol y no el de interiores: al aire libre una pantalla se lee mejor sobre fondo claro, porque su luminancia se suma a la que refleja.
- La preferencia se guarda en el dispositivo y no en la cuenta: la misma persona usa el teléfono en el muelle y la computadora en la oficina.
- La aplicación abre con el tema escogido la última vez en ese dispositivo.
- Toda la interfaz responde al tema, sin tarjetas ni modales que solo se vean en uno de los dos.

**US-TAB-12 — Como trabajador acomodo el tablero a mi manera de trabajar**

- Se escoge cuántas tarjetas van por fila, entre dos y tres.
- Las categorías se reordenan arrastrándolas, con el dedo en el teléfono y con el mouse en la computadora.
- La distribución y el orden se guardan en el dispositivo y no en la cuenta: quien quiere Jet Ski de primero no está decidiendo por nadie más.
- El orden guardado es una pista y nunca la verdad sobre qué categorías existen. Una categoría que ya no está se ignora, y una que el orden no menciona conserva su posición al final.
- Nadie tiene que volver a acomodar su tablero porque administración agregó o quitó una categoría.

## Módulo Administración

Rol: administración. Configura el inventario, los extras, los combos, las tarifas y las cuentas de los trabajadores, y es quien mira el negocio con números. Su acceso completo es sobre esta área: para trabajar además en reservas o en operaciones necesita que esas áreas se le habiliten, igual que cualquier otra cuenta. Los epics van en orden de dependencia: sin categorías no hay unidades, y sin unidades ni tarifas no hay reserva que cobrar.

### EP-ADM-01 — Trabajadores, roles y permisos

**US-ADM-01 — Como administración agrego un trabajador y le asigno su rol**

- Se registran el nombre de la persona y su nombre de usuario.
- El rol base es administración, reservas u operaciones.
- El sistema genera una contraseña temporal de un solo uso.
- El trabajador cambia esa contraseña en su primer ingreso.

**US-ADM-02 — Como administración habilito áreas adicionales sobre la cuenta de un trabajador**

- Se habilitan áreas completas, no permisos sueltos.
- Sirve para quien unos días atiende reservas y otros días despacha en la playa.
- Quien queda con más de un área ve el selector de modo al entrar.
- El área se puede quitar en cualquier momento y el acceso se corta de inmediato.

**US-ADM-03 — Como administración marco a un trabajador como guía**

- La marca va sobre la cuenta y no crea un rol nuevo.
- Solo los trabajadores marcados como guía aparecen en la lista al asignar un tour.

**US-ADM-04 — Como administración marco a un trabajador como encargado general de operaciones**

- La marca va sobre la cuenta, igual que la de guía, y no crea un rol nuevo.
- Es quien puede subir y reemplazar las fotos de estado de las máquinas.

**US-ADM-05 — Como administración habilito a alguien de reservas para registrar guías externos**

- Es una marca sobre la cuenta, igual que la de guía y la de encargado general, y no crea un rol nuevo.
- Sin esa marca, la persona de reservas no ve la opción de crear la cuenta y el servidor le rechaza la operación.
- La marca se puede quitar en cualquier momento.
- Administración siempre puede crear esas cuentas, con marca o sin ella, porque es quien crea todas las cuentas del sistema.

**US-ADM-06 — Como administración desbloqueo la cuenta de un trabajador**

- Aplica a la cuenta de un trabajador que llegó a los diez intentos fallidos.
- La cuenta de administración no llega a bloquearse, así que no hace falta desbloquearla.

**US-ADM-07 — Como administración genero una nueva contraseña temporal**

- Aplica al trabajador que perdió la suya y no tiene correo personal registrado.
- La contraseña es de un solo uso y obliga a cambiarla al entrar.

**US-ADM-08 — Como administración bloqueo la cuenta de un trabajador que sale de la empresa**

- La cuenta se bloquea, no se borra, para no perder el historial de lo que hizo. En la aplicación la acción se llama dar de baja.
- Las sesiones abiertas de esa persona se cierran en el momento, y se anula cualquier PIN de recuperación pendiente.
- Se conservan el usuario, el correo, la cédula, las áreas y las marcas: son lo que hace que reactivarla signifique volver a la misma cuenta.
- La persona sale del listado por defecto y se consulta con el filtro de ex trabajadores, donde lo único que se le ofrece es recontratar.
- La cuenta de administración no se puede dar de baja, porque es la única que puede crear las demás.

**US-ADM-09 — Como administración reactivo la cuenta de un trabajador que vuelve**

- La cuenta vuelve con el mismo usuario, las mismas áreas y las mismas marcas, y conserva su historial.
- La contraseña sí es nueva: se entrega una temporal y la persona pasa por la pantalla de primer ingreso.
- Recontratar es el inverso exacto de dar de baja.

**US-ADM-10 — Como administración extiendo o reactivo la caducidad de una cuenta temporal**

- Aplica a las cuentas de guía externo que ya vencieron o que están por vencer.
- Al extender la fecha la cuenta vuelve a entrar al sistema.

**US-ADM-11 — Como administración consulto y filtro la lista de trabajadores**

- Columnas: nombre, usuario, rol base, áreas adicionales, marcas, fecha de caducidad y estado.
- Filtros por rol y por estado.
- Las cuentas temporales de guía externo se identifican como tales y muestran si están vigentes o inhabilitadas.

**Validaciones del módulo de trabajadores**

- El sistema tiene una sola cuenta de administración y no se puede bloquear ni eliminar, porque quedaría sin dueño.
- Reservas solo puede crear cuentas temporales de guía externo. Cualquier otra cuenta la crea administración.
- El nombre de usuario es único en todo el sistema.
- Bloquear una cuenta no borra los registros que esa persona creó.

### EP-ADM-02 — Catálogo del inventario

**US-ADM-12 — Como administración gestiono el catálogo de categorías del inventario**

- Aquí entra todo lo que la empresa tiene: jet skis, lanchas, cuadraciclos, kayaks, tablas, parrillas, remos, chalecos y extintores.
- El equipo reservable no es un registro aparte: es la parte del inventario marcada como reservable.
- La lista no queda cerrada de antemano, porque cada temporada aparece algo nuevo que hace falta contar. Si mañana compran drybags, se crea la categoría y se define su comportamiento sin tocar nada más.
- Una categoría que nunca tuvo unidades ni artículos se elimina. Una que ya tuvo se marca inactiva, para no romper el historial.
- Una categoría puede llevar un grupo, opcional. Las que comparten grupo se muestran como una sola tarjeta en el tablero y como un solo bloque al reservar, pero se cuentan y se cobran por separado. Es el caso de los kayaks sencillos y los dobles.
- No se agrupa una categoría que se lleva por unidad con una que se lleva por cantidad.
- Sin grupo, la categoría se muestra sola, que es el caso de la mayoría.

**US-ADM-13 — Como administración defino el comportamiento de cada categoría**

- Si se identifica una por una o se lleva por cantidad. Se identifican las que importa saber cuál sale: jet skis, lanchas y cuadraciclos, que llevan motor, gasolina, horas o kilómetros, golpes y fotos, y también kayaks y paddleboards, que llevan su número aunque no tengan motor. El resto se cuenta: tablas, parrillas, remos, chalecos y extintores.
- De un jet ski interesa cuál sale, porque cada uno tiene su historia. Con los kayaks y los paddleboards pasa igual: cada uno lleva su número y operaciones escoge cuál sale, sin gasolina ni horas que registrar.
- Si sus unidades son intercambiables entre sí. Es una pregunta distinta de la anterior: un jet ski se lleva por unidad y aun así cualquiera sirve, mientras que la lancha se lleva por unidad y es una lancha concreta, porque solo la Bennington arrastra y el wakeboard y el tubing dependen de eso.
- Si es reservable. Solo las categorías reservables aparecen en el tablero y se pueden asociar a una reserva.
- Si lleva motor, y si el uso se mide en horas de motor o en kilómetros. El equipo de agua con motor lleva horas; los cuadraciclos llevan kilometraje.
- Si consume gasolina.
- Si se puede dañar.
- Si lleva fotos de estado. Los jet skis las llevan; un kayak no las necesita.
- Si solo se alquila con guía.
- Cuánto dura por defecto una salida.

**US-ADM-14 — Como administración defino el depósito de garantía de una categoría**

- Se registra el monto en dólares y en colones. Por ejemplo doscientos dólares o cien mil colones para los jet skis.
- El monto se puede modificar cuando la empresa lo decida.
- Hay categorías sin depósito. Administración decide a cuáles ponerles, por ejemplo agregárselo también a los cuadraciclos.
- El monto que se le pide al cliente sale de la categoría del equipo que va a salir.

**US-ADM-15 — Como administración defino qué tipo de aviso lleva cada categoría**

- El aviso puede ser por cantidad, por fecha de vencimiento, por ambas cosas o por ninguna.
- Por cantidad se define la cantidad mínima a partir de la cual salta el aviso. Es el caso de los chalecos.
- Por vencimiento se define con cuánta anticipación avisar. Es el caso de los extintores y del contenido de los botiquines.
- Cada vez que se agrega una categoría nueva, administración decide qué aviso le corresponde o si no lleva ninguno.
- Los botiquines solo salen en los tours y no en las rentas, así que no se pierden: su contenido se gasta cuando se usa y además se vence.

**Validaciones del catálogo**

- No se elimina una categoría que tenga unidades o artículos registrados.
- Una categoría reservable puede llevarse por unidad o por cantidad. Lo que decide si reservas compromete una unidad concreta no es esa modalidad sino si las unidades de la categoría son intercambiables entre sí.
- La modalidad de una categoría, entre identificada por unidad y llevada por cantidad, no se cambia después de que tenga registros.

### EP-ADM-03 — Unidades y artículos del inventario

**US-ADM-16 — Como administración gestiono las unidades de una categoría que se identifica una por una**

- Cada unidad lleva su código propio, único dentro de la empresa, por ejemplo la placa del jet ski.
- Estado de la unidad: disponible, ocupado, en mantenimiento, dañado, en reparación o dado de baja.
- Se lleva la gasolina actual, las horas o el kilometraje acumulado, y el valor al que toca el próximo cambio de aceite.
- Cada unidad declara cuántas rayas tiene su medidor de gasolina: seis en los cuadraciclos, cuatro en los jet skis y las lanchas. La lectura del día se guarda sobre ese máximo.
- Una unidad sin lectura de gasolina todavía no es lo mismo que una unidad en cero.
- Crear, consultar y modificar. Para sacarla del inventario se da de baja, no se elimina.

**US-ADM-17 — Como administración gestiono la cantidad de una categoría que se lleva por cantidad**

- Se registra cuántos hay en total.
- Se separan por estado: disponibles, dañados y en reparación.
- Cuando se bota o se pierde uno, se baja la cantidad. No hay nada que dar de baja porque no hay ficha por unidad, y el historial de conteos deja ver de cuánto a cuánto bajó y en qué fecha.

**US-ADM-18 — Como administración doy de baja una unidad sin borrar su historial**

- Aplica a las categorías identificadas una por una, cuando la máquina se vende, se pierde o se destruye.
- Se registra el motivo de la baja y su fecha.
- La unidad desaparece del inventario, del tablero y de todo lo que se pueda agendar: para la operación diaria deja de existir.
- Su registro se conserva para que las reservas viejas, sus reportes de daño y su historial de mantenimiento sigan cuadrando.
- En las categorías que se llevan por cantidad no aplica: ahí simplemente se baja el número.

**Validaciones de las unidades**

- El código de una unidad es único dentro de la empresa.
- No se elimina una unidad comprometida en una reserva vigente.
- La cantidad de unidades libres que muestra el tablero sale del estado de cada unidad y no se digita.

### EP-ADM-04 — Extras de las lanchas

**US-ADM-19 — Como administración gestiono el catálogo de extras**

- Por ejemplo parrilla, tubing, wake y tablas.
- Un extra que nunca se usó en una reserva se elimina. Uno que ya se usó se marca inactivo, para no romper el historial.

**US-ADM-20 — Como administración defino a cuál embarcación aplica cada extra**

- No todas las embarcaciones admiten lo mismo.
- Al agregar extras a una reserva solo se ofrecen los que aplican a esa embarcación.

**US-ADM-21 — Como administración indico cuáles extras ocupan equipo real del inventario**

- Algunos extras son solamente un cobro adicional.
- Los que ocupan equipo real descuentan de la disponibilidad como cualquier otro equipo.

### EP-ADM-05 — Combos y tarifas

**US-ADM-22 — Como administración gestiono los combos predefinidos**

- Son los paquetes que se venden seguido, por ejemplo lancha con jet ski y paddleboard.
- Se arman escogiendo qué equipos entran, por ejemplo lancha con jet ski y paddleboard, y después reservas solo asocia el grupo al combo ya creado.
- Un combo que nunca se vendió se elimina. Uno que ya se vendió se marca inactivo, para no romper el historial.
- Cada combo se arma para nacionales o para extranjeros y aparece en la sección de su público.
- El mismo paquete puede existir para los dos públicos: son dos combos distintos, cada uno cotizado en su sección.

**US-ADM-23 — Como administración le asigno a cada combo su precio de paquete**

- El combo se vende como paquete y no como la suma de las partes.
- El precio va en la moneda del público del combo: colones para nacionales y dólares para extranjeros.
- Un combo sin precio no se puede guardar, porque sin precio no se puede vender.

**US-ADM-24 — Como administración defino la tarifa de cada equipo y de cada tipo de salida**

- Por ejemplo ciento veinte dólares o sesenta mil colones la hora de jet ski.
- La tarifa se registra en la moneda en que se cobra.

**US-ADM-25 — Como administración modifico una tarifa cuando cambia el precio**

- Las reservas ya cobradas conservan el monto con el que se cobraron.

### EP-ADM-06 — Estadísticas y reportes

**US-ADM-26 — Como administración consulto los ingresos del día con sus descuentos y devoluciones**

- Los montos se muestran separados por moneda y no se suman en un solo total.

**US-ADM-27 — Como administración consulto el movimiento por día y por mes en gráficos**

- Permite comparar temporadas y días de la semana.

**US-ADM-28 — Como administración consulto cuántas horas salió cada equipo**

- Permite ver cuáles equipos se usan y cuáles casi no.

**US-ADM-29 — Como administración consulto qué reservas atendió cada trabajador**

- Sale de la firma que queda en cada reserva.

**US-ADM-30 — Como administración consulto cuánto se ha gastado en mantener cada máquina**

- Se construye a partir del historial de mantenimiento de la unidad.

**US-ADM-31 — Como administración consulto los depósitos pendientes y los retenidos**

- La finalidad de este epic es que la administración mire el negocio con números y no de memoria.

## Módulo Reservas

Rol: reservas. Trabaja desde la oficina y es quien atiende al cliente. Toda reserva entra por aquí, la que se agenda con días de anticipación y la que se crea con el cliente de pie enfrente. El calendario es su vista principal.

### EP-RES-01 — Calendario

**US-RES-01 — Como reservas consulto el calendario en vista diaria, semanal, mensual y anual**

- La vista se escoge según lo que se esté haciendo.
- Operaciones ve solamente el día y la semana, porque en la playa no hace falta más.

**US-RES-02 — Como reservas veo en el calendario qué hay agendado, a qué hora, con qué equipo y a nombre de quién**

- Es la vista principal de quien trabaja en reservas.

**US-RES-03 — Como reservas consulto el detalle de una reserva**

- Se muestra toda la información asociada a la salida.
- Incluye el equipo comprometido, los extras, los guías asignados y el estado del cobro.
- Indica quién creó la reserva y quién la modificó de último.

### EP-RES-02 — Creación de reservas

**US-RES-04 — Como reservas creo una reserva**

- Se registran el nombre a que va la reserva, la cantidad de personas, la fecha, la hora, la duración y el equipo que va a ocupar.
- La duración se escoge en horas, con botones de media hora, una hora, hora y media, dos y tres, y un campo numérico para cualquier otro valor. Las rentas se venden por hora y nadie acá cotiza una salida de ciento noventa minutos.
- La fecha y la hora se interpretan y se muestran siempre en hora de Costa Rica, sin importar dónde corra el servidor.
- Del cliente se guarda solo eso, a propósito: el correo y los demás datos de contacto viven en FareHarbor.
- La reserva queda visible en el calendario.
- La reserva queda registrada a nombre de quien la creó.

**US-RES-05 — Como reservas registro en el momento al cliente que llega a la oficina sin haber agendado**

- Buena parte de los clientes llega sin agendar y ese caso no cambia el flujo.
- Toda reserva entra por el mismo lugar, así que operaciones siempre despacha contra una reserva que ya existe.

**US-RES-06 — Como reservas agendo una salida fuera del horario de nueve a cinco**

- Hay días con horas extra y el sistema no lo impide.

**US-RES-07 — Como reservas comprometo el equipo que va a salir en la reserva**

- Cada equipo comprometido baja de la disponibilidad para esa franja horaria.
- El equipo cuyas unidades son intercambiables se compromete por cantidad y no por unidad concreta: al agendar con horas de anticipación nadie sabe cuál jet ski va a estar libre, cargado y sin golpes, y esa decisión es del muelle al despachar.
- La lancha, que no es intercambiable, se compromete por unidad concreta desde que reservas agenda, porque solo la Bennington arrastra.
- Comprometer el equipo no es despacharlo: la unidad sigue en tierra hasta que operaciones la saque.

### EP-RES-03 — Tipo de reserva: renta, tour y combo

**US-RES-08 — Como reservas elijo el tipo de reserva**

- Renta: el cliente se lleva el equipo por su cuenta.
- Tour: la salida va acompañada por un guía.
- Combo: junta varios equipos distintos en un solo paquete.
- Hay equipo que solo puede salir en tour, como las lanchas y los cuadraciclos.

**US-RES-09 — Como reservas elijo un combo predefinido de la lista**

- Son los paquetes que administración dejó armados porque se venden seguido.
- El combo se cobra con su precio de paquete.

**US-RES-10 — Como reservas armo un combo a la medida escogiendo libremente qué equipos entran**

- Sirve para atender solicitudes específicas del cliente.
- Cada equipo del combo queda asociado a la reserva y baja de la disponibilidad igual que si se hubiera reservado por separado.
- El sistema propone como precio la suma de las tarifas individuales, y reservas lo ajusta si acordó otro monto.
- A diferencia del combo predefinido, que se vende con su precio de paquete ya fijado por administración.

**US-RES-11 — Como reservas le agrego extras a una reserva de lancha**

- Solo se ofrecen los extras que aplican a esa embarcación.
- Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad.
- Los extras que son solamente un cobro adicional no tocan el inventario.

### EP-RES-04 — Guías de la salida

**US-RES-12 — Como reservas asigno uno o más guías a un tour**

- No hay máximo de personas por tour: se llena hasta que se agota el equipo.
- Cuando el grupo es grande salen dos guías, por ejemplo un tour de ocho cuadraciclos.
- Solo se listan los trabajadores marcados como guía.

**US-RES-13 — Como reservas creo la cuenta temporal de un guía externo**

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

**US-RES-14 — Como reservas veo quién lleva cada tour**

- La información se muestra en el tablero, en el detalle de la reserva y en el historial.
- Hoy eso se pregunta por mensaje cada vez.

### EP-RES-05 — Disponibilidad y advertencias

**US-RES-15 — Como reservas consulto la disponibilidad de los equipos en una franja horaria concreta**

- La pregunta es por franja y no por el instante actual: el sistema tiene que saber si un kayak está libre el sábado de diez a doce.

**US-RES-16 — Como reservas recibo una advertencia cuando agendo equipo que ya está comprometido en esa franja**

- El sistema avisa pero deja seguir. No bloquea.
- Hay días en que la operación se acomoda sobre la marcha y un bloqueo estorbaría más de lo que ayuda.
- La advertencia indica con cuál reserva choca.

**US-RES-17 — Como reservas consulto el estado de los equipos antes de comprometerlos**

- No se ofrece equipo que esté en mantenimiento o dado de baja.

### EP-RES-06 — Cambios sobre una reserva

**US-RES-18 — Como reservas modifico una reserva agendada**

- Se actualiza la información cuando cambian las condiciones del cliente.
- El cambio queda registrado a nombre de quien lo hizo.

**US-RES-19 — Como reservas parto una reserva en dos o más salidas**

- Pasa que el grupo llega incompleto y sale en dos tandas.
- El sistema permite dividirla en vez de obligar a inventar una reserva nueva.
- Al partirla se indica qué equipo y cuántas personas van en cada salida.
- El cobro no se parte: se queda completo en la reserva original y a nombre del mismo cliente, porque se cobra por reserva y no por persona.
- La segunda salida nace sin cobro propio.
- El depósito de garantía se queda con la reserva original.
- Cada salida conserva la referencia a la reserva de la que salió.

**US-RES-20 — Como reservas pospongo una reserva para otra fecha y hora**

- Una reserva agendada se pospone por el motivo que sea.
- Una reserva que ya fue despachada solo se pospone por clima: lluvia muy fuerte o tormenta.
- Al posponer una despachada, el equipo se cierra y vuelve al tablero, registrando la gasolina y las horas o el kilometraje de lo que sí se usó.
- El cobro se conserva vivo para la fecha nueva: no se le vuelve a cobrar al cliente.
- El depósito de garantía se conserva hasta la salida nueva.
- La reserva vuelve al estado agendada con la fecha y la hora nuevas.

**US-RES-21 — Como reservas cancelo una reserva registrando el motivo**

- El motivo es obligatorio, porque sirve para revisar después por qué se cae la gente.
- La reserva queda como cancelada y deja de mostrarse en la aplicación de operaciones.
- El equipo no se libera solo ni se bloquea nada.

**US-RES-22 — Como reservas cancelo una salida que ya está en curso**

- Cuando operaciones está ocupado lo reportan por radio a la oficina y ahí se registra.
- Aplica a cambios de clima o a problemas durante la salida.
- Aunque la reserva quede cancelada, operaciones registra cómo volvió el equipo: la gasolina, las horas o el kilometraje, y los daños si los hubo.
- Sin ese registro se perdería el dato de una máquina que sí salió al agua.
- El depósito de garantía se resuelve igual que en un cierre normal.
- El equipo vuelve al tablero como disponible, salvo que haya quedado dañado o en mantenimiento.

### EP-RES-07 — Cobros, descuentos y depósitos

**US-RES-23 — Como reservas cobro una reserva aplicando la tarifa correspondiente**

- La tarifa sale del catálogo que definió administración.
- El sistema propone el monto multiplicando la tarifa por la duración de la salida, y reservas lo ajusta si el precio acordado fue otro.
- El cobro es por reserva y no por persona: si se agendó una lancha para seis y solo llegan dos, se cobra lo mismo y no se devuelve dinero.
- El cobro se puede registrar en cualquier momento, desde que se agenda hasta que se cierra, para cubrir al que paga por adelantado y al que paga al volver.
- El cobro queda registrado a nombre de quien lo hizo.

**US-RES-24 — Como reservas modifico la tarifa al momento de cobrar**

- Reservas puede ajustar el precio libremente, sin margen ni tope, porque a veces se juega con el precio para atraer clientes.
- El precio se edita directamente desde el resumen de cobro, sin una sección aparte.
- Queda registrado el monto acordado y no solo el de la tarifa de lista.
- Por defecto el monto acordado se guarda en una sola moneda; un botón agrega el campo de la segunda moneda para la reserva que se cobra parte en dólares y parte en colones.
- El precio de una reserva no se guarda en la misma fila que la reserva, para que operaciones no lo alcance al leerla.

**US-RES-25 — Como reservas registro el cobro en la moneda en que entró**

- Dólares o colones.
- El sistema no convierte ni maneja tipo de cambio.
- Los montos se acumulan por moneda y nunca se suman entre sí.

**US-RES-26 — Como reservas registro el cobro de una reserva en dos tractos**

- Una misma reserva se puede pagar en más de un movimiento.
- Cada movimiento lleva su monto, su moneda y su método de pago.
- Un cliente puede pagar una parte en dólares y otra en colones, y cada parte se guarda en su moneda.
- La reserva muestra cuánto se ha cobrado y cuánto falta.

**US-RES-27 — Como reservas anoto el método de pago**

- Efectivo, tarjeta, PayPal, SINPE u otro, como texto.
- El sistema no procesa pagos ni valida tarjetas: lleva el control, no el dinero.

**US-RES-28 — Como reservas registro la devolución de dinero al cliente**

- Reservas decide si corresponde devolver dinero y cuánto; puede ser por cancelar la salida, por una salida cortada a medias, u otro motivo.
- Se puede registrar en cualquier momento después de haberse cobrado algo, no solo al cancelar.
- Se indica el monto devuelto, la moneda y el motivo.
- El monto devuelto no puede superar lo que de verdad quedó cobrado (neto) en esa moneda.
- La cuenta del día refleja lo que de verdad entró.

**US-RES-29 — Como reservas registro el depósito de garantía que recibí del cliente**

- El depósito lo recibe la oficina cuando el cliente pasa a pagar, así que lo registra reservas. Operaciones no lo ve ni lo cobra.
- El sistema propone el monto a partir de la categoría del equipo que va a salir, por ejemplo doscientos dólares o cien mil colones en un jet ski.
- Reservas indica si en esa salida hubo depósito o no, porque no todas lo llevan.
- Se registra el monto y la moneda en que se recibió.
- Desde ese momento el depósito aparece en la lista de pendientes de resolver.

**US-RES-30 — Como reservas registro cuánto se le devuelve al cliente del depósito de garantía**

- Resuelve los depósitos que quedaron pendientes después de que operaciones cerró la salida.
- Reservas indica cuánto se le devuelve al cliente: todo el depósito, o un monto puntual cuando hubo daño.
- El sistema calcula lo que se queda la empresa restando lo devuelto del depósito.
- Lo que se queda la empresa entra al reporte de ingresos.
- El motivo del daño se pide solo cuando no se devuelve todo, queda anotado y se ve en el reporte.
- Al resolverlo, el depósito sale de la lista de pendientes.

**US-RES-31 — Como reservas cobro el tiempo adicional de una salida que se pasó de su hora**

- Se registra dentro del cobro de la reserva como tiempo adicional, aparte de la tarifa.
- Por ejemplo el cliente que se queda treinta minutos de más.
- Sale de dos lados: de las reservas que se pasaron de su hora sin avisar, y de las que operaciones extendió sobre la marcha.
- Reservas decide si el tiempo de más se cobra o si va de cortesía.
- Reservas registra el monto acordado por ese tiempo.

**US-RES-32 — Como reservas consulto los ingresos del día y sus gráficos**

- Los montos van separados por moneda y no se suman en un solo total.
- Operaciones no ve esta información, porque no necesita ver plata para hacer su trabajo.

**US-RES-33 — Como reservas consulto qué depósitos siguen pendientes de resolver**

- Es plata de otra persona y no puede quedar en el aire.

## Módulo Operaciones

Rol: operaciones. Es quien está en la playa y en el muelle. Despacha contra reservas que ya existen, cierra las salidas y lleva el control de las máquinas y del inventario. No ve información de dinero.

### EP-OPE-01 — Despacho de reservas

**US-OPE-01 — Como operaciones veo las reservas del día que faltan por despachar**

- La lista se limita al día en curso.
- Las reservas canceladas no aparecen.

**US-OPE-02 — Como operaciones despacho una reserva seleccionándola de la lista**

- No se vuelven a escribir los datos: la reserva ya existe y solo se selecciona.
- El despacho se abre desde la lista del día o desde la tarjeta de la categoría en el tablero.
- La hoja de despacho lista todo el equipo comprometido, tenga motor o no.
- Operaciones escoge en ese momento las unidades concretas que salen, entre las libres de cada categoría comprometida.
- Operaciones puede cambiar el equipo si el cliente pidió otra cosa al llegar al muelle, y el precio propuesto se recalcula con lo que de verdad sale. Un cobro ya registrado no se toca.
- Cada categoría de la reserva sale por su lado, con su propia hora real de salida y su propia duración. Mientras falte un grupo por salir, la reserva sigue pendiente de despachar.
- La hora de salida registrada es la real, la del momento del despacho.
- El equipo queda marcado como ocupado y arranca el conteo hasta la hora de regreso de su grupo.
- Es la separación entre agendar y despachar, que es la parte nueva más importante del sistema.
- El despacho queda registrado a nombre de quien lo hizo.

**US-OPE-03 — Como operaciones registro la gasolina y las horas de motor al momento del despacho**

- Aplica solo a las categorías que llevan motor.
- La gasolina se registra en rayas sobre el máximo del medidor de esa unidad, nunca en porcentaje: en el muelle se lee «3 de 4».
- Hay botones de un cuarto, medio, tres cuartos y lleno, con el medidor dibujado, y también el campo numérico para el valor exacto.
- El despacho escribe la gasolina y las horas en la unidad y no solo en la reserva, para que mientras la máquina está afuera su ficha muestre la lectura de hoy.

**US-OPE-04 — Como operaciones veo cuánto falta para que vuelva cada equipo que está afuera**

- Es la vista que hoy no existe y obliga a subir a leer la conversación de WhatsApp.
- La hora de regreso de cada grupo sale de su hora real de salida más su duración.

**US-OPE-05 — Como operaciones veo como pendiente la reserva que pasó su hora de regreso y no ha vuelto**

- No se cierra sola ni desaparece de la pantalla.
- El cobro del tiempo de más se decide aparte.

**US-OPE-06 — Como operaciones extiendo o recorto la duración de una reserva en curso**

- La duración se ajusta por grupo, sin tocar los demás grupos de la misma reserva.
- El conteo hasta la hora de regreso se recalcula.
- Al extender, la reserva queda marcada para reservas con las horas de más, para que la oficina decida si las cobra o si van de cortesía.
- Operaciones no decide de plata: solo deja constancia de que la salida se alargó.

**US-OPE-07 — Como operaciones consulto el calendario del día y de la semana**

- No hacen falta las vistas de mes ni de año.

**US-OPE-08 — Como operaciones veo quién lleva cada tour**

- Incluye tanto a los guías con cuenta como a los guías externos registrados por nombre.

### EP-OPE-02 — Cierre de la reserva

**US-OPE-09 — Como operaciones cierro una reserva registrando cómo volvió el equipo**

- Si todo está en orden, queda constancia.
- Si no, se levanta el reporte de daño correspondiente y se actualiza el estado de la unidad.
- El reporte de daño es lo que después usa reservas para decidir cuánto del depósito se le devuelve al cliente. Operaciones no ve ni toca el depósito, porque no recibe dinero.
- Se registra la gasolina y las horas de motor con las que volvió.
- Cada grupo se cierra por separado, con su hora real de llegada. La reserva queda cerrada cuando se cierra el último grupo.
- La reserva cerrada pasa al historial.

### EP-OPE-03 — Máquinas y mantenimiento

**US-OPE-10 — Como operaciones registro la gasolina con la que sale y con la que vuelve una unidad**

- Aplica a las categorías marcadas como que consumen gasolina.
- El nivel se registra en rayas sobre el máximo del medidor de la unidad: seis en los cuadraciclos, cuatro en los jet skis y las lanchas.
- Una unidad sin lectura todavía no es lo mismo que una unidad en cero.

**US-OPE-11 — Como operaciones registro las horas de motor acumuladas de una unidad**

- De ahí sale el aviso de cambio de aceite.

**US-OPE-12 — Como operaciones recibo el aviso de cambio de aceite cuando una unidad llega a sus horas**

- El umbral se define en la ficha de la unidad.

**US-OPE-13 — Como operaciones levanto un reporte de daño de un jet ski**

- La causa se elige entre vuelco, choque, falla de máquina u otra.
- Se escribe una descripción de lo ocurrido.
- Se indica cuánto subió el conteo de golpes de esa máquina.
- El reporte queda a nombre de quien lo levantó.

**US-OPE-14 — Como operaciones consulto los reportes de daño anteriores de una unidad**

- Los reportes se consultan después, no solamente se registran.

**US-OPE-15 — Como encargado general subo y reemplazo las fotos de estado de una máquina**

- Se guardan varias fotos por máquina, una por ángulo: costado derecho, costado izquierdo y frente, y opcionalmente una por debajo.
- Sirven para ver el detalle de los daños y tener una referencia de cómo está la máquina hoy.
- Se reemplazan cuando cambia el estado de la máquina.
- Solo puede subirlas quien tenga la marca de encargado general, además de administración.
- No se guarda una foto por salida, porque ocupa demasiado espacio y no compensa. Para una discusión puntual con un cliente basta con la foto que el trabajador toma en el momento con su propio celular.

**US-OPE-16 — Como operaciones veo las fotos actualizadas de una máquina junto a su número de golpes**

- El resto de operaciones las ve pero no las cambia.

**US-OPE-17 — Como operaciones marco una unidad como en mantenimiento**

- La unidad sale de la disponibilidad sin borrarse.
- Se puede marcar al momento de recibir el equipo.

**US-OPE-18 — Como operaciones registro un trabajo de mantenimiento sobre una máquina**

- Cambio de llanta, cambio de pieza, cambio de aceite y en general todo lo que se le haga al equipo, con su fecha.
- Hoy esto no está anotado en ninguna parte.

**US-OPE-19 — Como operaciones consulto el historial de mantenimiento de una máquina**

- Es lo que permite saber cuánto cuesta sostener cada máquina.

**US-OPE-20 — Como operaciones corrijo la gasolina, las horas, los golpes o el estado de una unidad sin abrir una reserva**

- Pasa seguido que alguien echa gasolina, cambia el aceite o encuentra un golpe fuera de una salida.
- La pantalla de máquinas tiene entrada propia desde el panel: se usa de pie junto a la máquina y no puede quedar a cuatro toques de distancia.
- La lista muestra, sin abrir ninguna, la gasolina en rayas, las horas o los kilómetros según la métrica de cada máquina, y si tiene el aceite vencido o está fuera de servicio.
- Solo aparecen las unidades con motor: un kayak no tiene medidor que leer.
- La corrección queda registrada a nombre de quien la hizo.

### EP-OPE-04 — Inventario

**US-OPE-21 — Como operaciones consulto el inventario por categoría**

- El inventario cubre todo lo que la empresa tiene, incluidos los jet skis y las lanchas.
- Al entrar a una categoría identificada una por una se ven sus unidades con su código y su estado, por ejemplo los cuatro o cinco jet skis que haya.
- Al entrar a una categoría llevada por cantidad se ve cuántos hay y cuántos están disponibles, dañados o en reparación.

**US-OPE-22 — Como operaciones marco una unidad o un artículo como dañado**

- Los estados son disponible, dañado o en reparación, los mismos que usa el resto del inventario.
- Un chaleco roto sigue sumando como chaleco si solo se mira el número, y ahí es donde el conteo engaña.
- Al marcar dañada una unidad de una categoría reservable, el tablero deja de ofrecerla en ese mismo momento.

**US-OPE-23 — Como operaciones levanto un conteo de inventario cuando lo decidamos**

- El conteo cubre todo el inventario, categoría por categoría.
- En las categorías identificadas una por una se confirma cada unidad y su estado.
- En las categorías llevadas por cantidad se anota cuántos hay de cada estado.
- En teoría es mensual, pero no siempre se puede, así que operaciones escoge cuándo hacerlo.

**US-OPE-24 — Como operaciones consulto los conteos de inventario del último año**

- Cada conteo guarda su fecha y el nombre de quien lo levantó.

**US-OPE-25 — Como operaciones modifico el inventario y el cambio queda a mi nombre**

- Cualquier persona de operaciones puede modificarlo, con la condición de que cada cambio quede registrado.

**US-OPE-26 — Como operaciones recibo un aviso cuando un artículo baja de su cantidad mínima**

- Aplica solo a las categorías que administración configuró con aviso por cantidad.
- Perder un chaleco no ha pasado, pero se está pendiente de eso todo el tiempo.

**US-OPE-27 — Como operaciones recibo un aviso cuando un artículo se acerca a su fecha de vencimiento**

- Aplica solo a las categorías que administración configuró con aviso por vencimiento, como los extintores y el contenido de los botiquines.
- La anticipación del aviso sale de la configuración de la categoría.

## Reglas transversales

Reglas que aplican a todo el sistema. Se listan aquí una sola vez en lugar de repetirlas dentro de cada historia.

### Seguridad y sesión

- Autenticación resuelta con Supabase. Cada persona entra con su propio usuario y nadie digita la contraseña de otro.
- La contraseña exige mayúscula, minúscula, número y símbolo, con largo mínimo y largo máximo. Las reglas se muestran desde antes de escribirla donde se escoge una contraseña nueva.
- La cuenta de un trabajador se bloquea al llegar a diez intentos fallidos seguidos y solo administración la desbloquea.
- La recuperación de contraseña se hace con un PIN de un solo uso enviado al correo personal, para todos los roles. No hay inicio de sesión con Google ni con otro proveedor.
- El sistema tiene una sola cuenta de administración. No se bloquea nunca: pasados los diez intentos entra al proceso de recuperación, que es su única salida.
- Si se pierde el acceso a esa cuenta y a su correo, la única vía que queda es reponer la contraseña desde la consola de Supabase, por fuera de la aplicación. Hay que tener claro quién tiene esa llave.
- De 7:00 a. m. a 7:00 p. m. la sesión no caduca por inactividad. De 7:00 p. m. a 7:00 a. m. se cierra a los treinta minutos sin actividad, contados desde la última acción.
- La franja horaria se evalúa en el servidor y no con el reloj del dispositivo.
- No se guardan llaves sensibles en el dispositivo del trabajador, y las operaciones delicadas se resuelven fuera del celular.

### Roles y permisos

- Lo que cada persona ve y puede hacer depende de su rol base, de sus áreas adicionales y del modo activo.
- La restricción nunca se queda en esconder botones: el servidor rechaza la operación aunque se intente por otro camino.
- El sistema tiene una sola cuenta de administración y no se puede bloquear ni eliminar.
- Las marcas sobre una cuenta son independientes del rol y se ponen y se quitan por aparte. Hoy son tres: guía, encargado general y registro de guías externos.
  - La marca de guía no otorga permisos: solo hace que la persona aparezca en la lista al asignar un tour.
  - La de encargado general habilita subir las fotos de estado de las máquinas.
  - La de registro de guías externos habilita a alguien de reservas para crear esas cuentas temporales.
- Las áreas se habilitan completas y los permisos sueltos no existen. Lo que no es un área es una marca, y las marcas son pocas y con nombre propio.
- El modo de trabajo restringe y nunca otorga. Estando en modo operaciones la cuenta no alcanza nada de reservas aunque tenga esa área habilitada, y ninguna pantalla decide con las áreas de la cuenta cuando hay un modo activo.

### Estados de una reserva

- Agendada: la reserva existe en el calendario y el equipo queda comprometido para su franja horaria.
- Despachada: salió al menos un grupo de su equipo y corre el conteo hasta la hora de regreso de cada grupo.
- La hora de salida y la de regreso que se muestran son las reales, no las agendadas: se capturan al despachar y se pueden ajustar; lo agendado queda aparte, como referencia de lo que se prometió.
- Cerrada: volvió el último grupo, se registró cómo volvió y la reserva pasa al historial.
- Cancelada: la reserva se anuló con su motivo, deja de mostrarse en la aplicación de operaciones y pasa al historial.
- Posponer no es un estado. La reserva vuelve a agendada con la fecha nueva y queda el rastro del cambio.
- Una reserva se puede cancelar tanto desde agendada como desde despachada.
- Solo las reservas cerradas y las canceladas salen del trabajo diario y viven en el historial.
- Una unidad despachada nunca cuenta como libre, aunque la hora real de regreso de su salida ya haya vencido. Libres más en uso nunca supera el total de la categoría.

### Trazabilidad

- Toda reserva, despacho, cierre, cobro, conteo de inventario, reporte de daño y trabajo de mantenimiento guarda quién lo creó y quién lo modificó de último, con su fecha.
- Esa firma se muestra en el detalle del registro y en el historial, para saber si el dato lo metió una persona u otra.
- Los ajustes de inventario y los movimientos de dinero quedan siempre a nombre de quien los hizo.

### Tiempo real y rendimiento

- La información se actualiza sola en todos los dispositivos, sin refrescar la pantalla.
- La aplicación tiene que abrir rápido incluso con señal mala, porque se abre y se cierra decenas de veces al día a la orilla del lago.
- La paginación se resuelve en el servidor y es obligatoria en todos los listados.
- El estado ocupada de una unidad y la disponibilidad por franja horaria los calcula el sistema, no se digitan.

### Fecha y hora

- Toda fecha y toda hora se calculan y se muestran en hora de Costa Rica, sin importar el reloj ni la zona horaria del servidor donde corra la aplicación.
- El hoy del calendario, de la lista de despacho y de los reportes se arma con esa misma hora, para que el muelle no deje de ver las salidas del día al caer la tarde.

### Sin borrado físico

- La cuenta de un trabajador se bloquea, no se borra, para no perder el historial de lo que hizo.
- Una unidad se da de baja y conserva sus reportes de daño y su historial de mantenimiento.
- Una reserva cancelada queda como cancelada y pasa al historial con su motivo.

### Retención de datos

- El historial de conteos de inventario se conserva un año hacia atrás.
- El historial de reservas se conserva cinco años. Si el plan de Supabase contratado no alcanza para ese volumen, se baja a dos años.

### Dinero

- El sistema lleva el control del dinero pero no lo mueve: no procesa pagos, no valida tarjetas y no convierte monedas.
- Los montos en dólares y en colones se muestran separados y nunca se suman en un solo total.
- Una reserva se puede cobrar en dos tractos, con una parte en dólares y otra en colones. Cada parte se guarda en su moneda.
- Reservas ajusta el precio libremente al momento de cobrar, sin margen ni tope.
- Operaciones no ve información de dinero de ninguna reserva: ni cobros, ni devoluciones, ni depósitos. Sí consulta el catálogo de precios, que es otra cosa.
- El monto acordado de una reserva se guarda por moneda, porque un cobro mixto necesita un acordado en cada una para llegar a saldar.

### Móvil primero y español

- La aplicación se diseña primero para el celular, porque quien la usa está de pie en la playa o en el muelle.
- Los botones son grandes y separados, pensados para usarse con una mano y con las manos mojadas.
- Toda la interfaz está en español.
- Las preferencias de presentación se guardan en el dispositivo y no en la cuenta: el mismo trabajador usa el teléfono al sol y la computadora bajo techo. Hoy son el tema, la vista del calendario y la distribución del tablero.

### Infraestructura

- El proyecto corre sobre el plan de Supabase de veinticinco dólares.
- El plazo de cinco años del historial de reservas depende de que ese plan alcance para el volumen.

### Fuera de esta versión

- Modo sin conexión para registrar despachos y cierres sin señal, con sincronización posterior. Complica demasiado el sistema para lo que devuelve y queda anotado como mejora posterior.
- Foto del estado del equipo en cada salida y cada regreso. Se descarta por espacio y se mantiene solamente la foto actualizada por jet ski.
- Integración automática con FareHarbor. Por ahora los dos sistemas conviven sin hablarse.
- El sitio público de marketing, que es un proyecto aparte y donde sí entra el cliente final.

## Anexo. Decisiones del proyecto

Las decisiones las toma el dueño del repositorio y el resto del equipo las lee. Lo de la primera lista ya está cerrado y bajado a regla dentro del documento. Lo de la segunda todavía hay que resolverlo.

### Decisiones tomadas

- La sesión no caduca por inactividad durante la jornada, de 7:00 a. m. a 7:00 p. m.
  - El trabajo es de campo y obligar a escribir una contraseña con las manos mojadas frena la operación.
  - Fuera de ese horario aplican treinta minutos de inactividad.
  - Se acepta que un dispositivo desatendido quede abierto durante la jornada, considerando que el equipo es de seis personas conocidas y el teléfono es personal.
  - No se pide PIN ni huella para volver: el trabajador guarda su usuario y su contraseña en el teléfono y entra con un clic.
- Ninguna operación vuelve a pedir la contraseña estando la sesión activa.
  - El sistema lleva el control del dinero pero no mueve dinero real, así que no hace falta una segunda confirmación.
- Las capacidades que no son un área completa se resuelven con marcas sobre la cuenta. Hoy son tres.
  - La marca de guía habilita a la persona para que se le asigne un tour.
  - La marca de encargado general habilita a la persona para subir las fotos de estado de las máquinas.
  - La marca de registro de guías externos habilita a alguien de reservas para crear esas cuentas temporales.
  - Se escogió la marca en vez de una lista de permisos sueltos, para no terminar con veinte casillas que nadie puede auditar.
- Administración habilita áreas adicionales sobre una cuenta, y quien tenga más de un área escoge el modo al entrar.
  - Se habilitan áreas completas y no permisos sueltos.
  - Dentro del modo la aplicación se comporta como si la cuenta solo tuviera esa área, para no mezclar pantallas.
- La trazabilidad se resuelve con la firma en cada registro y no con una pantalla de bitácora.
  - Cada registro guarda quién lo creó y quién lo modificó de último.
  - Con eso se sabe si la reserva la metió una persona u otra, que es lo que se necesita.
- Del cliente se guarda solamente el nombre a que va la reserva y la cantidad de personas.
  - El correo y los demás datos de contacto ya viven en FareHarbor.
- La advertencia por choque de disponibilidad avisa pero no bloquea.
- El sistema no maneja tipo de cambio y los montos van separados por moneda.
  - Una misma reserva se puede cobrar en dos tractos, con una parte en dólares y otra en colones.
  - Cada parte se guarda en su moneda y los totales nunca se suman entre sí.
- Reservas ajusta el precio al momento de cobrar, sin margen ni tope.
  - A veces se juega con el precio para atraer más clientes.
- La devolución de dinero al cliente la anota reservas y nadie la autoriza dentro del sistema.
  - En la práctica el criterio es del jefe, pero eso queda fuera de la aplicación.
  - Como no se mueve dinero real, el registro sirve solamente para llevar el control.
- Cada artículo de inventario define su propio aviso.
  - Puede ser por cantidad, por fecha de vencimiento, por ambas cosas o por ninguna.
  - Los chalecos avisan por cantidad y los extintores por vencimiento.
  - Cuando se agrega un artículo nuevo, administración decide qué aviso le corresponde o si no lleva ninguno.
- El historial de reservas se conserva cinco años.
  - Si el plan de Supabase contratado no alcanza para ese volumen, se baja a dos años.
  - El historial de conteos de inventario ya estaba definido en un año.
- Las fotos de estado de una máquina son varias y las sube el encargado general.
  - Una por ángulo: costado derecho, costado izquierdo y frente, y opcionalmente una por debajo.
  - Sirven para ver el detalle de los daños y tener una referencia de cómo está la máquina hoy.
  - El resto de operaciones las ve pero no las cambia.
- Del guía externo se guardan solo el nombre y la cédula, y su registro lleva fecha de caducidad.
  - Cumplida la fecha queda inhabilitado y administración lo ve así en su lista.
- El uso se mide en horas de motor para el equipo de agua y en kilometraje para los cuadraciclos.
  - Las lanchas y los jet skis llevan horas de motor.
  - Los cuadraciclos llevan kilometraje.
  - De cualquiera de los dos sale el aviso del próximo cambio de aceite.
- Una reserva tiene cuatro estados: agendada, despachada, cerrada y cancelada.
  - Posponer no es un estado: la reserva vuelve a agendada con la fecha nueva.
  - Se puede cancelar tanto desde agendada como desde despachada.
- El cobro es por reserva y no por persona.
  - Si se agendó una lancha para seis y solo llegan dos, se cobra lo mismo y no se devuelve dinero, porque el precio ya se incluyó.
  - Por eso al partir una reserva el cobro no se parte: se queda completo en la original, a nombre del mismo cliente.
  - El cobro se puede registrar en cualquier momento, desde que se agenda hasta que se cierra.
  - El tiempo que el cliente se pase de su hora se cobra aparte, como tiempo adicional dentro de la misma reserva.
- Una reserva ya despachada solo se pospone por clima: lluvia muy fuerte o tormenta.
  - El equipo se cierra y vuelve al tablero con la gasolina y las horas de lo que sí se usó.
  - El cobro y el depósito se conservan para la fecha nueva, sin volver a cobrarle al cliente.
  - Una reserva que todavía no ha salido se pospone por el motivo que sea.
- El depósito de garantía se configura por categoría.
  - Doscientos dólares o cien mil colones en los jet skis, y el monto se puede modificar.
  - Hay categorías sin depósito, y administración le puede agregar uno a otras, como los cuadraciclos.
  - Al cerrar, reservas indica cuánto del depósito se le devuelve al cliente: todo si el equipo volvió en orden, o un monto puntual si hubo daño, anotando qué se dañó; el resto se lo queda la empresa.
  - Lo retenido entra al reporte de ingresos.
- El inventario es un solo registro de todo lo que la empresa tiene.
  - Ahí entran los jet skis, las lanchas y los cuadraciclos igual que los remos, los chalecos y los extintores.
  - El equipo reservable no es un registro aparte: es la parte del inventario cuya categoría está marcada como reservable.
  - El conteo que levanta operaciones cubre todo, y al entrar a la categoría de jet skis salen los cuatro o cinco que haya.
  - El tablero y el inventario son dos pantallas distintas sobre ese mismo registro: el tablero filtra lo reservable y sirve para agendar y despachar; el inventario lo muestra todo y sirve para contar y marcar estado.
  - Así una unidad se registra una sola vez, y si operaciones la marca dañada en el conteo, el tablero deja de ofrecerla en el momento.
- El proyecto corre sobre el plan de Supabase de veinticinco dólares.
  - El responsable del mantenimiento del sistema es quien prueba la restauración del respaldo.
- La recuperación de contraseña se hace con un PIN al correo personal, para todos los roles.
  - Se descartó el enlace de un solo uso: en celular el PIN funciona mejor y es un solo mecanismo que programar.
  - No se usa inicio de sesión con Google ni con otro proveedor, aunque Supabase lo soporta, porque en este sistema se entra por nombre de usuario y no por correo.
- El bloqueo por intentos fallidos es a los diez, para todos.
- El sistema tiene una sola cuenta de administración y nunca se bloquea.
  - Pasados los diez intentos entra al proceso de recuperación en vez de bloquearse, porque no hay otra cuenta que la desbloquee.
  - Por eso su correo personal es obligatorio, mientras que en las demás cuentas es opcional.
  - La consola de Supabase queda como salida de emergencia si se pierde también el correo.
- El guía externo tiene cuenta temporal con rol de operaciones y marca de guía.
  - Hace el mismo trabajo que operaciones, así que ve lo mismo.
  - La puede crear reservas, pero solo si administración le puso la marca que lo habilita.
  - Reservas solo puede crear este tipo de cuenta, ninguna otra.
  - La cuenta se identifica como guía externo y queda firmada por quien la creó.

### Decisiones tomadas durante la construcción

Estas no salieron de las reuniones iniciales sino de construir el sistema y de probarlo en un teléfono. Cada una corrigió una regla que este documento daba por buena, y todas están ya aplicadas arriba.

- Se reserva la categoría, no la unidad. Palabras del dueño: en reservaciones no se aparta un jet ski, solo menciona que viene un jet ski, no cuál.
  - Al agendar con horas de anticipación nadie sabe cuál jet ski estará libre, cargado y sin golpes. Esa decisión es del muelle y se toma al despachar.
  - La regla no es cómo se inventaría una categoría sino si sus unidades son intercambiables, que es otra pregunta. Un jet ski se lleva por unidad y sigue siendo cualquier jet ski; una lancha se lleva por unidad y es una lancha concreta.
  - Corrigió US-RES-07, que decía lo contrario.
- La gasolina se lee en rayas, no en porcentaje.
  - Ningún medidor de estos habla en porcentajes: tienen rayas, y en el muelle se lee «3 de 4».
  - El máximo se declara por unidad, porque no toda la flota trae el mismo tablero: seis rayas en los cuadraciclos, cuatro en los jet skis y las lanchas.
- La duración se pide en horas y no en minutos crudos.
  - Las rentas se venden por hora, y ciento noventa minutos no es una unidad que nadie use acá.
- Todo el tiempo se calcula en hora de Costa Rica.
  - Sin fijarla, la aplicación usaba la zona del proceso: en una laptop tica se veía bien, y en el servidor, que corre en UTC, el muelle dejaba de ver las salidas de hoy a partir de las siete de la noche.
- El modo de trabajo restringe y nunca otorga.
  - El calendario decidía con las áreas de la cuenta y no con el modo activo, así que alguien de operaciones con permiso de reservas podía crear reservas desde el modo operaciones.
- Las preferencias de presentación se guardan por dispositivo y no en la cuenta.
  - El tema, la vista del calendario y la distribución del tablero. El mismo trabajador usa el teléfono al sol y la computadora bajo techo.
  - El tema claro es el de sol y no el de interiores: al aire libre una pantalla se lee mejor sobre fondo claro, porque su luminancia se suma a la reflejada.
- Una unidad despachada nunca cuenta como libre, aunque su franja ya haya vencido.
  - Antes los libres se calculaban por ventana horaria y los en uso por estado de la reserva, así que una salida pasada de hora liberaba equipo que seguía en el lago.
- El precio se acuerda por moneda.
  - Una reserva que se cobra parte en dólares y parte en colones necesita un monto acordado en cada una; con uno solo, el cobro mixto nunca llegaba a saldar.
- Los combos se venden con precio nacional y precio extranjero.
  - Es la práctica de la empresa y no se resolvía con un solo precio de paquete: son dos combos distintos, cada uno cotizado en la moneda de su público.
- Administración agrupa categorías para el tablero.
  - Los kayaks sencillos y los dobles son dos categorías y se muestran como una sola tarjeta, sin fusionarse por dentro, porque en el muelle se pregunta cuántos kayaks hay.
- Operaciones consulta precios sin ver dinero de reservas.
  - El catálogo de tarifas es información del negocio que se pregunta a diario en el muelle; los cobros, devoluciones y depósitos de una reserva no.
  - De ahí salió US-TAB-10.
- Al tablero le hacía falta ser de cada quien.
  - De ahí salieron US-TAB-11, el tema claro, y US-TAB-12, la distribución por dispositivo. Ninguna de las dos estaba en las 111 historias originales.

### Decisiones pendientes

- No queda ninguna decisión abierta.
  - Todas las que aparecían aquí se resolvieron y están bajadas a regla dentro del documento.
  - La última en cerrarse fue la de los extras que ocupan equipo real: al quedar el inventario como un solo registro, un extra reservable se compromete por franja igual que cualquier otra unidad.
