console.clear();

const Client = require('./base/Client');
const { startSimpleFarm } = require('./util/farm');

const client = new Client();

client.on('messageCreate', (message) => {
    if(![client.user.id, '270904126974590976'].includes(message.author.id)) return;
    if(message.flags.has("EPHEMERAL")) return;

    if(client.lastAction == '') return;

    const description = message.embeds[0].description;
    const components = message.components[0]?.components;

    let item = description.includes('**') ? description.split('**')[1].split(">")[1] : null;
    item = item.slice(1);

    console.log({ description, item, components });
    client.lastAction = '';
});

client.on('ready', async () => {
    console.log(`${client.user.tag} is ready to farm`);
    const channel = await client.channels.fetch(client.config.channelId, { force: false });
    startSimpleFarm(client, channel);
})

client.start();
