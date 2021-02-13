// Crude implementation of a custom object stringifier which uses single quotes instead of double quotes. It also escapes single quotes in string values.
// Credit to the code for this from this article by Juan Dalmasso titled `Creating your own simplified implementation of JSON.stringify()`
// https://levelup.gitconnected.com/creating-your-own-simplified-implementation-of-json-stringify-ed8e50b9144a
function stringify(value) {
    const lastKey = Object.keys(value).pop();
    let objString = '';
    if (typeof value === 'object') {
        objString += '{';
        for (const key in value) {
            objString += `'${key}':${stringify(value[key])}`;
            if (key !== lastKey) {
                objString += ',';
            }
        }
        objString += '}';
    } else if (typeof value === 'string') {
        objString += `'${value.replace(/'/g, "''")}'`;
    } else if (typeof value === 'number') {
        objString += `${value}`;
    }
    return objString;
}

module.exports = { stringify }