import cipher from './caesarCipher'

const shift1 = ['defend the east wall of the castle', 'efgfoe uif fbtu xbmm pg uif dbtumf', 1]

const shift12 = ['attack at dawn, now!', 'mffmow mf pmiz, zai!', 12]

const shift25 = ['The Odin Project is #1', 'Sgd Nchm Oqnidbs hr #1', 25]

const shift0 = ['Just RELAX', 'Just RELAX', 0]


test('correctly encrypts strings with spaces, lowercase and uppercase letters', () => {
    expect(cipher(shift1[0], shift1[2])).toBe(shift1[1])
})


test('correctly encrypts strings with punctuation marks', () => {
    expect(cipher(shift12[0], shift12[2])).toBe(shift12[1])
})

test('correctly encrypts strings with punctuation marks and number', () => {
    expect(cipher(shift25[0], shift25[2])).toBe(shift25[1])
})

test('correctly encrypts strings with zero shift', () => {
    expect(cipher(shift0[0], shift0[2])).toBe(shift0[1])
})