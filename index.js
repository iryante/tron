const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "PK"; //
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const blackHole = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"; // alamat black hole
const memo = 'data:,{"p":"trc-20","op":"mint","tick":"htxi","amt":"1000"}'; // memo transaksi

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    try {
        for (let i = 0; i < 10; i++) {
            const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(blackHole, 1); // 0.000001 TRX adalah jumlah transfer minimum.
            const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(unSignedTxn, memo, 'utf8');
            const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
            console.log("signed =>", signedTxn);
            const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
            console.log("broadcast =>", ret);

            await delay(5000); // Menunggu 5 detik sebelum iterasi berikutnya
        }
    } catch (err) {
        console.log("error:", err);
    }
}

main();
