const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 86400,
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claim money daily!'),
	async execute(interaction) {    
        await interaction.reply(`You claim ${Math.floor(Math.random() * 100)} RC`);   
	},
};
