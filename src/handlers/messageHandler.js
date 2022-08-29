const { Message } = require('discord.js-selfbot-v13');
const { random } = require('../util/util')

/**
 * @param {Message} message The message
 * @param {string} action The action that this message was derived from
 */
module.exports = async (message, action) => {
    const embed = message.embeds[0];
    const components = message.components[0]?.components;
    if(!embed.description) return; // Very crude way to fix this problem need to think of a better fix
    let item = embed.description.includes('**') ? embed.description.split('**')[1].split(">")[1] : null;
    if(typeof item == 'string') item = item.slice(1);
    else item = false;

    switch(action.toLowerCase()) {
        case 'crime':
            const num = components.length;
            const customId = components[random(num)].customId;
            return message.clickButton(customId);

        case '': break;
        
        default:
            if(item) {
                await message.channel.sendSlash('270904126974590976', 'sell', item);
                await message.channel.sendSlash('270904126974590976', 'deposit', 'all');
                break;
            }
            break;
    }
}