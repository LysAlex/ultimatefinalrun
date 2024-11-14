// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { tokenAurora, tokenEnigma, tokenEpsilon } = require('./config.json');

// Create a new client instance
const clientAurora = new Client({ intents: [GatewayIntentBits.Guilds] });
const clientEnigma = new Client({ intents: [GatewayIntentBits.Guilds] });
const clientTokenEpsilon = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
clientAurora.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

clientEnigma.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


clientTokenEpsilon.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


// Log in to Discord with your client's token
clientAurora.login(tokenAurora);
clientEnigma.login(tokenEnigma);
clientTokenEpsilon.login(tokenEpsilon);
