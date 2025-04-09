import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import prompt from "prompt-sync";
import bs58 from "bs58";


const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error("SECRET_KEY is not defined in your environment variables");
  process.exit(1);
}

const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));

console.log(`Your new Keypair is: `, keypair);
console.log(`Your new Publickey is ${keypair.publicKey.toBase58()}`);
console.log(`Your new Private key is:`, keypair.secretKey.toString());

const promptInput = prompt();
console.log(" ++++++++++++ Welcome to TypeScript CLI ++++++++++++ ");

while (true) {
  console.log("1. If you want to input your public key to convert to bytes");
  console.log("2. If you want to input your Uint8Array to convert to base58");
  console.log("3. If you want to exit");

  const value = promptInput("Enter the number: ");

  if (Number(value.trim()) === 1) {
    const publickey = promptInput("Paste your public key here (Base58): ");
    try {
      const byteArray = bs58_to_byte(publickey.trim());
      console.log(`The Uint8Array of your public key is: `, byteArray);
    } catch (error) {
      console.error("Error decoding public key: ", error);
    }
    continue;
  } else if (Number(value.trim()) === 2) {
    const privateKeyString = promptInput("Paste your private key here: (JSON format)");
    try {
      const jsonPrivateKey = JSON.parse(privateKeyString);
      const byteArray = byte_to_bs58(jsonPrivateKey);
      console.log(`The base58 encoded private key is: `, byteArray);
    } catch (error) {
      console.error("Error parsing private key: ", error);
    }
    continue;
  } else if (Number(value.trim()) === 3) {
    console.log("Exiting...");
    break;
  } else {
    console.log("Enter a valid number");
  }
}

function bs58_to_byte(input: string) {
  return bs58.decode(input);
}

function byte_to_bs58(input: number[]) {
  return bs58.encode(input);
}
