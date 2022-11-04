const isNumString = (str) => !isNaN(Number(str))

function deepParseJson(jsonString) {
    if (typeof jsonString === 'string') {
        if (isNumString(jsonString)) {
            return jsonString
        }
        try {
            return deepParseJson(JSON.parse(jsonString))
        } catch (err) {
            return jsonString
        }
    } else if (Array.isArray(jsonString)) {
        return jsonString.map(val => deepParseJson(val))
    } else if (typeof jsonString === 'object' && jsonString !== null) {
        return Object.keys(jsonString).reduce((obj, key) => {
            const val = jsonString[key]
            obj[key] = isNumString(val) ? val : deepParseJson(val)
            return obj
        }, {})
    } else {
        return jsonString
    }
}

export default deepParseJson