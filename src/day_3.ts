export function day_3(input: string): [number, number] {
  console.log("Day 3");
  return [
    part_1(input),
    part_2(input),
  ];
}

function getSurroundingCoordinates(
  from: [number, number],
  to: [number, number] = from,
): Array<[number, number]> {
  const surroundings: Array<[number, number]> = [];
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  for (let y = fromY - 1; y <= toY + 1; y++) {
    for (let x = fromX - 1; x <= toX + 1; x++) {
      surroundings.push([x, y]);
    }
  }
  return surroundings;
}

export function part_1(input: string): number {
  const numbers: number[] = [];
  const grid = input.split("\n").map((line) => line.split(""));
  const symbols = new Set([
    "%",
    "@",
    "#",
    "*",
    "+",
    "-",
    "/",
    "$",
    "=",
    "&",
  ]);

  for (const [index, row] of Object.entries(grid)) {
    const isNumber = (n: number) => /[0-9]/.test(row[n]);
    let current = 0;
    while (current < row.length) {
      if (isNumber(current)) {
        const start = current;
        while (isNumber(current + 1)) {
          current++;
        }
        const end = current;
        const number = Number(row.slice(start, end + 1).join(""));

        const [fromX, fromY] = [start, Number(index)];
        const [toX, toY] = [current, Number(index)];

        const surroundings = getSurroundingCoordinates([fromX, fromY], [
          toX,
          toY,
        ]).filter(([x, y]) =>
          y > 0 && y < grid.length && x > 0 && x < row.length
        ).map(([x, y]) => grid[y][x]);

        if (surroundings.some((char) => symbols.has(char))) {
          numbers.push(number);
        }
      }
      current++;
    }
  }
  const result = numbers.reduce((acc, c) => acc + c, 0);
  console.log("Part 1 result: ", result);
  return result;
}

export function part_2(input: string): number {
  const grid = input.split("\n").map((line) => line.split(""));
  const asterisc: Array<[string, number, number]> = grid.map((row, y) => {
    const a: Array<[string, number, number]> = row.map((
      char,
      x,
    ) => [char, x, y]);
    return a;
  }).flat().filter(([char]) => char === "*");

  const numbers = [];
  for (const [_, x, y] of asterisc) {
    const surroundings = getSurroundingCoordinates([x, y]);

    const surroundingNumbers = [];
    const covered = new Set();
    for (const [sX, sY] of surroundings) {
      if (
        sY >= 0 && sY <= grid.length && sX >= 0 && sX <= grid[sY].length
      ) {
        const cell = grid[sY][sX];
        if (/[0-9]/.test(cell)) {
          let start = sX;
          while (
            start - 1 >= 0 && /[0-9]/.test(grid[sY][Math.max(start - 1, 0)])
          ) {
            start--;
          }

          let end = sX;
          while (
            end + 1 <= grid[sY].length &&
            /[0-9]/.test(grid[sY][Math.min(grid[sY].length, end + 1)])
          ) {
            end++;
          }

          const range = `${sY}:${start},${end + 1}`;
          if (!covered.has(range)) {
            covered.add(range);
            const number = grid[sY].slice(start, end + 1).join("");
            surroundingNumbers.push(Number(number));
          }
        }
      }
    }
    if (surroundingNumbers.length === 2) {
      numbers.push(surroundingNumbers.reduce((acc, c) => acc * c, 1));
    }
  }
  const result = numbers.reduce((acc, c) => acc + c, 0);
  console.log("Part 2 result: ", result);
  return result;
}
