const { Events, Collection, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, time, RoleManager  } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
        const { cooldowns } = interaction.client;

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        if (interaction.commandName === 'ask') {
            const modal = new ModalBuilder()
                .setCustomId('askInfoService')
                .setTitle('Ask infos or services');
    
            // Create the text input components
            const memberInput = new TextInputBuilder()
                .setCustomId('memberInput')
                // The label is the prompt the user sees for this input
                .setLabel("Which member for info or service ?")
                // Short means only a single line of text
                .setStyle(TextInputStyle.Short)
                .setMaxLength(1_000);
            
            const infosInput = new TextInputBuilder()
            .setCustomId('infosInput')
            .setLabel("What do you want to ask?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(1_000);

            // An action row only holds one text input,
            // so you need one action row per text input.
            const firstActionRow = new ActionRowBuilder().addComponents(memberInput);
            const secondActionRow = new ActionRowBuilder().addComponents(infosInput);

            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'askInfoService';
            interaction.awaitModalSubmit({ filter, time: 150000 })
                .then(interaction => {
                    const member = interaction.fields.getTextInputValue('memberInput');
                    const infos = interaction.fields.getTextInputValue('infosInput');
                    console.log({ member, infos });
                    interaction.reply({ content: 'They receive your request!' });
                })
                .catch(console.error);

        }

        if (interaction.commandName === 'color_role') {
            const roles = interaction.member.roles.cache;
            const color = interaction.options._hoistedOptions[0].value;
            var reg = /^#[0-9A-F]{6}$/i;
            for (const role of roles) {
                if (role[0] != '1273610939693928479'){
                    if (reg.test(color)){
                        role[1].setColor(color)
                        interaction.reply('Color changed!');
                    } else {
                        interaction.reply('You have to put your code color properly!');
                    }
                }
            }
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;
        
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1_000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};