import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { part_1, part_2 } from "./day_3.ts";

Deno.test("Day 3 part 1", async (t) => {
  await t.step("Should reproduce sample results", () => {
    const sample = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();
    assertEquals(part_1(sample), 4361);
  });

  await t.step("Should not considered splitted numbers by a new line", () => {
    const sample = `
.....5
....+.
.....1
2-....
......
...37.
`.trim();

    assertEquals(part_1(sample), 8);
  });

  await t.step("Should parse every possible combination", () => {
    assertEquals(
      part_1(`
....
..*1
....
....
`.trim()),
      1,
    );
  });
});

Deno.test("Day 3 part 2", async (t) => {
  await t.step("Should check sample", () => {
    assertEquals(
      part_2(
        `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim(),
      ),
      467835,
    );
  });
});
