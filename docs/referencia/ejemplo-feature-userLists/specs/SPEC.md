# User Lists

## Intent

Permitir a una persona usuaria registrar nombres de usuario en una lista temporal
en pantalla y quitar cualquiera de ellos, sin persistencia ni backend.

## In scope

- Título de la sección.
- Campo con `label` + `input` para escribir un nuevo nombre de usuario.
- Botón "Agregar" que añade el nombre escrito a la lista.
- Lista visible con todos los nombres agregados y su contador.
- Botón "Eliminar" por cada fila que quita solo ese nombre.
- Estado vacío cuando todavía no hay nombres.
- Validación de entrada (vacío y duplicado).

## Out of scope

- Persistencia (Firebase, `localStorage`, API).
- Edición de un nombre ya agregado.
- Paginación, búsqueda u ordenamiento.
- Estado compartido entre features (no requiere Redux).

## Requirements

1. El campo de texto está asociado a su `label` mediante `id` / `htmlFor`.
2. Enviar el formulario (clic en "Agregar" o `Enter`) agrega el nombre recortado
   con `trim()`.
3. Tras agregar, el campo queda vacío y listo para el siguiente nombre.
4. Cada elemento de la lista tiene identidad propia (`id`), no posición.
5. Eliminar quita únicamente el elemento cuyo `id` coincide.
6. El botón de eliminar expone un nombre accesible que incluye el usuario.

## Edge cases & errors

| Caso                                           | Resultado                                                |
| ---------------------------------------------- | -------------------------------------------------------- |
| Nombre vacío o solo espacios                   | No se agrega; mensaje "Ingresa un nombre de usuario."    |
| Nombre ya presente (sin distinguir mayúsculas) | No se agrega; mensaje "Ese usuario ya está en la lista." |
| Lista vacía                                    | Se muestra el estado vacío en lugar de la lista          |
| El usuario escribe de nuevo                    | El mensaje de error se limpia                            |

## Constraints

- Reutilizar bases compartidas: `Section`, `Title`, `Text`, `InlineText`,
  `FormField`, `Button`, `DeleteIcon`.
- `UnorderedList` no aplica: solo renderiza texto plano y no admite una acción
  por fila (ver `component-standards` §1, punto 4).
- `SectionTitle` no aplica: fuerza `text-center` y los márgenes `mt-6 mb-6`
  de un encabezado de sección; su color es el token `text-on-surface`.
- `BUTTON.CANCEL` no aplica al botón de fila: `getButtonClassName` le inyecta
  `mt-4 w-full p-3` (pensado para pie de modal). Se usa `BUTTON.BASE`.
- Copys e identificadores en `constants/UserLists.constants.ts`; cadenas
  genéricas desde `@/app/constants` (`STRING`, `BUTTON`, `BUTTON_TYPES`,
  `COLOR`, `LENGTH`, `TitleVariant`).
- Estado local en `hooks/useUserListsViewModel.ts`; el `.tsx` es presentación.
- Skills aplicadas: `component-architecture`, `component-standards`,
  `code-style-standards`, `constants-standards`.

## Desviación conocida del skill

`component-architecture` §1 exige `app/components/<feature-name>/` en kebab-case.
Esta feature vive en `app/features/userLists/` por requerimiento explícito del
curso. El **contenido** de la carpeta sí sigue el layout del skill
(`hooks/`, `models/`, `constants/`, `components/`, `styles/`, `specs/`, `index.ts`).

## Acceptance criteria

- [ ] Se ve el título, el label con su input y el botón "Agregar".
- [ ] Agregar un nombre válido lo muestra en la lista y limpia el input.
- [ ] Agregar vacío muestra el error y no modifica la lista.
- [ ] Agregar un duplicado muestra el error y no modifica la lista.
- [ ] Eliminar quita solo la fila elegida y conserva el resto.
- [ ] Sin usuarios se muestra el estado vacío.
- [ ] El contador refleja la cantidad de usuarios.
- [ ] El `.tsx` principal no contiene `useState`, `useEffect` ni handlers.
