import wallet from "../../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { initializeMintCloseAuthorityInstructionData } from "@solana/spl-token";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
        //const image = "https://arweave.net/<HASH>"
        const irysURI = "https://arweave.net/AHpm24bCmNfkA6AQ159SzG9qZH3wAiMhPduXoEFN1Tog".replace(
            "https://arweave.net/",
            "https://devnet.irys.xyz/",
        )

        console.log("Your image URI : ", irysURI);
        const image = irysURI;
        const metadata = {
            name: "RedaU05",
            symbol: "RR",
            description: "this is reda NFT maaaaaann!!!!!",
            image: image,
            attributes: [
                {trait_type: 'colors', value: '20'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "image"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
