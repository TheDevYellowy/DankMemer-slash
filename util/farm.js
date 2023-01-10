const { TextChannel } = require('discord.js-selfbot-v13')
const Client = require('../classes/Client');
const { second, minute, hour, day } = require('./times');
const { setTimeout: sleep } = require('node:timers/promises');

/**
 * @param {Client} client
 */
async function startSimpleFarm(client) {
    setInterval(async () => {
        client.queue.push('fish');
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        client.queue.push('hunt');
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        client.queue.push('dig');
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    // setInterval(async () => {
    //     client.queue.push('postmemes');
    //     await sleep(5000);
    // }, (second*50));
    // await sleep(5000);

    if(!client.config.safe) {
        setInterval(async () => {
            client.queue.push('crime');
            await sleep(5000);
        }, (second*45));
    }
}

module.exports = {
    startSimpleFarm
}
