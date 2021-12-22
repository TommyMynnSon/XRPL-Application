// [ Dependencies ]
const xrpl = require('xrpl');

// [ Variables ]

// Public server I am using (more in https://xrpl.org/public-servers.html):
// - Operator: Ripple
// - Network: Testnet
// - WebSocketURL: wss://s.altnet.rippletest.net/
// - Notes: Testnet public server
const PUBLIC_SERVER = 'wss://s.altnet.rippletest.net/';

// Wrap code in an async function so we can use await
const main = async () => {
    // Define the network client
    const client = new xrpl.Client(PUBLIC_SERVER);

    // Connect to network client
    await client.connect();

    // Everything I need to do when connected to the network client
    console.log(client);

    // Disconnect from network client when done.
    client.disconnect();
}

main();