const { SlashCommandBuilder } = require('discord.js');
const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('2048')
		.setDescription('Play 2048!'),
	async execute(message) {    
        const Game = new TwoZeroFourEight({
            message: message,
            isSlashGame: false,
            embed: {
              title: '2048',
              color: '#5865F2'
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            console.log(result);  // =>  { result... }
          });
	},
};
