const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask some informations or some services about Fallen Apotheosis or Outer Empyreans!'),
	async execute(interaction) {       
	},
};
