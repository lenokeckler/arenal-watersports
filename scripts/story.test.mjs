import { describe, expect, it } from "vitest";
import {
  buildIndex,
  collapseBlankLines,
  epicStoryIds,
  storyBlock,
} from "./story.mjs";

const SAMPLE_LINES = `## Módulo Acceso y Sesión

### EP-ACC-01 — Ingreso al sistema

#### US-ACC-01 — Ingreso al sistema

**ID:** US-ACC-01


**Criterios de aceptación:**

- Ingreso por usuario y contraseña.

---

#### US-ACC-02 — Control de errores del ingreso

**ID:** US-ACC-02

**Criterios de aceptación:**

- Bloqueo tras varios intentos.

## Módulo Tablero y Navegación

### EP-TAB-01 — Tablero de equipo

#### US-TAB-01 — Tablero de equipo disponible

**ID:** US-TAB-01
`.split("\n");

describe("buildIndex", () => {
  it("groups every story under its module and epic", () => {
    const entries = buildIndex(SAMPLE_LINES);

    expect(entries).toEqual([
      {
        module: "Acceso y Sesión",
        epic: "EP-ACC-01 Ingreso al sistema",
        storyId: "US-ACC-01",
        name: "Ingreso al sistema",
      },
      {
        module: "Acceso y Sesión",
        epic: "EP-ACC-01 Ingreso al sistema",
        storyId: "US-ACC-02",
        name: "Control de errores del ingreso",
      },
      {
        module: "Tablero y Navegación",
        epic: "EP-TAB-01 Tablero de equipo",
        storyId: "US-TAB-01",
        name: "Tablero de equipo disponible",
      },
    ]);
  });
});

describe("storyBlock", () => {
  it("captures only the lines of the requested story", () => {
    const block = storyBlock(SAMPLE_LINES, "US-ACC-01");

    expect(block[0]).toBe(
      "#### US-ACC-01 — Ingreso al sistema"
    );
    expect(
      block.some((line) => line.includes("US-ACC-02"))
    ).toBe(false);
  });

  it("stops at the --- separator between stories", () => {
    const block = storyBlock(SAMPLE_LINES, "US-ACC-01");

    expect(block.at(-1)).toBe(
      "- Ingreso por usuario y contraseña."
    );
  });

  it("stops at the next heading when there is no separator", () => {
    const block = storyBlock(SAMPLE_LINES, "US-ACC-02");

    expect(block.at(-1)).toBe(
      "- Bloqueo tras varios intentos."
    );
  });

  it("returns an empty block for an id that does not exist", () => {
    expect(storyBlock(SAMPLE_LINES, "US-ZZZ-99")).toEqual(
      []
    );
  });
});

describe("collapseBlankLines", () => {
  it("collapses consecutive blank lines into one", () => {
    const collapsed = collapseBlankLines([
      "**ID:** US-ACC-01",
      "",
      "",
      "**Criterios de aceptación:**",
    ]);

    expect(collapsed).toEqual([
      "**ID:** US-ACC-01",
      "",
      "**Criterios de aceptación:**",
    ]);
  });

  it("trims trailing blank lines", () => {
    expect(
      collapseBlankLines(["one", "two", "", ""])
    ).toEqual(["one", "two"]);
  });
});

describe("epicStoryIds", () => {
  it("lists every story id that belongs to the epic, in order", () => {
    expect(epicStoryIds(SAMPLE_LINES, "EP-ACC-01")).toEqual(
      ["US-ACC-01", "US-ACC-02"]
    );
  });

  it("returns an empty list for an epic that does not exist", () => {
    expect(epicStoryIds(SAMPLE_LINES, "EP-ZZZ-99")).toEqual(
      []
    );
  });
});
