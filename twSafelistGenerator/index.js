const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const generator = require('./generator')
const crypto = require('crypto')

module.exports = plugin.withOptions(({ path = 'safelist.txt', patterns = [] }) => ({ theme }) => {

    const safeList = generator(theme)(patterns).join('\n')
    const currentSafeList = fs.readFileSync(path).toString()

    const hash = crypto.createHash('md5').update(JSON.stringify(safeList)).digest('hex')
    const prevHash = crypto.createHash('md5').update(JSON.stringify(currentSafeList)).digest('hex')

    if (hash !== prevHash) {
        return fs.writeFileSync(path, safeList)
    }
})
