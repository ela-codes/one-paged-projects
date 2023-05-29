function cipher(string, shift) {
    if (shift === 0) return string

    let result = ''
    const upperCaseBounds = [65, 90]
    const lowerCaseBounds = [97, 122]

    function isLetter(code) {
        const isUpperCase = code >= upperCaseBounds[0] && code <= upperCaseBounds[1]
        const isLowerCase = code >= lowerCaseBounds[0] && code <= lowerCaseBounds[1]
        return isUpperCase || isLowerCase
    }
    
    function getNewCode(code, shift) {
        let newCode = 0;
        let boundary;

        if (code >= upperCaseBounds[0] && code <= upperCaseBounds[1]) {
            boundary = upperCaseBounds
        } else if (code >= lowerCaseBounds[0] && code <= lowerCaseBounds[1]) {
            boundary = lowerCaseBounds
        }

        const offset = boundary[1] - (code + shift) + 1

        if (offset <= 0) {
            newCode = boundary[0] + Math.abs(offset)
        } else {
            newCode = code + shift
        }
        return newCode
    }

    for (let i of string) {
        let code = i.charCodeAt(0)

        if (isLetter(code)) {
            result += String.fromCharCode(getNewCode(code, shift))
        } else { // not a letter, concatenate as is
            result += String.fromCharCode(code) 
        }
    }
    return result
}

export default cipher