const xrpl = require('xrpl');

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Public server I am using (more listed at https://xrpl.org/public-servers.html):
// - Operator: Ripple
// - Network: Testnet
// - WebSocketURL: wss://s.altnet.rippletest.net/
// - Notes: Testnet public server
const PUBLIC_SERVER = 'wss://s.altnet.rippletest.net/';

// Function that showcases various ways of generating/accessing wallets.
const generateWallet = async (client) => {
    // A) CREATE A WALLET AND FUND IT WITH THE TESTNET FAUCET

    // const fund_result = await client.fundWallet();
    // const test_wallet = fund_result.wallet;

    // console.log('fund_result:', fund_result);
    // console.log('test_wallet:', test_wallet);

    // return test_wallet;

    // A) CREATE A WALLET AND FUND IT WITH THE TESTNET FAUCET

    // B) CREATE A WALLET AND JUST GENERATE ITS KEYS (NOT WORKING AS OF 1/4/2022)

    // const test_wallet = xrpl.Wallet.generate();

    // console.log('test_wallet:', test_wallet);

    // return test_wallet;

    // B) CREATE A WALLET AND JUST GENERATE ITS KEYS (NOT WORKING AS OF 1/4/2022)

    // C) INSTANTIATE A WALLET FROM A SEED ENCODED IN BASE58

    const test_wallet = xrpl.Wallet.fromSeed(process.env.W1_seed);

    console.log('test_wallet:', test_wallet);

    return test_wallet;

    // C) INSTANTIATE A WALLET FROM A SEED ENCODED IN BASE58
};

// Function that showcases various ways to query the XRP Ledger's WebSocket API (more in https://xrpl.org/request-formatting.html).
const generateQuery = async (client, wallet) => {
    // A) GET DETAILS ON SPECIFIC WALLET ADDRESS

    // const response = await client.request({
    //     'command': 'account_info',
    //     'account': wallet.address,
    //     'ledger_index': 'validated'         // <-- Specifies the most recent ledger that has been validated by consensus
    //                                         //     (more ways to specify a ledger at https://xrpl.org/basic-data-types.html#specifying-ledgers).
    // });

    // console.log('response:', response);

    // A) GET DETAILS ON SPECIFIC WALLET ADDRESS

    // B) GET OFFERS CREATED BY SPECIFIC WALLET ADDRESS

    // const response = await client.request({
    //     'command': 'account_offers',
    //     'account': wallet.address
    // });

    // console.log('response.result.offers:', response.result.offers);

    // B) GET OFFERS CREATED BY SPECIFIC WALLET ADDRESS

    // C) GET TRUST LINES SET BY SPECIFIC WALLET ADDRESS

    // const response = await client.request({
    //     'command': 'account_lines',
    //     'account': wallet.address
    // });

    // console.log('response.result:', response.result);

    // C) GET TRUST LINES SET BY SPECIFIC WALLET ADDRESS
};

// Function that showcases various ways to add handlers for events from the XRP Ledger.
const generateHandler = (client) => {
    // A) LISTEN TO LEDGER CLOSE EVENTS (WHENEVER THE XRP LEDGER'S CONSENSUS PROCESS PRODUCES A NEW LEDGER VERSION)

    // client.request({
    //     'command': 'subscribe',
    //     'streams': ['ledger']
    // });

    // client.on('ledgerClosed', async (ledger) => {
    //     console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    // });

    // A) LISTEN TO LEDGER CLOSE EVENTS (WHENEVER THE XRP LEDGER'S CONSENSUS PROCESS PRODUCES A NEW LEDGER VERSION)
};

// Function that showcases how to send XRP from one wallet to another.
const sendXRP = async (client, sender, receiver) => {
    // // Prepare the transaction.
    // const prepared = await client.autofill({           // <-- autofill() method automatically fills in good defaults for the remaining fields of a transaction.
    //     'TransactionType': 'Payment',
    //     'Account': sender.address,
    //     'Amount': xrpl.xrpToDrops('100'),
    //     'Destination': receiver
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <-- optional LastLedgerSequence is strongly recommended.

    // console.log('Prepared transaction instructions:', prepared);

    // console.log('Transaction cost:', Number(xrpl.dropsToXrp(prepared.Fee)), 'XRP');

    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction.
    // const signed = sender.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string).
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'.
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server.
    // // - submitAndWait() submits a signed transaction to the network and waits for the response.
    // // - submitSigned() submits a transaction and gets only the preliminary response.
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);
    // console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2));
};

// Function that showcases how to create an offer (OfferCreate transaction).
const createOffer = async (client, creator) => {
    // // Prepare the transaction.
    // const prepared = await client.autofill({           // <-- autofill() method automatically fills in good defaults for the remaining fields of a transaction.
    //     'TransactionType': 'OfferCreate',
    //     'Account': creator.address,
    //     'TakerGets': '6000000',
    //     'TakerPays': {
    //         'currency': 'ENJ',
    //         'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
    //         'value': '2'
    //     }
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <-- optional LastLedgerSequence is strongly recommended.

    // console.log('Prepared transaction instructions:', prepared);

    // console.log('TakerGets:', Number(xrpl.dropsToXrp(prepared.TakerGets)), 'XRP');

    // console.log('TakerPays', Number(prepared.TakerPays.value), prepared.TakerPays.currency);

    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction.
    // const signed = creator.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string).
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'.
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server.
    // // - submitAndWait() submits a signed transaction to the network and waits for the response.
    // // - submitSigned() submits a transaction and gets only the preliminary response.
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);
};

// Function that showcases how to cancel an offer (OfferCancel transaction).
const cancelOffer = async (client, canceller) => {
    // // Prepare the transaction.
    // const prepared = await client.autofill({           // <-- autofill() method automatically fills in good defaults for the remaining fields of a transaction.
    //     'TransactionType': 'OfferCancel',
    //     'Account': canceller.address,
    //     'OfferSequence': 24155201
    // });

    // const max_ledger = prepared.LastLedgerSequence;    // <-- optional LastLedgerSequence is strongly recommended.

    // console.log('Prepared transaction instructions:', prepared);

    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction.
    // const signed = canceller.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string).
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'.
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server.
    // // - submitAndWait() submits a signed transaction to the network and waits for the response.
    // // - submitSigned() submits a transaction and gets only the preliminary response.
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);
};

// Function that showcases how to create a trust line.
const createTrustLine = async (client, setter) => {
    // // Prepare the transaction.
    // const prepared = await client.autofill({              // <--- autofill() method automatically fills in good defaults for the remaining fields of a transaction.
    //     'TransactionType': 'TrustSet',
    //     'Account': setter.address,
    //     'LimitAmount': {
    //         'currency': 'USD',
    //         'issuer': 'r3hwWiPWvXgdGt58MNQzB5iUGqiiawy4gn',
    //         'value': '100'
    //     }
    // });

    // const max_ledger = prepared.LastLedgerSequence;       // <--- optional LastLedgerSequence is strongly recommended.

    // console.log('Prepared transaction instructions:', prepared);

    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction.
    // const signed = setter.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string).
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'.
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server.
    // // - submitAndWait() submits a signed transaction to the network and waits for the response.
    // // - submitSigned() submits a transaction and gets only the preliminary response.
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);
};

// Function that showcases how to modify the properties of an account in the XRP Ledger (AccountSet transaction).
const modifyAccount = async (client, account) => {
    // A) ADD/MODIFY DOMAIN PROPERTY OF PROVIDED WALLET ADDRESS

    // // Prepare the transaction.
    // const prepared = await client.autofill({              // <-- autofill() method automatically fills in good defaults for the remaining fields of a transaction.
    //     'TransactionType': 'AccountSet',
    //     'Account': account.address,
    //     'Domain': '6578616D706C652E636F6D'                // <-- Domain that owns the account (more detail at https://xrpl.org/accountset.html#domain).
    // });

    // const max_ledger = prepared.LastLedgerSequence;       // <-- optional LastLedgerSequence is strongly recommended.

    // console.log('Prepared transaction instructions:', prepared);

    // console.log('Transaction expires after ledger:', max_ledger);

    // // Sign the transaction prepared above to authorize the transaction.
    // const signed = account.sign(prepared);

    // // Outputs the transaction's ID or identifying hash, which can be used to look up the transaction later
    // // (unique 64 character hexadecimal string).
    // console.log("Identifying hash:", signed.hash);

    // // Signature represented by the hexadecimal representation of its canonical binary format called a 'blob'.
    // console.log("Signed blob:", signed.tx_blob);

    // // Submit the signed blob to XRP Ledger server.
    // // - submitAndWait() submits a signed transaction to the network and waits for the response.
    // // - submitSigned() submits a transaction and gets only the preliminary response.
    // const tx = await client.submitAndWait(signed.tx_blob);

    // console.log("Transaction result:", tx.result.meta.TransactionResult);

    // A) ADD/MODIFY DOMAIN PROPERTY OF PROVIDED WALLET ADDRESS
};

// Used to demonstrate wallet generation, queries to the XRP Ledger API, handlers for events on the XRP Ledger API, and
// various transaction types (e.g., Payment, OfferCreate, OfferCancel, TrustSet, and AccountSet).
const main = async () => {
    // Define the network client.
    const client = new xrpl.Client(PUBLIC_SERVER);

    // Connect to network client.
    await client.connect();

    // Generate wallet.
    const wallet = await generateWallet(client);

    // Query XRP Ledger's WebSocket API.
    await generateQuery(client, wallet);

    // Set up handlers for events.
    generateHandler(client);

    // Send XRP (Payment transaction).
    await sendXRP(client, wallet, process.env.W2_classicAddress);

    // Create an offer (OfferCreate transaction).
    await createOffer(client, wallet);

    // Cancel an offer (OfferCancel transaction).
    await cancelOffer(client, wallet);

    // Create a trust line linking two accounts (TrustSet transaction).
    await createTrustLine(client, wallet);

    // Modify the properties of an account in the XRP Ledger (AccountSet).
    await modifyAccount(client, wallet);

    // Disconnect from network client when done.
    // client.disconnect();
};

main();