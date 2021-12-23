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

// Function that showcases various ways of generating/accessing wallets
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
    // //     publicKey: '...',
    // //     privateKey: '...',
    // //     classicAddress: '...',
    // //     seed: '...'
    // // }
    // console.log(test_wallet);

    // return test_wallet;

    // ------------ A) Create a wallet and fund it with the Testnet faucet --------------

    // ------------ B) Create a wallet and just generate its keys -----------------------

    // const test_wallet = xrpl.Wallet.generate();

    // // Expected output of test_wallet
    // // Wallet {
    // //     publicKey: '...',
    // //     privateKey: '...',
    // //     classicAddress: '...',
    // //     seed: '...'
    // // }
    // console.log(test_wallet);

    // return test_wallet;

    // ------------ B) Create a wallet and just generate its keys -----------------------

    // ------------ C) Instantiate a wallet from a seed encoded in base58 ---------------

    const test_wallet = xrpl.Wallet.fromSeed(process.env.W1_seed);

    // Expected output of test_wallet
    // Wallet {
    //     publicKey: '...',
    //    privateKey: '...',
    //    classicAddress: '...',
    //    seed: '...'
    // }
    console.log(test_wallet);

    return test_wallet;

    // ------------ C) Instantiate a wallet from a seed encoded in base58 ---------------
};

// Function that showcases various ways to query the XRP Ledger's WebSocket API (more in https://xrpl.org/request-formatting.html)
const generateQuery = async (client, wallet) => {
    // const response = await client.request({
    //     'command': 'account_info',
    //     'account': wallet.address,
    //     'ledger_index': 'validated'
    // });

    // // Expected output of response
    // // {
    // //     id: ###,
    // //     result: {
    // //       account_data: {
    // //         Account: '...',
    // //         Balance: '...',
    // //         Flags: ###,
    // //         LedgerEntryType: '...',
    // //         OwnerCount: ###,
    // //         PreviousTxnID: '...',
    // //         PreviousTxnLgrSeq: ###,
    // //         Sequence: ###,
    // //         index: '...'
    // //       },
    // //       ledger_hash: '...',
    // //       ledger_index: ###,
    // //       validated: boolean
    // //     },
    // //     type: '...'
    // // }
    // console.log(response);

    // return response;
};

// Function that showcases various ways to add handlers for events from the XRP Ledger
const generateHandler = (client) => {
    // // Listen to ledger close events (whenever the XRP Ledger's consensus process produces a new ledger version)
    // client.request({
    //     'command': 'subscribe',
    //     'streams': ['ledger']
    // });

    // client.on('ledgerClosed', async (ledger) => {
    //     console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    // });
};

// Function that showcases various ways to send XRP from one wallet to another
const sendXRP = async (client, sender, receiver) => {
    // // Prepare transaction
    // const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
    //     'TransactionType': 'Payment',
    //     'Account': sender.address,
    //     'Amount': xrpl.xrpToDrops('25'),
    //     'Destination': `${receiver}`
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // // Expected output of prepared
    // // {
    // //     TransactionType: 'Payment',
    // //     Account: '...',
    // //     Amount: '100000000',
    // //     Destination: '...',
    // //     Flags: 0,
    // //     Sequence: 23768460,
    // //     Fee: '6054',
    // //     LastLedgerSequence: 23818084
    // // }
    // console.log('Prepared transaction instructions:', prepared);

    // // Expected output of xrpl.dropsToXrp(prepared.Fee)
    // // 0.006054
    // console.log('Transaction cost:', xrpl.dropsToXrp(prepared.Fee), 'XRP');

    // // Expected output of max_ledger
    // // 23818084
    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction
    // const signed = sender.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string)
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server
    // // submitAndWait() submits a signed transaction to the network and waits for the response
    // // submitSigned() submits a transaction and gets only the preliminary response
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);
    // console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2));
};

// Used to demonstrate wallet generation, queries to the XRP Ledger API, handlers for events on the XRP Ledger API, and
// sending of XRP
const main = async () => {
    // Define the network client
    const client = new xrpl.Client(PUBLIC_SERVER);

    // Connect to network client
    await client.connect();

    // Generate wallet
    const wallet = await generateWallet(client);

    // Query XRP Ledger's WebSocket API
    const response = await generateQuery(client, wallet);

    // Set up handlers for events
    generateHandler(client);

    // Send XRP
    await sendXRP(client, wallet, process.env.W2_classicAddress);

    // Disconnect from network client when done.
    // client.disconnect();
};

main();