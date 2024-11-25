const { SlashCommandBuilder } = require('discord.js');
const { Flood } = require('discord-gamecord');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('flood')
		.setDescription('Play flood!'),
	async execute(message) {    
      const Game = new Flood({
        message: message,
        isSlashGame: false,
        embed: {
          title: 'Flood',
          color: '#5865F2',
        },
        difficulty: 13,
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
        winMessage: 'You won! You took **{turns}** turns.',
        loseMessage: 'You lost! You took **{turns}** turns.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
	},
};
