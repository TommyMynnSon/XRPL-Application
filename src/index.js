const xrpl = require('xrpl');

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// [ Variables ]
// Public server I am using (more listed at https://xrpl.org/public-servers.html):
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
    // ------------ A) Get details about wallet -----------------------------------------
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
    // ------------ A) Gets details about wallet ----------------------------------------

    // ------------ B) Gets offers created by wallet ------------------------------------
    // const response = await client.request({
    //     'command': 'account_offers',
    //     'account': `${wallet.address}`
    // });

    // console.log(response.result.offers);
    // ------------ B) Gets offers created by wallet ------------------------------------

    // ------------ C) Gets trust lines set by account ----------------------------------
    // const response = await client.request({
    //     'command': 'account_lines',
    //     'account': `${wallet.address}`
    // });

    // console.log(response.result);
    // ------------ C) Gets trust lines set by account ----------------------------------
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

// Function that showcases how to send XRP from one wallet to another
const sendXRP = async (client, sender, receiver) => {
    // Prepare transaction
    const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
        'TransactionType': 'Payment',
        'Account': sender.address,
        'Amount': xrpl.xrpToDrops('25'),
        'Destination': `${receiver}`
    });

    const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // Expected output of prepared
    // {
    //     TransactionType: 'Payment',
    //     Account: '...',
    //     Amount: '100000000',
    //     Destination: '...',
    //     Flags: 0,
    //     Sequence: 23768460,
    //     Fee: '6054',
    //     LastLedgerSequence: 23818084
    // }
    console.log('Prepared transaction instructions:', prepared);

    // Expected output of xrpl.dropsToXrp(prepared.Fee)
    // 0.006054
    console.log('Transaction cost:', Number(xrpl.dropsToXrp(prepared.Fee)), 'XRP');

    // Expected output of max_ledger
    // 23818084
    console.log('Transaction expires after ledger:', max_ledger);

    // Sign the transaction prepared above to authorize the transaction
    const signed = sender.sign(prepared);

    // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // (unique 64 character hexadecimal string)
    console.log("Identifying hash:", signed.hash);

    // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'
    console.log("Signed blob:", signed.tx_blob);

    // Submit the signed blob to XRP Ledger server
    // submitAndWait() submits a signed transaction to the network and waits for the response
    // submitSigned() submits a transaction and gets only the preliminary response
    const tx = await client.submitAndWait(signed.tx_blob);

    console.log("Transaction result:", tx.result.meta.TransactionResult);
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2));
};

// Function that showcases how to create an offer (or OfferCreate transaction)
const createOffer = async (client, creator) => {
    // // Prepare transaction
    // const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
    //     'TransactionType': 'OfferCreate',
    //     'Account': creator.address,
    //     'TakerGets': '6000000',
    //     'TakerPays': {
    //         'currency': 'ENJ',
    //         'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
    //         'value': '2'
    //     }
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // // Expected output of prepared
    // // {
    // //     TransactionType: 'OfferCreate',
    // //     Account: '...',
    // //     TakerGets: '6000000',
    // //     TakerPays: {
    // //       currency: 'GKO',
    // //       issuer: 'ruazs5h1qEsqpke88pcqnaseXdm6od2xc',
    // //       value: '2'
    // //     },
    // //     Flags: 0,
    // //     Sequence: 23768456,
    // //     Fee: '12',
    // //     LastLedgerSequence: 23821538
    // // }
    // console.log('Prepared transaction instructions:', prepared);

    // // Expected output of xrpl.dropsToXrp(prepared.TakerGets)
    // // 6
    // console.log('TakerGets:', Number(xrpl.dropsToXrp(prepared.TakerGets)), 'XRP');

    // // Expected output Number(prepared.TakerPays.value), prepared.TakerPays.currency
    // // 2 GKO
    // console.log('TakerPays', Number(prepared.TakerPays.value), prepared.TakerPays.currency);

    // // Expected output of max_ledger
    // // 23821538
    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction
    // const signed = creator.sign(prepared);

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
};

// Function that showcases how to cancel an offer (or create an OfferCancel transaction)
const cancelOffer = async (client, canceller) => {
    // // Prepare transaction
    // const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
    //     'TransactionType': 'OfferCancel',
    //     'Account': canceller.address,
    //     'OfferSequence': 23768459
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // // Expected output of prepared
    // // {
    // //     TransactionType: 'OfferCancel',
    // //     Account: '...',
    // //     OfferSequence: 23768459,
    // //     Flags: 0,
    // //     Sequence: 23768461,
    // //     Fee: '12',
    // //     LastLedgerSequence: 23822697
    // // }
    // console.log('Prepared transaction instructions:', prepared);

    // // Expected output of max_ledger
    // // 23822697
    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction
    // const signed = canceller.sign(prepared);

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
};

// Function that showcases how to create a trust line linking two accounts
const createTrustLine = async (client, setter) => {
    // // Prepare transaction
    // const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
    //     'TransactionType': 'TrustSet',
    //     'Account': setter.address,
    //     'LimitAmount': {
    //         'currency': 'USD',
    //         'issuer': 'r3hwWiPWvXgdGt58MNQzB5iUGqiiawy4gn',
    //         'value': '100'
    //     }
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // // Expected output of prepared
    // // {
    // //     TransactionType: 'TrustSet',
    // //     Account: '...',
    // //     LimitAmount: {
    // //       currency: 'USD',
    // //       issuer: '...',
    // //       value: '100'
    // //     },
    // //     Flags: 0,
    // //     Sequence: ###,
    // //     Fee: '12',
    // //     LastLedgerSequence: ###
    // // }
    // console.log('Prepared transaction instructions:', prepared);

    // // Expected output of max_ledger
    // // ###
    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction
    // const signed = setter.sign(prepared);

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
};

// Function that showcases how to modify the properties of an account in the XRP Ledger (AccountSet transaction)
const modifyAccount = async (client, account) => {
    // // {
    // //     "TransactionType": "AccountSet",
    // //     "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    // //     "Fee": "12",
    // //     "Sequence": 5,
    // //     "Domain": "6578616D706C652E636F6D",
    // //     "SetFlag": 5,
    // //     "MessageKey": "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB"
    // // }

    // // Prepare transaction
    // const prepared = await client.autofill({            // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction
    //     'TransactionType': 'AccountSet',
    //     'Account': account.address,
    //     'Domain': '6578616D706C652E636F6D'
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <--- optional LastLedgerSequence is strongly recommended

    // // Expected output of prepared
    // console.log('Prepared transaction instructions:', prepared);

    // // Expected output of max_ledger
    // // ###
    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction
    // const signed = account.sign(prepared);

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
    await generateQuery(client, wallet);

    // Set up handlers for events
    generateHandler(client);

    // Send XRP
    await sendXRP(client, wallet, 'rNrLLdLUE3xwUiU8dTY8hqfCp3TVrYNUZc');

    // Create an offer (OfferCreate transaction)
    await createOffer(client, wallet);

    // Cancel an offer (OfferCancel transaction)
    await cancelOffer(client, wallet);

    // Create a trust line linking two accounts (TrustSet transaction)
    await createTrustLine(client, wallet);

    // Modify the properties of an account in the XRP Ledger (AccountSet)
    await modifyAccount(client, wallet);

    // Disconnect from network client when done.
    // client.disconnect();
};

main();