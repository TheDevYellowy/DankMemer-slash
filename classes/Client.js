const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { sep } = require('path');
const path = require('path');

module.exports = class Farmer extends Client {
    constructor() {
        super({ DMSync: false, checkUpdate: false, patchVoice: false, partials: ['MESSAGE'] });

        this.config = null;
        this.queue = ['fish', 'hunt', 'dig'];
    }

    /**
     * @returns {void}
     */
    async getSettings() {
        if(!fs.existsSync(path.join(process.cwd(), 'settings.json'))) {
            fs.writeFileSync(path.join(process.cwd(), 'settings.json'), JSON.stringify({ token: '', channelId: '', safe: true }, null, 4));
            console.log(`Settings created at ${process.cwd()}${sep}settings.json please fill it out before starting again`);
            return process.exit();
        } else {
            this.config = require(path.join(process.cwd(), 'settings.json'));
            return;
        }
    }

    async start() {
        this.getSettings();
        await this.login(this.config.token);
    }
}
