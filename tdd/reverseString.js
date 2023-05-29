function reverseString(a) {
    let result = ''
    for (let i = a.length-1 ; i >= 0 ; i--) {
        result += a[i]
    }
    return result
}
module.exports = reverseString