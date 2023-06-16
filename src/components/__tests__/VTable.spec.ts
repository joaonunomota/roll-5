import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import VTable from "../VTable.vue";

describe("VTable", () => {
  it("displays name", () => {
    render(VTable, { props: { rows: [], title: "Example" } });
    screen.getByRole("row", { name: "Example" });
  });

  it("displays scores in provided order", () => {
    const rows = [
      { name: "Bill Nye", score: 200 },
      { name: "Brad Pitt", score: 150 },
      { name: "Ariana Grande", score: 300 }
    ];

    render(VTable, { props: { rows: rows, title: "Example" } });

    const first = screen.getByRole("row", { name: "Bill Nye 200" });
    const second = screen.getByRole("row", { name: "Brad Pitt 150" });
    const third = screen.getByRole("row", { name: "Ariana Grande 300" });

    expect(first.compareDocumentPosition(second)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(second.compareDocumentPosition(third)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
