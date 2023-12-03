import { inputValue, testInput } from "./day2InputValue.mjs";

const getMaxReveals = (games) => {
  return games.split("\n").map((line) => {
    const id = parseInt(line.split(":")[0].split(" ")[1]);
    const reveals = line.split(":")[1].split(";").join(",").split(",");

    const maxReveals = reveals.reduce(
      (game, reveal) => {
        const color = reveal.trim().split(" ")[1];
        const count = parseInt(reveal.trim().split(" ")[0]);

        if (game[color] < count) {
          return { ...game, [color]: count };
        }
        return game;
      },
      { red: 0, green: 0, blue: 0 }
    );

    return { id, maxReveals };
  });
};

const getRules = (cubes) => {
  return cubes.split(",").reduce((game, cubes) => {
    const color = cubes.trim().split(" ")[1];
    const count = parseInt(cubes.trim().split(" ")[0]);
    return { [color]: count, ...game };
  }, {});
};

const gameRule = getRules("12 red, 13 green, 14 blue");
const testGame = getMaxReveals(testInput);

const getPossibleGames = (gameRule, games) => {
  return games.reduce((sum, game) => {
    if (
      game.maxReveals.red <= gameRule.red &&
      game.maxReveals.green <= gameRule.green &&
      game.maxReveals.blue <= gameRule.blue
    ) {
      return (sum += parseInt(game.id));
    }
    return sum;
  }, 0);
};

const getPowerOfCubes = (games) => {
  return games.reduce((sum, game) => {
    return (sum +=
      game.maxReveals.red * game.maxReveals.green * game.maxReveals.blue);
  }, 0);
};

const testResult = getPossibleGames(gameRule, testGame);

console.log("testResult ", testResult);

const game = getMaxReveals(inputValue);

const result = getPossibleGames(gameRule, game);

console.log("result: ", result);

const testPowerOfCubes = getPowerOfCubes(testGame);
console.log("testPowerOfCubes: ", testPowerOfCubes);

const powerOfCubes = getPowerOfCubes(game);
console.log("powerOfCubes: ", powerOfCubes);
