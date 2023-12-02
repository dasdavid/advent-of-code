export function day_2(input: string): [number, number] {
  console.log("Day 2");

  return [
    part_1(input),
    part_2(input),
  ];
}

function part_1(input: string) {
  function parse(line: string): number | 0 {
    const limits: Record<string, number> = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const [game, data] = line.split(":");
    const [, gameId] = game.split(" ");

    const subsets = data.split(";");

    let impossible = false;

    for (const subset of subsets) {
      const hands = subset.split(",").map((hand) => hand.trim().split(" "));

      impossible = hands.some(([amount, color]) =>
        Number(amount) > limits[color]
      );

      if (impossible) {
        break;
      }
    }

    if (impossible) {
      return 0;
    }

    return Number(gameId);
  }
  const result = input.split("\n").map(parse).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  console.log("Part 2 result: ", result);

  return result;
}

function part_2(input: string) {
  function parse(line: string): number | 0 {
    const [_, data] = line.split(":");

    const subsets = data.split(";");

    const requiredCubes: Record<string, number> = {
      red: 1,
      green: 1,
      blue: 1,
    };

    for (const subset of subsets) {
      const hands = subset.split(",").map((hand) => hand.trim().split(" "));

      for (const [amount, color] of hands) {
        if (Number(amount) > requiredCubes[color]) {
          requiredCubes[color] = Number(amount);
        }
      }
    }

    return Object.values(requiredCubes).reduce((acc, curr) => acc * curr, 1);
  }
  const result = input.split("\n").map(parse).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  console.log("Part 2 result: ", result);

  return result;
}
