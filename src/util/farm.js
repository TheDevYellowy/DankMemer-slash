const { TextChannel } = require('discord.js-selfbot-v13')
const Client = require('../base/Client');
const { second, minute, hour, day } = require('./times');
const { setTimeout: sleep } = require('node:timers/promises');

/**
 * @param {Client} client
 * @param {TextChannel} channel 
 */
async function startSimpleFarm(client, channel) {
    console.log('Starting Simple Farm in 40 seconds');
    setInterval(async () => {
        client.queue.push({
            action: 'Fish',
            command: 'fish'
        });
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        client.queue.push({
            action: 'Dig',
            command: 'dig'
        });
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        client.queue.push({
            action: 'Hunt',
            command: 'hunt'
        });
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        client.queue.push({
            action: 'Postmemes',
            command: 'postmemes'
        });
        await sleep(5000);
    }, (second*50));
    await sleep(5000);
    if(!client.config.safe) {
        setInterval(async () => {
            client.queue.push({
                action: 'Crime',
                command: 'crime'
            });
            await sleep(5000);
        }, (second*45));
    }
}

module.exports = {
    startSimpleFarm
}
