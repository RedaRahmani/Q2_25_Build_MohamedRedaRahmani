import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";


const keypair = getKeypairFromEnvironment("SECRET_KEY");


const connection = new Connection(clusterApiUrl("devnet"));
const to = new PublicKey("5hPFyQTTrdmsCKHC2RALojX263vnXnt7Ss7djWE9D45H");


const transfer_sol = async (to: PublicKey, from: PublicKey, lamp: number) => {
  try {
    const transaction = new Transaction();
    console.log("Making Transaction");
    const trx = transaction.add(
      SystemProgram.transfer({
        fromPubkey: from,
        toPubkey: to,
        lamports: lamp,
      })
    );

    trx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from;

    const response = await sendAndConfirmTransaction(connection, trx, [keypair]);
    console.log(
      `Check out your TX here ==> ${getExplorerLink("transaction", response, "devnet")}`
    );
  } catch (error) {
    console.error(`Oops, something went wrong from transfer_sol: ${error}`);
  }
};


const transfer_all_sol = async (to: PublicKey, from: PublicKey) => {
  try {
    const balance = await getBalance(connection, keypair.publicKey);
    if (balance == null) {
      console.log("Balance is null");
      return;
    } else if (balance == 0) {
      console.log(`You have ${balance} lamports. Cannot move forward.`);
      return;
    }

    const transaction = new Transaction();
    const trx = transaction.add(
      SystemProgram.transfer({
        toPubkey: to,
        fromPubkey: from,
        lamports: balance,
      })
    );

    trx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    trx.feePayer = from;


    const fee =
      (await connection.getFeeForMessage(trx.compileMessage(), "confirmed"))
        .value || 0;

    trx.instructions.pop();
    transaction.add(
      SystemProgram.transfer({
        toPubkey: to,
        fromPubkey: from,
        lamports: balance - fee,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
    ]);

    console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (error) {
    console.error(`Oops, something went wrong from transfer_all_sol: ${error}`);
  }
};


async function getBalance(connection: Connection, publicKey: PublicKey) {
  try {
    console.log("Checking Balance....");
    const balance = await connection.getBalance(publicKey, "confirmed");
    console.log("Your Balance is: ", balance);
    return balance;
  } catch (error) {
    console.log("Oops Something went wrong!!: ", error);
    return null;
  }
}


transfer_sol(to, keypair.publicKey, LAMPORTS_PER_SOL / 100);
//transfer_all_sol(to, keypair.publicKey);
