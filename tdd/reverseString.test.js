const reverseString = require('./reverseString')

test('reverses a word', () => {
    const word = 'drocsid'
    expect(reverseString('discord')).toBe(word)
})