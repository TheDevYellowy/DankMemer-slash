console.clear();

const Client = require('./base/Client');
const { startSimpleFarm } = require('./util/farm');
const { random } = require('./util/util');

const client = new Client();

client.on('messageCreate', async (message) => {
    if(![client.user.id, '270904126974590976'].includes(message.author.id)) return;
    if(message.flags.has("EPHEMERAL")) return;
    if(message.channel.type == 'DM') return;

    if(client.lastAction == '') return;

    if(message.embeds.length == 0) return;

    const description = message.embeds[0].description;
    const components = message.components[0]?.components;

    if(client.lastAction == 'Crime') {
        const num = components.length;
        const customId = components[random(num)].customId;
        return message.clickButton(customId);
    }

    let item = description.includes('**') ? description.split('**')[1].split(">")[1] : null;
    if(typeof item == 'string') item = item.slice(1);

    // console.log({ description, item, components });
    if(typeof item == 'string') {
        await message.channel.sendSlash('270904126974590976', 'sell', item);
        await message.channel.sendSlash('270904126974590976', 'deposit', 'all');
    }
    client.lastAction = '';
});

client.on('ready', async () => {
    console.log(`${client.user.tag} is ready to farm`);
    const channel = await client.channels.fetch(client.config.channelId, { force: false });
    startSimpleFarm(client, channel);
});

client.start();
