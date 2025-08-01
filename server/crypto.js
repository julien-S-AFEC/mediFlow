const specialCharacters = [
    '!', '#', '$', '%', '&', '(', ')', '*',
    '+', ',', '-', '.', '/', ':', ';', '<', '=', '>',
    '?', '@', '[', ']', '^', '_', '`', '{', '|',
    '}', '~'
];


export const encrypt = (text, key, rounds) => {
    let result = ''
    const reversedKey = key.replaceAll(' ', '').replaceAll('-', '').replaceAll(':', '').replaceAll('0', '1').split("").reverse().join("");
    console.log(reversedKey)
    let i = 0

    for (const letter of text) {
        if (i === rounds) {
            i = 0
        }

        // An integer code + a special character as a separator.
        result += (letter.charCodeAt(0) * reversedKey[i])  + specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
        i++
    }
    return result
}

export const decrypt = (text, key, rounds) => {
    let result = ''
    let buffer = ''
    const reversedKey = key.replaceAll(' ', '').replaceAll('-', '').replaceAll(':', '').replaceAll('0', '1').split("").reverse().join("");
    let i = 0

    for (const char of text) {
        if (i === rounds) {
            i = 0
        }

        if (specialCharacters.includes(char)) {
            result += String.fromCharCode(buffer / reversedKey[i])
            buffer = ''
            i === rounds ? i = 0 : i++
            continue
        }
        buffer += char
    }
    return result
}
