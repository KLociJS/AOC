import { inputArray, testArr } from "./day1InputValue.mjs";

const convertToNumber = (str) => {
  const lookup = {
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

  return lookup[str];
};
const regex = /one|two|three|four|five|six|seven|eight|nine|[1-9]/;

const findFirstNumber = (str) => {
  const match = str.match(regex);
  return match[0];
};

const findLastNumber = (str) => {
  for (let i = str.length - 1; i >= 0; i--) {
    const wordTail = str.slice(i, str.length);
    if (regex.test(wordTail)) {
      return wordTail.match(regex)[0];
    }
  }
};

const getCalibrationValues = (input) => {
  const result = input
    .map((str) => {
      let firstNumber = findFirstNumber(str);
      let lastNumber = findLastNumber(str);

      if (!/\d/.test(firstNumber)) {
        firstNumber = convertToNumber(firstNumber);
      }
      if (!/\d/.test(lastNumber)) {
        lastNumber = convertToNumber(lastNumber);
      }
      return parseInt(`${firstNumber}${lastNumber}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

  return result;
};

const testResult = getCalibrationValues(testArr);
console.log(testResult);

const result = getCalibrationValues(inputArray);
console.log(result);
