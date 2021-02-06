"use strict";

const Discord = require('discord.js');

class DiscordBot {

    constructor() {
        this.isOnline = false;
        this.commands = {};

        this.client = new Discord.Client();

        this.client.on("ready", this.onReady);
        this.client.on("reconnecting", this.onReconnecting);
        this.client.on("error", this.onError);

    }

    async connect() {
        return this.client.login(process.env.BOT_TOKEN).then(() => {
            return this.client;
        });
    }

    async play(songPath) {
        try {

            let channel = await this.client.channels.fetch("691074877326753923");
            let connection = await channel.join();

            let dispatcher = connection.play(songPath, { volume: 0.5 });
            
            dispatcher.on('error', error => {
                console.error(error);
            });

            dispatcher.on("speaking", isSpeaking => {
                if (!isSpeaking) {
                    channel.leave();
                    this.client.destroy();
                }
            });
        } catch (err) {

            console.error("Deu ruim:");
            console.error(err);
        }
    }

    async disconnect() {
        return this.client.destroy();
    }

    onReady() {
        if (this.isOnline)
            console.log('Reconnected.');
        else
            console.log('SupBot Online.');
        this.isOnline = true;
    }

    onReconnecting() {
        console.log('Reconnecting...');
    }



    onError() {
        logger.error(error);
    }
}

module.exports = DiscordBot;
