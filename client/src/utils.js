export const snakeCaseToPretty = (word) => {
    return word.split("_").map(word => {return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase()}).join(' ')
}