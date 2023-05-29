function capitalize(a) {
    const capitalizedLetter = a.charAt(0).toUpperCase()
    const result = capitalizedLetter + a.slice(1)
    return result
}

module.exports = capitalize
