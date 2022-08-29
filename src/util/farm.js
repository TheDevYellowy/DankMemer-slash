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
        channel.sendSlash('270904126974590976', 'fish');
        client.lastAction = 'Fish';
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        channel.sendSlash('270904126974590976', 'dig');
        client.lastAction = 'Dig';
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        channel.sendSlash('270904126974590976', 'hunt');
        client.lastAction = 'Hunt';
        await sleep(5000);
    }, (second*40));
    await sleep(5000);
    setInterval(async () => {
        channel.sendSlash('270904126974590976', 'postmemes');
        client.lastAction = 'Postmemes';
        await sleep(5000);
    }, (second*50));
    await sleep(5000);
    if(!client.config.safe) {
        setInterval(async () => {
            channel.sendSlash('270904126974590976', 'crime');
            client.lastAction = 'Crime';
            await sleep(5000);
        }, (second*45));
    }
}

module.exports = {
    startSimpleFarm
}
