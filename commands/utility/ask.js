const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask some informations about Fallen Apotheosis or Outer Empyreans!'),
	async execute(interaction) {       
	},
};
