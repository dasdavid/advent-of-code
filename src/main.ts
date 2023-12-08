import { day_1 } from "./day_1.ts";
import { day_2 } from "./day_2.ts";
import { day_3 } from "./day_3.ts";
const [, argDay] = Deno.args;

const days: Record<number, (arg0: string) => [number, number]> = {
  1: day_1,
  2: day_2,
  3: day_3,
};

if (!argDay) {
  const results = await Promise.all(
    Object.values(days).map(async (fn, index) => {
      const inputPath = `inputs/${index + 1}`;
      const input = await Deno.readTextFile(inputPath);
      const [p1, p2] = fn(input.trim());
      return {
        "Part 1": p1,
        "Part 2": p2,
      };
    }),
  );
  console.table(results.reduce((acc, curr, index) => {
    acc[`Day ${index + 1}`] = curr;
    return acc;
  }, {} as Record<string, object>));
} else {
  const day = days[Number(argDay)];

  if (!day) {
    throw new Error(`Day ${argDay} unimplemented!`);
  }

  const inputPath = `inputs/${argDay}`;
  const input = await Deno.readTextFile(inputPath);

  day(input.trim());
}
