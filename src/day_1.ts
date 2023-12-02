const letters: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function parseLine(line: string): number {
  const numbers: number[] = [];
  let current = 0;
  let previous = current;
  while (current < line.length) {
    previous = current;
    const currentChar = Number(line[current]);
    if (!isNaN(currentChar)) {
      numbers.push(currentChar);
      current++;
    } else {
      for (const number of Object.keys(letters)) {
        const chunk = line.slice(current, current + number.length);
        if (number === chunk) {
          numbers.push(letters[number]);
          current += number.length - 1;
          break;
        }
      }
      if (current === previous) {
        current++;
      }
    }
  }
  if (numbers.length === 0) {
    return 0;
  }
  return Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

function part_1(input: string): number {
  const result = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number).filter((char) => !isNaN(char)))
    .map(
      (nums) =>
        nums.length === 0 ? String(0) : `${nums[0]}${nums[nums.length - 1]}`,
    ).map(Number)
    .reduce((acc, cur) => acc + cur, 0);

  console.log("Part 1 result: ", result);
  return result;
}

function part_2(input: string): number {
  const result = input
    .trim()
    .split("\n")
    .map(parseLine)
    .reduce((acc, cur) => acc + cur, 0);

  console.log("Part 2 result: ", result);

  return result;
}

export function day_1(input: string): [number, number] {
  console.log("Day 1:");

  return [
    part_1(input),
    part_2(input),
  ];
}
