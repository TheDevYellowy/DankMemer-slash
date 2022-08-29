console.clear();

const Client = require('./base/Client');
const { startSimpleFarm } = require('./util/farm');

const client = new Client();
require('./util/antiCrash')();

client.on('messageCreate', async (message) => {
    try {
        if(![client.user.id, '270904126974590976'].includes(message.author.id)) return;
        if(message.flags.has("EPHEMERAL")) return;
        if(message.channel.type == 'DM') return;

        if(client.lastAction == '') return;
        if(message.embeds.length == 0) return;

        require('./handlers/messageHandler')(message, client.lastAction);
        client.lastAction = '';
    } catch (error) {
        console.log(message);
        console.error(error);
    }
});

client.on('ready', async () => {
    console.log(`${client.user.tag} is ready to farm`);
    const channel = await client.channels.fetch(client.config.channelId, { force: false });
    startSimpleFarm(client, channel);
});

client.start();
