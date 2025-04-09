import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import {
    getKeypairFromEnvironment,
  } from "@solana-developers/helpers";
  import "dotenv/config";

const keypair = getKeypairFromEnvironment("WALLET_KEY");


const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("RedaRahmani", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

const enrollment_seeds = [Buffer.from("pre"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

(async () => {
  try {
    const txhash = await program.methods
      .submit(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
                https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(e);
  }
})();