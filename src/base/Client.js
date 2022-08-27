const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

module.exports = class a extends Client {
    constructor() {
        super({ DMSync: false, checkUpdate: false, patchVoice: false });

        this.config = null;
        this.lastAction = '';
    }

    /**
     * @returns {void}
     */
    async getSettings() {
        if(!fs.existsSync(path.join(process.cwd(), 'settings.json'))) {
            fs.writeFileSync(path.join(process.cwd(), 'settings.json'), JSON.stringify({ token: '', prefix: '', channelId: '' }, null, 4));
            throw 'Settings created please fill it out';
        } else {
            this.config = require(path.join(process.cwd(), 'settings.json'));
            return;
        }
    }

    async getData() {

    }

    async start() {
        await this.getSettings();
        await this.login(this.config.token);
    }
}
