const { WebhookClient } = require('discord.js-selfbot-v13');

module.exports = async (msg, webhookURL) => {
    const client = new WebhookClient({ url: webhookURL });
    await client.send(msg);
}