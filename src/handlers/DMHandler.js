const { Message } = require('discord.js-selfbot-v13');

/**
 * @param {Message} message 
 */
module.exports = (message) => {
    const embed = message.embeds[0];
    if(embed.title.includes("Your lifesaver protected you")) {
        message.channel.sendSlash(message.author, 'buy', 'Life Saver');
    }
}
