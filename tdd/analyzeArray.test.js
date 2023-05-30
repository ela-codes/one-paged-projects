import analyzeArray from "./analyzeArray";

const object = analyzeArray([1,8,3,4,2,6])
const correctResult = {
    average: 4,
    length: 6,
    max: 8,
    min: 1
}

const object2 = analyzeArray([1,-8,3,4,2,8])
const correctResult2 = {
    average: 2,
    length: 6,
    max: 8,
    min: -8
}

const object3 = analyzeArray([-5, 2, '2'])

test('using an array of numbers', () => {
    expect(object).toEqual(correctResult)
})

test('using an array with positive and negative integers', () => {
    expect(object2).toEqual(correctResult2)
})


test('correctly recognizes incorrect array input', () => {
    expect(object3).toBe('Not a valid array')
})
