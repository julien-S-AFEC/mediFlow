const specialCharacters = [
    '!', '#', '$', '%', '&', '(', ')', '*',
    '+', ',', '-', '.', '/', ':', ';', '<', '=', '>',
    '?', '@', '[', ']', '^', '_', '`', '{', '|',
    '}', '~'
];


const allowedName = [
    'patient_firstname', 'patient_secondname', 'gender', 'birth_date', 'address', 'email', 'insurance_number',
]

/**
 * 
 * @param {Object} fields 
 * @param {string} key 
 * @param {number} rounds 
 * @returns 
 */
export const encrypt = (fields, key, rounds) => {
    let encryptedObject = {}

    for (const [name, field] of Object.entries(fields)) {
        if (!allowedName.includes(name) || field == null) {
            encryptedObject[name] = field
            continue
        }
        let result = ''
        const reversedKey =  key.replaceAll(' ', '').replaceAll('-', '').replaceAll(':', '').replaceAll('0', '1').split("").reverse().join("")

        if (rounds > reversedKey.length || rounds < reversedKey.length) {
            rounds = reversedKey.length
        }
        let i = 0

        for (const letter of field) {
            if (i === rounds) {
                i = 0
            }
            // I'm using a special character as a separator.
            result += (letter.charCodeAt(0) + Number(reversedKey[i])) + specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
            i++
        }
        encryptedObject[name] = result
    }
    return encryptedObject
}

export const decrypt = (cryptedObject, key, rounds) => {

    try {
        let decryptedObject = {};
        const reversedKey = key
            .replaceAll(' ', '')
            .replaceAll('-', '')
            .replaceAll(':', '')
            .replaceAll('0', '1')
            .split('')
            .reverse()
            .join('');

        if (rounds > reversedKey.length || rounds < reversedKey.length) {
            rounds = reversedKey.length
        }

        for (const [name, field] of Object.entries(cryptedObject)) {
            if (!allowedName.includes(name) || field == null) {
                decryptedObject[name] = field
                continue
            }

            let result = '';
            let buffer = '';
            let i = 0;

            for (const char of field) {
                if (specialCharacters.includes(char)) {
                    if (buffer !== '') {
                        const charCode = Number(buffer) - Number(reversedKey[i]);
                        result += String.fromCharCode(charCode);
                        buffer = '';
                        i++;

                        if (i === rounds) {
                            i = 0;
                        }
                    }
                } else {
                    buffer += char;
                }
            }
            decryptedObject[name] = result;
        }

        return decryptedObject;
    }
    catch (error) {
        console.log(error)
    }
};
