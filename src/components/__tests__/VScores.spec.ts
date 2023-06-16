import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import VScores from "../VScores.vue";

describe("VScores", () => {
  afterEach(() => localStorage.clear());

  it("displays populated tables", () => {
    const scores = [{ name: "Susan Boyle", score: 200 }];
    localStorage.setItem("highscores", JSON.stringify(scores));
    localStorage.setItem("lowscores", JSON.stringify(scores));

    render(VScores, { props: { score: 300 } });
    screen.getByRole("row", { name: "Highscores" });
    screen.getByRole("row", { name: "Lowscores" });
  });

  it("hides empty tables", () => {
    render(VScores, { props: { score: 300 } });

    const highscores = screen.queryByRole("row", { name: "Highscores" });
    const lowscores = screen.queryByRole("row", { name: "Lowscores" });

    expect(highscores).toBe(null);
    expect(lowscores).toBe(null);
  });

  describe("adds score to highscores when", () => {
    it("not enough scores", async () => {
      render(VScores, { props: { score: 300 } });

      const input = screen.getByLabelText("Name");
      await fireEvent.input(input, { target: { value: "Elvis Costello" } });

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const highscores = screen.getByRole("row", { name: "Highscores" }).closest("table");
      expect(highscores).not.toBe(null);
      within(highscores!).getByRole("row", { name: "Elvis Costello 300" });
    });
  });

  describe("adds score to lowscores when", () => {
    it("not enough scores", async () => {
      render(VScores, { props: { score: 300 } });

      const input = screen.getByLabelText("Name");
      await fireEvent.input(input, { target: { value: "Elvis Costello" } });

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const lowscores = screen.getByRole("row", { name: "Lowscores" }).closest("table");
      expect(lowscores).not.toBe(null);
      within(lowscores!).getByRole("row", { name: "Elvis Costello 300" });
    });
  });
});
