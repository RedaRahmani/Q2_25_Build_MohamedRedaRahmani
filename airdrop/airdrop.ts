import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, Keypair } from "@solana/web3.js";
import * as wallet from "./dev-wallet.json"; 
import "dotenv/config";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';


const cluster: Cluster = (process.env.SOLANA_CLUSTER as Cluster) || 'devnet';

console.log("The Public key is: ", keypair.publicKey.toBase58());


const connection = new Connection(clusterApiUrl(cluster)); 
console.log("Connecting to: ", clusterApiUrl("devnet"));
const airdrop_sol = async (connection: Connection, publicKey: PublicKey) => {
  try {
    console.log("Requesting Airdrop.....");
    const trx = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log("Transaction requested, waiting for confirmation...");

    // Confirm the transaction
    const confirmation = await connection.confirmTransaction(trx);
    if (confirmation) {
      console.log("Transaction is successful ✅");
      console.log(`Check out your TX here: https://explorer.solana.com/tx/${trx}?cluster=devnet`);
    } else {
      console.error("Transaction confirmation failed");
    }
  } catch (e) {
    console.error(`Error occurred during airdrop: ${e}`);
  }
};


airdrop_sol(connection, keypair.publicKey);