const { TextChannel } = require('discord.js-selfbot-v13')
const Client = require('../base/Client');
const { second, minute, hour, day } = require('./times');

/**
 * @param {Client} client
 * @param {TextChannel} channel 
 */
async function startSimpleFarm(client, channel) {
    console.log('Starting Simple Farm in 40 seconds');
    setInterval(() => {
        console.log('Fishing')
        channel.sendSlash('270904126974590976', 'fish');
        client.lastAction = 'Fish';
    }, (second*40));
    setInterval(() => {
        console.log('Digging')
        channel.sendSlash('270904126974590976', 'dig');
        client.lastAction = 'Dig';
    }, (second*40));
    setInterval(() => {
        console.log('Hunting')
        channel.sendSlash('270904126974590976', 'hunt');
        client.lastAction = 'Hunt';
    }, (second*40));
}

module.exports = {
    startSimpleFarm
}
