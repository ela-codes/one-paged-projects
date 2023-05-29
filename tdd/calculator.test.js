const calculator = require('./calculator')

test('adds two numbers', () => {
    expect(calculator.add(1,1)).toBe(2)
})

test('adds two numbers with decimals', () => {
    expect(calculator.add(1000,0.1)).toBe(1000.1)
})

test('adds two numbers with a negative number', () => {
    expect(calculator.add(-3, 8)).toBe(5)
})

test('subtracts two numbers', () => {
    expect(calculator.subtract(1,1)).toBe(0)
})

test('subtracts two numbers with two negative numbers', () => {
    expect(calculator.subtract(-1,-1)).toBe(0)
})

test('multiplies two numbers', () => {
    expect(calculator.multiply(4,4)).toBe(16)
})

test('multiplies two numbers with decimals', () => {
    expect(calculator.multiply(4.923,214.23)).toBeCloseTo(1054.65)
})

test('divides two numbers where divisor is less than dividend', () => {
    expect(calculator.divide(4,7)).toBeCloseTo(0.57)
})

test('divides two numbers', () => {
    expect(calculator.divide(6,2)).toBe(3)
})