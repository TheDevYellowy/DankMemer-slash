const { Message } = require('discord.js-selfbot-v13');
const { random } = require('../util/util');


/**
 * @param {Message} message The message
 * @param {string} action The action that this message was derived from
 */
module.exports = async (message, action, client) => {
    const embed = message.embeds[0];
    const components = message.components;
    const len = components?.length;
    let customId;
    let msg;
    let res;
    if(!embed?.description) return; // Very crude way to fix this problem need to think of a better fix
    let item = embed.description.includes('**') ? embed.description.split('**')[1].split(">")[1] : null;
    if(typeof item == 'string') item = item.slice(1);
    else item = false;

    switch(action) {
        case 'scratch':
            let card = [
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ]

            let x;
            let y;

            for (let i = 0; i < 6; i++) {
                x = random(2);
                y = random(4);
                while (card[y][x] == 1) {
                    x = random(2);
                    y = random(4);
                }

                card[y][x] = 1;
                let btn = components[y].components[x].customId;
                await message.clickButton(btn);
            }
            
            while (!(msg instanceof Message)) {
                msg = await message.channel.messages.fetch(message.id, { cache: true });
                console.log(msg);
            }
            let unix = msg.embeds[0].description.split('\n')[11].split(':')[1];
            let msToNext = (Number(unix)*1000+3000) - Date.now();

            await msg.components[4].components[3].click(msg);

            setTimeout(() => client.queue.push('scratch'), msToNext);
        case 'crime':
            if(len == 0) break;

            customId = components[random(len)].customId;
            return await message.clickButton(customId);
        case 'postmemes':
            if(len == 0) break;

            let platform = components[0].components[0].options[random(4)].value;
            let type = components[1].components[0].options[random(5)].value;

            await message.selectMenu(components[0].components[0], [platform]);
            await message.selectMenu(components[1].components[0], [type]);
            
            msg = await message.channel.messages.fetch(message.id); // Because the message updates we need to fetch the message to be able to click the button
            res = await msg.components[2].components[0].click(msg);
            while (!res) {
                res = await msg.components[2].components[0].click(msg);
                console.log(res);
            }
            return;
        default:
            if(len == 1) components[random(len)].components[0].click(message);
            if(item) {
                await message.channel.sendSlash('270904126974590976', 'shop sell item', item);
                await message.channel.sendSlash('270904126974590976', 'deposit', 'all');
                break;
            }
            break;
    }
}
