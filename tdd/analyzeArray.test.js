import ArrayDescription from "./analyzeArray";

const object = new ArrayDescription([1,8,3,4,2,6])
const correctResult = {
    average: 4,
    min: 1,
    max: 8,
    length: 6
  }

test('correctly returns an object with avg, min, max, & length', () => {
    expect(object).toBe(correctResult)
})