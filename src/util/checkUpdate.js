const axios = require('axios').default;
const version = require('../../package.json').version;

module.exports = async () => {
    var data = await axios({
        url: 'https://raw.githubusercontent.com/TheDevYellowy/DankMemer-slash/main/package.json'
    });
    var json = data.data
    if(version !== json.version) {
        console.warn("\x1b[32mA new version is available, to download it just run `git pull` or download it at https://github.com/TheDevYellowy/DankMemer-Slash\x1b[0m");
        process.exit();
    }
}