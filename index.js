const tmi = require('tmi.js');
const fs = require('fs');

let oauth;
// Read token from token file
try {
  oauth = fs.readFileSync('token.txt', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'bestbot9000',
    password: oauth,
  },
  channels: ['fistpumpdude'],
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
  client.action('fistpumpdude', 'Hello, bestbot9000 is now connected');
});

client.on('chat', (channel, user, message, self) => {
  if (message === '!event') {
    client.action('fistpumpdude', 'The current event is EDC!');
  }

  client.action('fistpumpdude', `Hello ${user['display-name']}`);
});
