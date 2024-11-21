const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('steal')
		.setDescription('Steal some money from others teams!'),
	async execute(interaction) {       
	},
};
