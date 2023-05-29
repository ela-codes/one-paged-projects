const capitalize = require('./capitalize')

test('capitalizes first letter', () => {
    expect(capitalize('discord')).toBe('Discord')
})
