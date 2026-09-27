import { describe, expect, it } from "vitest";

import {
  descriptionLines,
  inlineNodes,
  storySummary,
  toDocument,
} from "./stories-to-jira.mjs";

const STORY_BLOCK = [
  "#### US-ACC-01 — Ingreso al sistema",
  "",
  "**ID:** US-ACC-01",
  "",
  "**Historia de usuario:**",
  "",
  "Como un trabajador,",
  "necesito ingresar,",
  "con la finalidad de trabajar.",
  "",
  "**Criterios de aceptación:**",
  "",
  "- Ingreso con `usuario`.",
  "- Mensajes por causa:",
  "  - Contraseña incorrecta.",
];

describe("descriptionLines", () => {
  it("starts at the user story and drops the header", () => {
    expect(descriptionLines(STORY_BLOCK)[0]).toBe(
      "**Historia de usuario:**"
    );
  });

  it("returns nothing when the story has no user story section", () => {
    expect(descriptionLines(["**ID:** X"])).toEqual([]);
  });
});

describe("inlineNodes", () => {
  it("turns bold and code spans into marked text", () => {
    expect(inlineNodes("a **b** `c`")).toEqual([
      { type: "text", text: "a " },
      {
        type: "text",
        text: "b",
        marks: [{ type: "strong" }],
      },
      { type: "text", text: " " },
      {
        type: "text",
        text: "c",
        marks: [{ type: "code" }],
      },
    ]);
  });
});

describe("toDocument", () => {
  const document = toDocument(
    descriptionLines(STORY_BLOCK)
  );

  it("joins the lines of a paragraph with hard breaks", () => {
    const [, story] = document.content;

    expect(
      story.content.filter(
        (node) => node.type === "hardBreak"
      )
    ).toHaveLength(2);
  });

  it("builds nested bullet lists for the criteria", () => {
    const list = document.content.at(-1);
    const nested = list.content[1].content[1];

    expect(list.type).toBe("bulletList");
    expect(list.content).toHaveLength(2);
    expect(nested.type).toBe("bulletList");
    expect(nested.content[0].content[0].content).toEqual([
      { type: "text", text: "Contraseña incorrecta." },
    ]);
  });
});

describe("storySummary", () => {
  it("matches the Jira summary format", () => {
    expect(
      storySummary({
        storyId: "US-ACC-01",
        name: "Ingreso al sistema",
      })
    ).toBe("US-ACC-01 — Ingreso al sistema");
  });
});
