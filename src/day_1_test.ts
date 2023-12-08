import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";
import { parseLine } from "./day_1.ts";

Deno.test("Day 1", async (t) => {
  await t.step("Should parse line", () => {
    const test_cases: Array<[string, number]> = [
      [
        "",
        0,
      ],
      [
        "zbgghnineninezkphpf6",
        96,
      ],

      [
        "8nine4sevenjlhlzlbztxbcrpc",
        87,
      ],
      [
        "nine68zvlfs",
        98,
      ],
      [
        "8xvhfr3foureightwocj",
        82,
      ],
      [
        "3bcdmqxgb",
        33,
      ],
      [
        "xtwone3four",
        24,
      ],
      [
        "zoneight234",
        14,
      ],
    ];
    for (const [line, expected] of test_cases) {
      assertEquals(
        parseLine(line),
        expected,
      );
    }
  });

  await t.step(
    "Should parse a letter digit right after a digit",
    () => {
      assertEquals(
        parseLine("msljvkd6fourbtzfjphskfxqpjkzmzgkxvqn6hddzxj"),
        66,
      );
    },
  );

  await t.step("Should parse two adyacent letter digits", () => {
    assertEquals(parseLine("oneight"), 18);
  });
});
