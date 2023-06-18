import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import VScores from "../VScores.vue";

describe("VScores", () => {
  afterEach(() => localStorage.clear());

  it("displays final score", () => {
    render(VScores, { props: { score: 30 } });
    screen.getByText("You have scored 30 points.");
  });

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
      await fireEvent.update(input, "Elvis Costello");

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const tables = screen
        .getAllByRole("table")
        .filter((x) => within(x).queryByRole("row", { name: "Highscores" }));
      expect(tables).lengthOf(1);

      const [highscores] = tables;
      within(highscores).getByRole("row", { name: "Elvis Costello 300" });
    });

    it("player has a highscore", async () => {
      const scores = [
        { name: "Al Pacino", score: 400 },
        { name: "Diane Keaton", score: 200 },
        { name: "James Caan", score: 300 },
        { name: "Marlon Brando", score: 500 },
        { name: "Robert Duvall", score: 100 }
      ];
      localStorage.setItem("highscores", JSON.stringify(scores));
      localStorage.setItem("lowscores", JSON.stringify(scores));

      render(VScores, { props: { score: 250 } });

      const input = screen.getByLabelText("Name");
      await fireEvent.update(input, "Robert De Niro");

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const tables = screen
        .getAllByRole("table")
        .filter((x) => within(x).queryByRole("row", { name: "Highscores" }));
      expect(tables).lengthOf(1);

      const [highscores] = tables;
      const first = within(highscores).getByRole("row", { name: "Marlon Brando 500" });
      const second = within(highscores).getByRole("row", { name: "Al Pacino 400" });
      const third = within(highscores).getByRole("row", { name: "James Caan 300" });
      const fourth = within(highscores).getByRole("row", { name: "Robert De Niro 250" });
      const fifth = within(highscores).getByRole("row", { name: "Diane Keaton 200" });

      // expect the top 5 scores to be in descending order
      expect(first.compareDocumentPosition(second)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(second.compareDocumentPosition(third)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(third.compareDocumentPosition(fourth)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(fourth.compareDocumentPosition(fifth)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe("adds score to lowscores when", () => {
    it("not enough scores", async () => {
      render(VScores, { props: { score: 300 } });

      const input = screen.getByLabelText("Name");
      await fireEvent.update(input, "Elvis Costello");

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const tables = screen
        .getAllByRole("table")
        .filter((x) => within(x).queryByRole("row", { name: "Lowscores" }));
      expect(tables).lengthOf(1);

      const [lowscores] = tables;
      within(lowscores!).getByRole("row", { name: "Elvis Costello 300" });
    });

    it("player has a lowscore", async () => {
      const scores = [
        { name: "Al Pacino", score: 400 },
        { name: "Diane Keaton", score: 200 },
        { name: "James Caan", score: 300 },
        { name: "Marlon Brando", score: 500 },
        { name: "Robert Duvall", score: 100 }
      ];
      localStorage.setItem("highscores", JSON.stringify(scores));
      localStorage.setItem("lowscores", JSON.stringify(scores));

      render(VScores, { props: { score: 250 } });

      const input = screen.getByLabelText("Name");
      await fireEvent.update(input, "Robert De Niro");

      const submit = screen.getByRole("button", { name: "Submit" });
      await fireEvent.click(submit);

      const tables = screen
        .getAllByRole("table")
        .filter((x) => within(x).queryByRole("row", { name: "Lowscores" }));
      expect(tables).lengthOf(1);

      const [lowscores] = tables;
      const first = within(lowscores).getByRole("row", { name: "Robert Duvall 100" });
      const second = within(lowscores).getByRole("row", { name: "Diane Keaton 200" });
      const third = within(lowscores).getByRole("row", { name: "Robert De Niro 250" });
      const fourth = within(lowscores).getByRole("row", { name: "James Caan 300" });
      const fifth = within(lowscores).getByRole("row", { name: "Al Pacino 400" });

      // expect the bottom 5 scores to be in ascending order
      expect(first.compareDocumentPosition(second)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(second.compareDocumentPosition(third)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(third.compareDocumentPosition(fourth)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(fourth.compareDocumentPosition(fifth)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });
});
