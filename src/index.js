console.clear();

const client = new (require('./classes/Client'))();
const { startSimpleFarm } = require('./util/farm');

(async () => {
    await require('../src/util/checkUpdate')();
    require('../src/util/antiCrash')();
    await client.start();
})();

client.on('ready', async () => {
    console.log(`${client.user.username} is online`);
    const channel = await client.channels.fetch(client.config.channelId);
    if(channel.type !== 'GUILD_TEXT') {
        console.error(new Error('channel id supplied is not a text channel'));
        process.exit();
    }
    startSimpleFarm(client);
    
    setInterval(async () => {
        if (client.queue.length > 0) {
            let cmd = client.queue[0];
            await channel.sendSlash('270904126974590976', cmd);

            let filter = m => m.author.id === '270904126974590976';
            channel.awaitMessages({ filter, max: 1, time: 3_000 }).then(async (_) => {
                let msg = _.first();
                await require('./util/command')(msg, cmd);
            });

            client.queue.shift();
        }
    }, 7000);
})