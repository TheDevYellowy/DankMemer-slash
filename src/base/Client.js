const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { sep } = require('path');
const path = require('path');

module.exports = class Farmer extends Client {
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
            fs.writeFileSync(path.join(process.cwd(), 'settings.json'), JSON.stringify({ token: '', channelId: '', webhookURL: '', safe: true }, null, 4));
            throw `Settings created at ${process.cwd()}${sep}settings.json`;
        } else {
            this.config = require(path.join(process.cwd(), 'settings.json'));
            return;
        }
    }

    async start() {
        await this.getSettings();
        await this.login(this.config.token);
    }
}
