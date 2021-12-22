// [ Dependencies ]
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const xrpl = require('xrpl');

// [ Variables ]

// Public server I am using (more in https://xrpl.org/public-servers.html):
// - Operator: Ripple
// - Network: Testnet
// - WebSocketURL: wss://s.altnet.rippletest.net/
// - Notes: Testnet public server
const PUBLIC_SERVER = 'wss://s.altnet.rippletest.net/';

// Function that showcase various ways of generating/accessing wallets.
const generateWallet = async (client) => {
    // ------------ A) Create a wallet and fund it with the Testnet faucet ------------
    
    // const fund_result = await client.fundWallet();
    // const test_wallet = fund_result.wallet;

    // // Expected output of fund_result:
    // // {
    // //     wallet: Wallet {
    // //         publicKey: '...',
    // //         privateKey: '...',
    // //         classicAddress: '...',
    // //         seed: '...'
    // //     },
    // //
    // //     balance: ###
    // // }
    // console.log(fund_result);

    // // Expected output of test_wallet
    // // Wallet {
    // //     publicKey: '',
    // //     privateKey: '',
    // //     classicAddress: '',
    // //     seed: ''
    // // }
    // console.log(test_wallet);

    // return test_wallet;

    // ------------ A) Create a wallet and fund it with the Testnet faucet --------------

    // ------------ B) Create a wallet and just generate its keys -----------------------

    // const test_wallet = xrpl.Wallet.generate();

    // // Expected output of test_wallet
    // // Wallet {
    // //     publicKey: '',
    // //     privateKey: '',
    // //     classicAddress: '',
    // //     seed: ''
    // // }
    // console.log(test_wallet);

    // ------------ B) Create a wallet and just generate its keys -----------------------

    // ------------ C) Instantiate a wallet from a seed encoded in base58 ---------------

    // ------------ C) Instantiate a wallet from a seed encoded in base58 ---------------
};


// Wrap code in an async function so we can use await
const main = async () => {
    console.log(`${process.env.GREETING}`);

    // Define the network client
    const client = new xrpl.Client(PUBLIC_SERVER);

    // Connect to network client
    await client.connect();

    // Generate wallet
    const wallet = await generateWallet(client);

    // Disconnect from network client when done.
    client.disconnect();
};

main();