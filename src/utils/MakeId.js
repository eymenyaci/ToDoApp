/**
 *
 * @param length
 * @returns {string}
 * @constructor
 */
const MakeId = (length = 8) => {
    let result = ''
        , characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        , charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    return result;
}

export default MakeId;