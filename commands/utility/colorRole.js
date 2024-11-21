const { SlashCommandBuilder, Options } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('color_role')
		.setDescription('Change your role color!')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Choose your code color')),
	async execute(interaction) {
	},
};
