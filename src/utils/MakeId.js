/**
 *
 * @param length
 * @returns {string}
 * @constructor
 */
// Oluşturulan işlere random ID atmamıza yarayan yapıcı metot.
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